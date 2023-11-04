/**
 * @description image menu entry
 * @author wangfupeng
 */

import InsertImage from './InsertImage'
import DeleteImage from './DeleteImage'
import EditImage from './EditImage'
import ViewImageLink from './ViewImageLink'
import ImageWidth30 from './Width30'
import ImageWidth50 from './Width50'
import ImageWidth100 from './Width100'
import ImageWidthReset from './WidthReset'
import { genImageMenuConfig } from './config'

const config = genImageMenuConfig() // menu config

export const insertImageMenuConf = {
  key: 'insertImageSource',
  factory() {
    return new InsertImage()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config,
}

export const deleteImageMenuConf = {
  key: 'deleteImageSource',
  factory() {
    return new DeleteImage()
  },
}

export const editImageMenuConf = {
  key: 'editImageSource',
  factory() {
    return new EditImage()
  },
  config,
}

export const viewImageLinkMenuConf = {
  key: 'viewImageSourceLink',
  factory() {
    return new ViewImageLink()
  },
}

export const imageWidth30MenuConf = {
  key: 'imageSourceWidth30',
  factory() {
    return new ImageWidth30()
  },
}

export const imageWidth50MenuConf = {
  key: 'imageSourceWidth50',
  factory() {
    return new ImageWidth50()
  },
}

export const imageWidth100MenuConf = {
  key: 'imageSourceWidth100',
  factory() {
    return new ImageWidth100()
  },
}

export const imageSizeResetMenuConf = {
  key: 'imageSourceWidthReset',
  factory() {
    return new ImageWidthReset()
  },
}
