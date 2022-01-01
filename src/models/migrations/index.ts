import Dexie from 'dexie'

const db = new Dexie('contea')

db.version(1).stores({
  info_list: 'ca_slug,ca_module,ca_module_type,ca_sort_at',
})

db.version(1).stores({
  config_state: '_id',
  module_state: '_id',
})

db.version(1).stores({
  _seed: '_id',
})

export default db
