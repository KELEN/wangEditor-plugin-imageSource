/**
 * @description examples entry
 * @author wangfupeng
 */

import {
  IDomEditor,
  createEditor,
  createToolbar,
  Boot,
  IEditorConfig,
  i18nChangeLanguage,
} from '@wangeditor/editor'
import module from '../src/index'

// 注册
Boot.registerModule(module as any)

// i18nChangeLanguage('en')

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor: IDomEditor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    // @ts-ignore
    document.getElementById('text-json').value = contentStr
  },
  hoverbarKeys: {
    link: {
      menuKeys: ['editLink', 'unLink', 'viewLink', 'convertToLinkCard'],
    },
    'image-source': {
      menuKeys: [
        'editImageSource',
        'deleteImageSource',
        'viewImageSourceLink',
        'imageSourceWidthReset',
      ],
    },
  },
}

const initHtml2 = `<p><br></p><figure 
data-w-e-type="image-source" 
data-w-e-is-void
data-src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" 
data-alt="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" 
data-href="href" 
data-source="来源wiki">
<img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
<figcaption>来源wiki</figcaption>
</figure>
<p><br></p>`

const initHtml3 = `<p>123<strong><i>12321</i></strong>321</p>`

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  // content: [
  //   {
  //     // @ts-ignore
  //     type: 'paragraph',
  //     children: [{ text: 'hello world' }],
  //   },
  //   {
  //     // @ts-ignore
  //     type: 'link-card',
  //     title: '网页标题网页标题网页标题',
  //     link: 'https://zhuanlan.zhihu.com/',
  //     iconImgSrc: '',
  //     children: [{ text: '' }],
  //   },
  // ],
  html: `<p><br></p><figure 
  data-w-e-type="image-source" 
  data-w-e-is-void
  data-src="https://www.baidu.com/img/flexible/logo/pc/result.png" 
  data-alt="" 
  data-href=""
  data-source="123"
  data-source-href=""
  data-style="width: 274.99px;">
  <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" style="width: 274.99px;" alt="" />
  <figcaption>123</figcaption>
</figure>
<p><br></p>`,
  // html: `<p>hello&nbsp;<a href="http://news.baidu.com/" target="_blank">百度新闻</a>&nbsp;world</p>`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 1,
      keys: ['insertImageSource'],
    },
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
