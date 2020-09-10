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
  | 'name'
  | 'opts'
  | 'progress'
  | 'timestamps'
  | 'delay'
  | 'failedReason'
  | 'retry'
  | 'promote'
  | 'clean'

export const FIELDS: Record<Status, Field[]> = {
  active: ['id', 'name', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
  completed: [
    'id',
    'name',
    'attempts',
    'data',
    'opts',
    'progress',
    'timestamps',
  ],
  delayed: [
    'id',
    'name',
    'attempts',
    'data',
    'delay',
    'opts',
    'promote',
    'timestamps',
    'clean',
  ],
  failed: [
    'id',
    'attempts',
    'failedReason',
    'data',
    'opts',
    'progress',
    'retry',
    'timestamps',
    'clean',
  ],
  latest: ['id', 'name', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
  paused: ['id', 'name', 'attempts', 'data', 'opts', 'timestamps'],
  waiting: ['id', 'name', 'data', 'opts', 'timestamps', 'clean'],
}
