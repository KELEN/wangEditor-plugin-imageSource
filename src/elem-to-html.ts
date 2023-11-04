/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'
import { ImageSourceElement } from './custom-types'

function imageToHtml(elemNode: Element, childrenHtml: string): string {
  const { alt, source, style, href, src, sourceHref } = elemNode as ImageSourceElement

  // console.log('elem-to-html imageToHtml', elemNode, childrenHtml)

  const { width = '' } = style || {}

  let styleStr = ''
  if (width) styleStr += `width: ${width};`
  // if (height) styleStr += `height: ${height};`

  return `<figure 
      data-w-e-type="image-source" 
      data-w-e-is-void
      data-src="${src}" 
      data-alt="${alt}" 
      data-href="${href}" 
      data-source="${source}">
      <img 
        src="${src}" 
        style="${styleStr}" 
      />
      <figcaption>${source}</figcaption>
    </figure>
  `
}

export const imageToHtmlConf = {
  type: 'image-source',
  elemToHtml: imageToHtml,
}
