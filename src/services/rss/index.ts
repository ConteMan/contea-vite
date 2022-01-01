import fxparser from 'fast-xml-parser'
import { defHttp } from '~/utils/http/axios'

class RSS {
  // 解析 Feed 返回 JSON
  async json(feed: string) {
    // eslint-disable-next-line no-console
    console.log(feed)
    const res = await defHttp.get({
      url: feed,
    })

    const parser = new fxparser.XMLParser()
    const feedJson = await parser.parse(res.data)

    const channel = feedJson.rss.channel
    // eslint-disable-next-line no-console
    console.log(channel)

    const { item: items } = feedJson.rss.channel
    const list: any = []
    items.forEach((item: any) => {
      list.push({
        ...item,
      })
    })

    return list
  }
}

export default new RSS()
