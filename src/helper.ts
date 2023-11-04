/**
 * @description image menu helper
 * @author wangfupeng
 */

import { Transforms, Range, Editor } from 'slate'
import { IDomEditor, DomEditor } from '@wangeditor/editor'
import { ImageSourceElement, ImageSourceInput, ImageStyle } from './custom-types'

/**
 * 替换特殊字符
 * @param str 字符串
 */
export function replaceSymbols(str: string) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function check(
  menuKey: string,
  editor: IDomEditor,
  src: string,
  alt: string = '',
  href: string = ''
): Promise<boolean> {
  const { checkImage } = editor.getMenuConfig(menuKey)
  if (checkImage) {
    const res = await checkImage(src, alt, href)
    if (typeof res === 'string') {
      // 检验未通过，提示信息
      editor.alert(res, 'error')
      return false
    }
    if (res == null) {
      // 检验未通过，不提示信息
      return false
    }
  }

  return true
}

async function parseSrc(menuKey: string, editor: IDomEditor, src: string): Promise<string> {
  const { parseImageSrc } = editor.getMenuConfig(menuKey)
  if (parseImageSrc) {
    const newSrc = await parseImageSrc(src)
    return newSrc
  }
  return src
}

export async function insertImageNode(editor: IDomEditor, imageSourceInput: ImageSourceInput) {
  const { src, alt = '', href = '' } = imageSourceInput

  const res = await check('insertImageSource', editor, src, alt, href)
  if (!res) return // 检查失败，终止操作

  const parsedSrc = await parseSrc('insertImageSource', editor, src)

  const imageSourceNode = {
    type: 'image-source',
    style: {
      width: '100px',
    },
    ...imageSourceInput,
    src: parsedSrc,
    children: [{ text: '' }],
  }

  // 如果 blur ，则恢复选区
  if (editor.selection === null) editor.restoreSelection()

  // 如果当前正好选中了图片，则 move 一下（如：连续上传多张图片时）
  if (DomEditor.getSelectedNodeByType(editor, 'image-source')) {
    console.log('选中了图片，move 一下')
    editor.move(1)
  }

  if (isInsertImageMenuDisabled(editor)) return

  // 插入图片
  Transforms.insertNodes(editor, imageSourceNode)

  // 回调
  const { onInsertedImage } = editor.getMenuConfig('insertImageSource')
  if (onInsertedImage) onInsertedImage(imageSourceInput)
}

export async function updateImageNode(
  editor: IDomEditor,
  src: string,
  alt: string = '',
  href: string = '',
  style: ImageStyle = {},
  source: string = '',
  sourceHref: string = ''
) {
  const res = await check('editImageSource', editor, src, alt, href)

  if (!res) return // 检查失败，终止操作

  const parsedSrc = await parseSrc('editImageSource', editor, src)

  const selectedImageNode = DomEditor.getSelectedNodeByType(editor, 'image-source')
  if (selectedImageNode == null) return
  const { style: curStyle = {} } = selectedImageNode as ImageSourceElement

  // 修改图片
  const nodeProps: Partial<ImageSourceElement> = {
    src: parsedSrc,
    alt,
    href,
    style: {
      ...curStyle,
      ...style,
    },
    source,
    sourceHref,
  }
  Transforms.setNodes(editor, nodeProps, {
    match: n => DomEditor.checkNodeType(n, 'image-source'),
  })

  // 回调
  const imageNode = DomEditor.getSelectedNodeByType(editor, 'image-source')
  const { onUpdatedImage } = editor.getMenuConfig('editImageSource')
  if (onUpdatedImage) onUpdatedImage(imageNode)
}

/**
 * 判断菜单是否要 disabled
 * @param editor editor
 */
export function isInsertImageMenuDisabled(editor: IDomEditor): boolean {
  const { selection } = editor
  if (selection == null) return true
  if (!Range.isCollapsed(selection)) return true // 选区非折叠，禁用

  const [match] = Editor.nodes(editor, {
    match: n => {
      const type = DomEditor.getNodeType(n)

      if (type === 'code') return true // 代码块
      if (type === 'pre') return true // 代码块
      if (type === 'link') return true // 链接
      if (type === 'list-item') return true // list
      if (type.startsWith('header')) return true // 标题
      if (type === 'blockquote') return true // 引用
      if (Editor.isVoid(editor, n)) return true // void

      return false
    },
    universal: true,
  })

  if (match) return true
  return false
}
