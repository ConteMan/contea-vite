/* eslint-disable prefer-regex-literals */
import type { Config, BaseUser, User } from './model'
import configState from '~/models/keyValue/configState'
import moduleState from '~/models/keyValue/moduleState'
import { defHttp } from '~/utils/http/axios'
import { deepMerge } from '~/utils'

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
      return res.request.responseURL === settingUrl
    }
    catch (error) {
      return false
    }
  }

  /**
   * 用户名获取
   */
  async getUserName(): Promise<BaseUser> {
    const { url, key } = await this.getConfig()

    const res = await defHttp.get({ url })

    const domParser = new DOMParser()
    const dom = domParser.parseFromString(res.data, 'text/html')

    const aDoms = dom.querySelectorAll('#Top .tools a')
    const username = aDoms?.[1].getAttribute('href') ?? ''

    const info = await moduleState.getItem(key)
    const current: BaseUser = deepMerge(info ?? {}, { username, expried: 0 }) // 获取用户名后，设置过期时间为 0，立即更新用户信息
    await moduleState.setItem(key, current)

    return current
  }

  /**
   * 用户信息
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
      id,
      created,
      dau,
      online,
      balance,
      showName,
      signature,
    })

    await moduleState.setItem(key, newInfo)

    return newInfo as User
  }

  /**
   * 签到
   * @returns
   */
  async mission(): Promise<object> {
    const { url } = await this.getConfig()

    const missionUrl = `${url}/mission/daily/redeem`
    const res = await defHttp.get({
      url: missionUrl,
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
}

export default new V2EX()
