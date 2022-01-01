import { AsyncModels } from 'kurimudb'
import { dexieDriverFactory } from 'kurimudb-driver-dexie'
import migrations from '../migrations'
import defaultSetting from '~/setting/defaultSetting'
import { deepMerge } from '~/utils'

class ConfigState extends AsyncModels.keyValue {
  constructor() {
    super({
      name: 'config_state',
      driver: dexieDriverFactory,
      db: migrations,
    })
  }

  // 初始化
  async init() {
    await this.bulkSetItem(defaultSetting)
  }

  // 合并式设置
  async mergeSet(key: string, data: object) {
    const res = await this.getItem(key)
    const mergeRes = deepMerge(res, data)
    await this.setItem(key, mergeRes)
  }
}

export default new ConfigState()
