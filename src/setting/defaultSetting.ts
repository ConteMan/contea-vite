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
    expried: 300,
  },
  sspai: {
    key: 'sspai',
    enable: true,
    name: '少数派',
    site: 'https://sspai.com',
    url: 'https://sspai.com',
    apiUrl: 'https://sspai.com/api/v1',
    cdnUrl: 'https://cdn.sspai.com',
    expried: 86400,
  },
}
