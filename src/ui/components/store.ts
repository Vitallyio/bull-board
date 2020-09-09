import * as api from '../../@types/api'
import { Reducer } from 'redux'

interface State {
  data: null | api.GetQueues
  loading: boolean
  search: string | undefined
}

enum ActionType {
  one = 'one',
}

interface Action {
  type: ActionType
}

const initialState: State = {
  data: null,
  loading: false,
  search: undefined,
}

export const reducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action,
): State => {
  console.log(action.type)
  switch (action.type) {
    case ActionType.one:
      return state
    default:
      return state
  }
}
