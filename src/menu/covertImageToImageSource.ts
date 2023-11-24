/**
 * @description convert link elem to link-card
 * @author wangfupeng
 */

import {
  IDomEditor,
  DomEditor,
  t,
  SlateNode,
  SlateTransforms,
  SlateEditor,
} from '@wangeditor/editor'
import { IButtonMenu } from '@wangeditor/editor'
import { ImageElement, ImageSourceElement } from '../custom-types'

class CovertImageToImageSource implements IButtonMenu {
  readonly title = '转为imageSource'
  readonly iconSvg = '' // 无 icon
  readonly tag = 'button'

  private getSelectionImageElement(editor: IDomEditor): ImageElement | null {
    const node = DomEditor.getSelectedNodeByType(editor, 'image')
    if (node == null) return null
    return node as ImageElement
  }

  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) return true

    const imageSource = this.getSelectionImageElement(editor)
    if (imageSource == null) {
      // 选区未处于 link node ，则禁用
      return true
    }
    return false
  }

  async exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) return

    const imageElement: ImageElement | null = this.getSelectionImageElement(editor)
    if (imageElement == null) return

    // const { getLinkCardInfo } = editor.getMenuConfig('CovertImageToImageSource')
    // if (typeof getLinkCardInfo !== 'function') return

    // const { url } = imageSource
    // const text = SlateNode.string(imageSource)

    // try {
    //   const { title, iconImgSrc } = await getLinkCardInfo(text, url) // 异步生成 link-card 信息
    //   const linkPath = DomEditor.findPath(editor, imageSource)
    //   SlateTransforms.removeNodes(editor, { at: linkPath })
    //   SlateTransforms.splitNodes(editor, { always: true })
    const { src, alt, href } = imageElement

    const imageSource: ImageSourceElement = {
      type: 'image-source',
      src,
      source: alt,
      alt,
      href,
      children: [{ text: '' }],
    }

    const imagePath = DomEditor.findPath(editor, imageElement)
    SlateTransforms.removeNodes(editor, { at: imagePath })
    SlateTransforms.insertNodes(editor, imageSource)
    //   SlateTransforms.insertNodes(editor, linkCard)
    // } catch (err) {
    //   console.error('Convert to link-cart error', err)
    // }
  }
}

export default CovertImageToImageSource
