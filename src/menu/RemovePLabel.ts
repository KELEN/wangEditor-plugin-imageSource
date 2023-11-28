/**
 * @description image width base class
 * @author wangfupeng
 */

import { Node, Transforms } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor, SlateEditor } from '@wangeditor/editor'

class RemovePLabel implements IButtonMenu {
  readonly title: string = '移除P标签' // 菜单标题
  readonly tag = 'button'

  getValue(editor: IDomEditor): string | boolean {
    // 无需获取 val
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  private getSelectedNode(editor: IDomEditor): Node | null {
    return DomEditor.getSelectedNodeByType(editor, 'image-source')
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    let firstNode = editor.children[0] as any
    while (firstNode) {
      // 如果是空的 p 标签，则删除
      if (firstNode.type === 'paragraph' && firstNode.children.length === 1) {
        // 删除
        Transforms.removeNodes(editor, { at: [0] })
        firstNode = editor.children[0] as any
        // Transforms.removeNodes(editor, { at: [editor.children.length - 1] })
        // firstNode = editor.children[editor.children.length - 1] as any
      } else {
        break
      }
    }

    let lastNode = editor.children[editor.children.length - 1] as any
    while (lastNode) {
      // 如果是空的 p 标签，则删除
      if (lastNode.type === 'paragraph' && lastNode.children.length === 1) {
        // 删除
        Transforms.removeNodes(editor, { at: [editor.children.length - 1] })
        lastNode = editor.children[editor.children.length - 1] as any
      } else {
        break
      }
    }
  }
}

export default RemovePLabel
