/**
 * @description parse html
 * @author wangfupeng
 */

import { Descendant } from 'slate'
import { IDomEditor } from '@wangeditor/editor'
import $, { DOMElement, getStyleValue } from '@/utils/dom'

function parseHtml(elem: DOMElement, children: Descendant[], editor: IDomEditor) {
  const $elem = $(elem)
  let href = $elem.attr('data-href') || ''
  href = decodeURIComponent(href) // 兼容 V4

  const style: Record<string, string> = {}
  const styleStr = ($elem.attr('data-style') || '').split(';').map((s: string) => s.trim())
  styleStr.forEach((s: string) => {
    const [key, value] = s.split(':').map(s => s.trim())
    if (key && value) style[key] = value
  })

  // const width = getStyleValue($elem, 'width')
  // if (width) Object.assign(style, { width })

  return {
    type: 'image-source',
    src: $elem.attr('data-src') || '',
    alt: $elem.attr('data-alt') || '',
    href,
    style,
    source: $elem.attr('data-source') || '',
    sourceHref: $elem.attr('data-source-href') || '',
    children: [{ text: '' }], // void node 有一个空白 text
  }
}

export const parseHtmlConf = {
  selector: '[data-w-e-type="image-source"]', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseHtml,
}
