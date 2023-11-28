/**
 * @description image width base class
 * @author wangfupeng
 */

import { Node, Transforms } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor } from '@wangeditor/editor'

class InsertPLabel implements IButtonMenu {
  readonly title: string = '插入P标签' // 菜单标题
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
    // create p
    const p = DomEditor.genEmptyParagraph()
    // insert p at end
    Transforms.insertNodes(editor, p, { at: [editor.children.length] })
  }
}

export default InsertPLabel
