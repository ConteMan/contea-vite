/* eslint-disable prefer-regex-literals */
import dayjs from 'dayjs'
import type { Config, BaseUser, User } from './model'
import { defHttp } from '~/utils/http/axios'
import { deepMerge } from '~/utils'
import configState from '~/models/keyValue/configState'
import moduleState from '~/models/keyValue/moduleState'
import infoList from '~/models/list/infoList'

class V2EX {
  private moduleName = 'v2ex'

  // 获取配置信息
  async getConfig(): Promise<Config> {
    return await configState.getItem(this.moduleName)
  }

  // 登录校验
  async loginCheck(): Promise<boolean> {
    const { url } = await this.getConfig()

    const settingUrl = `${url}/settings`
    try {
      const res = await defHttp.get({
        url: settingUrl,
      })
      return res.request.responseURL === settingUrl // 如果有 302 跳转则认为未登录
    }
    catch (error) {
      return false
    }
  }

  /**
   * 获取用户名
   */
  async getUserName(): Promise<BaseUser> {
    const { url, key } = await this.getConfig()

    const res = await defHttp.get({ url })

    const startTime = performance.now()
    const domParser = new DOMParser()
    const dom = domParser.parseFromString(res.data, 'text/html')

    const aDoms = dom.querySelectorAll('#Top .tools a')
    const username = aDoms?.[1].getAttribute('href') ?? ''

    const endTime = performance.now()
    // eslint-disable-next-line no-console
    console.log('parser username cost is ', `${endTime - startTime}ms`)

    const info = await moduleState.getItem(key)
    const current: BaseUser = deepMerge(info ?? {}, { username, expried: 0, login: !!username }) // 获取用户名后，设置过期时间为 0，立即更新用户信息
    await moduleState.setItem(key, current)

    return current
  }

  /**
   * 获取用户信息
   */
  async user(): Promise<User> {
    const { url, key, expried } = await this.getConfig()
    let info = await moduleState.getItem(key)

    if (!info?.username)
      info = await this.getUserName()

    const now = new Date().getTime()
    if (!info?.username || info?.expried > now)
      return info

    const username = info?.username
    const res = await defHttp.get({
      url: `${url}${username}`,
    })

    const domParser = new DOMParser()
    const dom = domParser.parseFromString(res.data, 'text/html')

    const mainDom = dom.querySelector('#Main')

    const idHtml = mainDom?.querySelector('span.gray')?.innerHTML
    const id = idHtml?.match(/V2EX 第 ([0-9]+?) 号会员/)?.[1]
    const created = idHtml?.match(/加入于 (.+?) /)?.[1]
    const dau = mainDom?.querySelector('span.gray a')?.innerHTML
    const online = mainDom?.querySelector('strong.online')?.innerHTML
    const balanceHtml = mainDom?.querySelector('div.balance_area')?.innerHTML
    const balanceArray = [...String(balanceHtml).matchAll(/\s?([0-9]+?)\s\</g)]
    const balance = {
      gold: balanceArray[0][1],
      silver: balanceArray[1][1],
      bronze: balanceArray[2][1],
    }
    const showName = username.split('/')?.[2]
    const signature = mainDom?.querySelector('.bigger')?.innerHTML

    const newInfo = deepMerge(info, {
      updatedAt: now,
      expried: now + expried * 1000,
      login: true,
      id,
      created,
      dau,
      online,
      balance,
      showName,
      signature,
    })

    moduleState.setItem(key, newInfo)

    return newInfo as User
  }

  /**
   * 签到
   * @returns
   */
  async mission(): Promise<object> {
    const { url } = await this.getConfig()

    const mainPage = await defHttp.get({ url })
    const sign = mainPage.data.match(/once=([0-9]+)/)?.[1]

    const missionUrl = `${url}/mission/daily/redeem`
    const res = await defHttp.get({
      url: missionUrl,
      params: {
        once: sign,
      },
    })

    const data = res.data
    const messionRes = !!data.match(/每日登录奖励已领取/)
    let days = 0
    if (messionRes)
      days = data.match(/已连续登录 ([0-9]+?) 天/)?.[1]

    return {
      completed: messionRes,
      days,
    }
  }

  /**
   * 获取关注的人的动态列表
   */
  async followActivity() {
    const moduleType = 'followActivity'

    const { url } = await this.getConfig()

    const res = await defHttp.get({
      url: `${url}/my/following`,
    })

    const domStr = res.data
    const domParser = new DOMParser()
    const dom = domParser.parseFromString(domStr, 'text/html')

    const itemListDom = dom.querySelectorAll('#Main .cell.item')
    const list: any = []
    itemListDom.forEach((item) => {
      const title = item.querySelector('.item_title a')?.innerHTML
      const title_link = item.querySelector('.item_title a')?.getAttribute('href')
      const node = item.querySelector('.topic_info > .node')?.innerHTML
      const node_link = item.querySelector('.topic_info > .node')?.getAttribute('href')
      const author = item.querySelector('.topic_info strong a')?.innerHTML
      const author_link = item.querySelector('.topic_info strong a')?.getAttribute('href')
      const created_at = item.querySelector('.topic_info span')?.getAttribute('title')
      const reply_count = item.querySelector('td[align=right] a')?.innerHTML
      list.push(
        {
          ca_module: this.moduleName,
          ca_module_type: moduleType,
          ca_sort_at: dayjs(created_at).valueOf(),

          title,
          title_link,
          node,
          node_link,
          author,
          author_link,
          created_at,
          reply_count,
        },
      )
    })

    await infoList.bulkSetItemByModule(list, ['author', 'created_at'])

    return list
  }
}

export default new V2EX()
