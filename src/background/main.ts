import { sendMessage, onMessage } from 'webext-bridge'
import { Tabs } from 'webextension-polyfill'
import configState from '~/models/keyValue/configState'
import { defHttp } from '~/utils/http/axios'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  // import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
  configState.init()
})

let previousTabId = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(previousTabId)
    previousTabId = tabId
  }
  catch {
    return
  }

  // eslint-disable-next-line no-console
  console.log('previous tab', tab)
  sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })

  // const page = await defHttp.get({
  //   url: 'https://mp.weixin.qq.com/s/UhFBygOQom0giomxAtTY7Q',
  // })
  // // eslint-disable-next-line no-console
  // console.log('page', page)
})

onMessage('get-current-tab', async() => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.id,
    }
  }
  catch {
    return {
      title: undefined,
    }
  }
})

onMessage('get-page', async({ data }) => {
  const { url } = data as any
  return await defHttp.get({
    url,
  })
})

browser.runtime.onMessage.addListener(async(message, sender) => {
  // eslint-disable-next-line no-console
  console.log({ message, sender })

  const { command, param } = message

  let data = {}
  if (command === 'get-page') {
    data = await defHttp.get({
      url: param.url,
    })
  }

  return {
    command,
    data,
  }
})
