import { defHttp } from '~/utils/http/axios'

class Vedio {
  /**
   * libvio 最新视频
   * @returns array
   */
  async libvio() {
    const url = 'https://www.libvio.com/'

    const res = await defHttp.get({
      url,
    })

    const domParser = new DOMParser()
    const dom = domParser.parseFromString(res.data, 'text/html')

    const list: any = []
    const items = dom.querySelectorAll('.stui-pannel__bd > .stui-vodlist:first-child li .stui-vodlist__box')
    items.forEach((item) => {
      const title = item.querySelector('a')?.getAttribute('title')
      const url = item.querySelector('a')?.getAttribute('href')
      const pic_url = item.querySelector('a')?.getAttribute('data-original')
      const des = item.querySelector('a span.pic-text')?.innerHTML
      const tag = item.querySelector('a span.pic-tag')?.innerHTML
      list.push({
        title,
        url,
        pic_url,
        des,
        tag,
      })
    })

    return list
  }

  /**
   * 低端影视 最新视频
   * @returns
   */
  async ddrk() {
    const url = 'https://ddrk.me/'

    const res = await defHttp.get({
      url,
    })

    const domParser = new DOMParser()
    const dom = domParser.parseFromString(res.data, 'text/html')

    const list: any = []
    const items = dom.querySelectorAll('.post-box-list .post-box .post-box-container')
    items.forEach((item) => {
      const title = item.querySelector('.post-box-title a')?.innerHTML
      const url = item.querySelector('.post-box-title a')?.getAttribute('href')
      const pic_url = item.querySelector('.post-box-image')?.getAttribute('style')
      const tagDom = item.querySelectorAll('.post-box-meta a')
      const tags: any = []
      tagDom.forEach((tagItem) => {
        const tagName = tagItem.innerHTML
        const tagUrl = tagItem.getAttribute('href')
        tags.push({
          name: tagName,
          url: tagUrl,
        })
      })
      list.push({
        title,
        url,
        pic_url,
        tags,
      })
    })

    return list
  }
}

export default new Vedio()
