import { AsyncModels } from 'kurimudb'
import { dexieDriverFactory } from 'kurimudb-driver-dexie'
import migrations from '../migrations'

class ModuleState extends AsyncModels.keyValue {
  constructor() {
    super({
      name: 'module_state',
      driver: dexieDriverFactory,
      db: migrations,
    })
  }

  // 有效数据
  async effValue(key: string, expried: number): Promise<object | boolean > {
    const now = new Date().getTime()
    const value = await this.getItem(key)
    if (value?.expried && value?.expried > now + expried)
      return value
    else
      return false
  }
}

export default new ModuleState()
