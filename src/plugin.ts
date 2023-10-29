/**
 * @description editor 插件，重写 editor API
 * @author wangfupeng
 */
import { SlateTransforms } from '@wangeditor/editor'
import { IDomEditor, DomEditor } from '@wangeditor/editor'

function withImageSource<T extends IDomEditor>(editor: T): T {
  const { isInline, isVoid, insertNode, normalizeNode } = editor
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

    if (type !== 'image-source') {
      return normalizeNode([node, path])
    }

    // editor 顶级 node
    const topLevelNodes = newEditor.children || []

    // --------------------- link-card 后面必须跟一个 p header blockquote（否则后面无法继续输入文字） ---------------------
    const nextNode = topLevelNodes[path[0] + 1] || {}
    const nextNodeType = DomEditor.getNodeType(nextNode)
    if (
      nextNodeType !== 'paragraph' &&
      nextNodeType !== 'blockquote' &&
      !nextNodeType.startsWith('header')
    ) {
      // link-card node 后面不是 p 或 header ，则插入一个空 p
      const p = { type: 'paragraph', children: [{ text: '' }] }
      const insertPath = [path[0] + 1]
      SlateTransforms.insertNodes(newEditor, p, {
        at: insertPath, // 在 link-card 后面插入
      })
    }
  }

  // 返回 editor ，重要！
  return newEditor
}

export default withImageSource
