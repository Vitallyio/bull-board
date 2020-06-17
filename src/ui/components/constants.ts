export const STATUSES = {
  latest: 'latest',
  active: 'active',
  waiting: 'waiting',
  completed: 'completed',
  failed: 'failed',
  delayed: 'delayed',
  paused: 'paused',
}

export type Status = keyof typeof STATUSES

export type Field =
  | 'attempts'
  | 'data'
  | 'id'
  | 'opts'
  | 'progress'
  | 'timestamps'
  | 'delay'
  | 'failedReason'
  | 'retry'
  | 'promote'

export const FIELDS: Record<Status, Field[]> = {
  active: ['id', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
  completed: ['id', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
  delayed: ['id', 'attempts', 'data', 'delay', 'opts', 'promote', 'timestamps'],
  failed: [
    'id',
    'attempts',
    'failedReason',
    'data',
    'opts',
    'progress',
    'retry',
    'timestamps',
  ],
  latest: ['id', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
  paused: ['id', 'attempts', 'data', 'opts', 'timestamps'],
  waiting: ['id', 'data', 'opts', 'timestamps'],
}
