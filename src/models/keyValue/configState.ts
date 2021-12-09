import { AsyncModels } from 'kurimudb'
import { dexieDriverFactory } from 'kurimudb-driver-dexie'
import migrations from '../migrations'
import defaultSetting from '~/setting/defaultSetting'

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
}

export default new ConfigState()
