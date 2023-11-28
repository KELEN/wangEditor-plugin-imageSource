/**
 * @description image element
 * @author wangfupeng
 */

//【注意】需要把自定义的 Element 引入到最外层的 custom-types.d.ts

type EmptyText = {
  text: ''
}

export type ImageStyle = {
  width?: string
  height?: string
}

export type ImageElement = {
  type: 'image'
  src: string
  alt?: string
  href?: string
  style?: ImageStyle
  children: EmptyText[]
}

// 有父级元素的 image
export type ImageSourceElement = {
  type: 'image-source'
  style?: ImageStyle
  src: string
  alt?: string
  href?: string
  source?: string
  sourceHref?: string
  children: EmptyText[]
}

export type ImageSourceInput = {
  src: string
  alt?: string
  href?: string
  source?: string
  sourceHref?: string
}
