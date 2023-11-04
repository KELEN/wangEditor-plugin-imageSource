/**
 * @description pre parse html
 * @author wangfupeng
 */

import $, { getTagName, DOMElement } from '@/utils/dom'

/**
 * pre-prase video ，兼容 V4
 * @param elem elem
 */
function preParse(elem: DOMElement): DOMElement {
  const $elem = $(elem)
  console.log('preParse figcaption')
  // replace
  const $container = $(`<span>xxxxc</span>`)
  // return
  return $container[0]
}

export const preParseHtmlConf = {
  selector: 'figcaption',
  preParseHtml: preParse,
}
