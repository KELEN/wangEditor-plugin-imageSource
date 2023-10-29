/**
 * @description editor image menu
 * @author wangfupeng
 */

import { Node, Range } from 'slate'
import {
  IModalMenu,
  IDomEditor,
  DomEditor,
  genModalInputElems,
  genModalButtonElems,
  t,
} from '@wangeditor/editor'
import $, { Dom7Array, DOMElement } from '@/utils/dom'
import { genRandomStr } from '@/utils/util'
import { PENCIL_SVG } from '@/constants/index'
import { updateImageNode } from '../helper'
import { ImageSourceElement, ImageStyle } from '../custom-types'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-edit-image-source')
}

class EditImage implements IModalMenu {
  readonly title = t('image.edit')
  readonly iconSvg = PENCIL_SVG
  readonly tag = 'button'
  readonly showModal = true // 点击 button 时显示 modal
  readonly modalWidth = 300
  private $content: Dom7Array | null = null
  private readonly srcInputId = genDomID()
  private readonly altInputId = genDomID()
  private readonly hrefInputId = genDomID()
  private readonly imageSourceId = genDomID()
  private readonly imageSourceHrefId = genDomID()
  private readonly buttonId = genDomID()

  getValue(editor: IDomEditor): string | boolean {
    // 编辑图片，用不到 getValue
    return ''
  }

  private getImageNode(editor: IDomEditor): Node | null {
    return DomEditor.getSelectedNodeByType(editor, 'image-source')
  }

  isActive(editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (!Range.isCollapsed(selection)) return true // 选区非折叠，禁用

    const imageNode = DomEditor.getSelectedNodeByType(editor, 'image-source')

    // 未匹配到 image node 则禁用
    if (imageNode == null) return true
    return false
  }

  getModalPositionNode(editor: IDomEditor): Node | null {
    return this.getImageNode(editor)
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const { srcInputId, altInputId, hrefInputId, buttonId, imageSourceId, imageSourceHrefId } = this

    const selectedImageNode = this.getImageNode(editor)
    if (selectedImageNode == null) {
      throw new Error('Not found selected image node')
    }

    // 获取 input button elem
    const [srcContainerElem, inputSrcElem] = genModalInputElems(t('image.src'), srcInputId)
    const $inputSrc = $(inputSrcElem)
    const [altContainerElem, inputAltElem] = genModalInputElems(t('image.desc'), altInputId)
    const $inputAlt = $(inputAltElem)
    const [hrefContainerElem, inputHrefElem] = genModalInputElems(t('image.link'), hrefInputId)
    const $inputHref = $(inputHrefElem)
    const [imageSourceContainerElem, inputImageSourceElem] = genModalInputElems(
      '图片来源',
      imageSourceId
    )
    const $imageSource = $(inputImageSourceElem)
    const [imageSourceHrefContainerElem, inputImageSourceHrefElem] = genModalInputElems(
      '图片来源链接',
      imageSourceHrefId
    )
    const $imageSourceHref = $(inputImageSourceHrefElem)

    const [buttonContainerElem] = genModalButtonElems(buttonId, t('common.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div></div>')

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, e => {
        e.preventDefault()
        const src = $content.find(`#${srcInputId}`).val()
        const alt = $content.find(`#${altInputId}`).val()
        const href = $content.find(`#${hrefInputId}`).val()
        const imageSource = $content.find(`#${imageSourceId}`).val()
        const imageSourceHref = $content.find(`#${imageSourceHrefId}`).val()
        this.updateImage(editor, src, alt, href, {}, imageSource, imageSourceHref)
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content
    $content.empty() // 先清空内容

    // append inputs and button
    $content.append(srcContainerElem)
    $content.append(altContainerElem)
    $content.append(hrefContainerElem)
    $content.append(imageSourceContainerElem)
    $content.append(imageSourceHrefContainerElem)
    $content.append(buttonContainerElem)

    // 设置 input val
    const {
      src,
      alt = '',
      href = '',
      source = '',
      sourceHref = '',
    } = selectedImageNode as ImageSourceElement

    console.log('selectedImageNode', selectedImageNode)
    $inputSrc.val(src)
    $inputAlt.val(alt)
    $inputHref.val(href)
    $imageSource.val(source)
    $imageSourceHref.val(sourceHref)

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $inputSrc.focus()
    })

    return $content[0]
  }

  private updateImage(
    editor: IDomEditor,
    src: string,
    alt: string = '',
    href: string = '',
    style: ImageStyle = {},
    source: string = '',
    imageSourceHref: string = ''
  ) {
    if (!src) return

    // 还原选区
    editor.restoreSelection()

    if (this.isDisabled(editor)) return

    // 修改图片信息
    updateImageNode(editor, src, alt, href, style, source, imageSourceHref)
  }
}

export default EditImage
