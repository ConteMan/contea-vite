import { AsyncModels } from 'kurimudb'
import { dexieDriverFactory } from 'kurimudb-driver-dexie'
import migrations from '../migrations'

export default new (class List extends AsyncModels.collection {
  constructor() {
    super({
      name: 'List',
      driver: dexieDriverFactory,
      db: migrations,
    })
  }
})()
