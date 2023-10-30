/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'
import { ImageSourceElement } from './custom-types'

function imageToHtml(elemNode: Element, childrenHtml: string): string {
  const { alt, source, style, href, src, sourceHref } = elemNode as ImageSourceElement

  // console.log('elem-to-html imageToHtml', elemNode, childrenHtml)

  const { width = '', height = '' } = style || {}

  let styleStr = ''
  if (width) styleStr += `width: ${width};`
  // if (height) styleStr += `height: ${height};`

  return `
    <figure 
      data-w-e-type="image-source"
      data-w-e-is-void
      data-w-e-is-inline
      data-src="${src}"
      data-alt="${alt}"
      data-href="${href}"
      data-source="${source}"
      style="${styleStr}"
    >
      <img src="${src}" alt="${alt}" data-href="${href}" style="${styleStr}"/>
      ${
        source
          ? `<figcaption><a href="${
              sourceHref || 'javascript:void()'
            }" class="image-source"><span>${source}</span></a></figcaption>`
          : ''
      }
</figure>
  `
}

export const imageToHtmlConf = {
  type: 'image-source',
  elemToHtml: imageToHtml,
}
