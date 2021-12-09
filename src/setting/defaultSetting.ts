export default {
  default: {
    storageExpried: 300, // 单位: 秒
    hasInit: true,
    modules: [
      'v2ex',
    ],
  },
  v2ex: {
    key: 'v2ex',
    enable: true,
    name: 'V2EX',
    site: 'https://www.v2ex.com',
    url: 'https://www.v2ex.com',
    storageKey: 'info-v2ex',
    expried: 300,
  },
}
