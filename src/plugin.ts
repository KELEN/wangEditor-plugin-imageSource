/**
 * @description editor 插件，重写 editor API
 * @author wangfupeng
 */
import { SlateElement, SlateNode, SlateTransforms } from '@wangeditor/editor'
import { IDomEditor, DomEditor } from '@wangeditor/editor'

function withImageSource<T extends IDomEditor>(editor: T): T {
  const { isInline, isVoid, insertBreak, normalizeNode } = editor
  const newEditor = editor

  // 重写 isInline
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'image-source') {
      return false
    }
    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'image-source') {
      return true
    }
    return isVoid(elem)
  }

  newEditor.normalizeNode = ([node, path]) => {
    const type = DomEditor.getNodeType(node)
    if (type === 'image-source') {
      // -------------- table 是 editor 最后一个节点，需要后面插入 p --------------
      const isLast = DomEditor.isLastNode(newEditor, node)
      if (isLast) {
        const p = DomEditor.genEmptyParagraph()
        SlateTransforms.insertNodes(newEditor, p, { at: [path[0] + 1] })
      }
    }
  }

  newEditor.insertBreak = () => {
    const { selection } = newEditor
    if (selection == null) return
    // check select node type
    const node = DomEditor.getSelectedNodeByType(newEditor, 'image-source')
    if (node) {
      const type = DomEditor.getNodeType(node)
      if (type === 'image-source') {
        // insert p before node
        const p = DomEditor.genEmptyParagraph()
        const path = DomEditor.findPath(newEditor, node)
        SlateTransforms.insertNodes(newEditor, p, { at: path })
        // insert p after if node is last
        const isLast = DomEditor.isLastNode(newEditor, node)
      }
    } else {
      insertBreak()
    }
  }

  // 返回 editor ，重要！
  return newEditor
}

export default withImageSource
