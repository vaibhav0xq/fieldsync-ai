import { PowerSyncDatabase } from '@powersync/web'

const db = new PowerSyncDatabase({
  schema: {
    reports: {
      id: 'string',
      type: 'string',
      category: 'string',
      location: 'string',
      description: 'string',
      image: 'string'
    }
  }
})

export default db
