import { defHttp } from '~/utils/http/axios'

enum SpaceApi {
  stat = 'https://api.bilibili.com/x/web-interface/nav/stat',
}

export function statApi() {
  return defHttp.get({ url: SpaceApi.stat })
}
