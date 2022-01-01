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
}

export default new ModuleState()
