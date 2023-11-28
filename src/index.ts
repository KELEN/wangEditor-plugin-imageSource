/**
 * @description image module entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor/editor'
import withImageSource from './plugin'
import { renderImageConf } from './render-elem'
import { imageToHtmlConf } from './elem-to-html'
import { parseHtmlConf } from './parse-elem-html'
import {
  insertImageMenuConf,
  deleteImageMenuConf,
  editImageMenuConf,
  viewImageLinkMenuConf,
  imageWidth30MenuConf,
  imageWidth50MenuConf,
  imageWidth100MenuConf,
  imageSizeResetMenuConf,
  covertImageToImageSourceMenuConf,
  insertPLabelMenuConf,
  removePLabelMenuConf,
} from './menu/index'

const imageSource: Partial<IModuleConf> = {
  renderElems: [renderImageConf],
  elemsToHtml: [imageToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  // preParseHtml: [preParseHtmlConf],
  menus: [
    insertImageMenuConf,
    deleteImageMenuConf,
    editImageMenuConf,
    viewImageLinkMenuConf,
    imageWidth30MenuConf,
    imageWidth50MenuConf,
    imageWidth100MenuConf,
    imageSizeResetMenuConf,
    covertImageToImageSourceMenuConf,
    insertPLabelMenuConf,
    removePLabelMenuConf,
  ],
  editorPlugin: withImageSource,
}

export default imageSource
