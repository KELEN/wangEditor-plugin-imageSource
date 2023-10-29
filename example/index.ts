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
        'imageSourceWidth30',
        'imageSourceWidth50',
        'imageSourceWidth100',
      ],
    },
  },
}

const initHtml = `<p><br></p>
<div 
  data-w-e-type="image-source"
  data-w-e-is-void
  data-w-e-is-inline
  data-src="https://himg.bdimg.com/sys/portrait/item/public.1.d5687a4f.U-Oa-nIwRRoeMouAR9Fpwg.jpg"
  data-alt="https://himg.bdimg.com/sys/portrait/item/public.1.d5687a4f.U-Oa-nIwRRoeMouAR9Fpwg.jpg"
  data-href="https://himg.bdimg.com/sys/portrait/item/public.1.d5687a4f.U-Oa-nIwRRoeMouAR9Fpwg.jpg"
  data-source="图片来源"
  style="width: 100px;"
>
  <img src="https://himg.bdimg.com/sys/portrait/item/public.1.d5687a4f.U-Oa-nIwRRoeMouAR9Fpwg.jpg" alt="https://himg.bdimg.com/sys/portrait/item/public.1.d5687a4f.U-Oa-nIwRRoeMouAR9Fpwg.jpg" data-href="https://himg.bdimg.com/sys/portrait/item/public.1.d5687a4f.U-Oa-nIwRRoeMouAR9Fpwg.jpg" style="width: 100px;"/><div class="image-source">图片来源</div>
</div>
<p><br></p>`

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
  html: `<p>hello&nbsp;world</p>${initHtml}`,
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
