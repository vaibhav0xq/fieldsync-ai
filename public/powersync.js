import { PowerSyncDatabase } from '@powersync/web';

export const db = new PowerSyncDatabase({
  schema: {
    tables: {
      reports: {
        columns: {
          id: 'text',
          type: 'text',
          category: 'text',
          location: 'text',
          description: 'text',
          ai_analysis: 'text',
          created_at: 'text'
        }
      }
    }
  }
});