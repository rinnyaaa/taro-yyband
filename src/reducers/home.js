import { ACCOUNT_NAME, ACCOUNT_BUDGET, ACCOUNT_INCOME, ACCOUNT_INFO, TOTAL_OUT, TOTAL_IN, RECORD_TYPE,RECENT_RECORD } from '../constants/home'
const INITIAL_STATE = {
  account: {
    accountName: '我的账本',
    budget: 2000,
    wage: 5000,
    totalOut: 0,
    totalIn: 0
  },
  recordType: [],
  recentRecords: [],
}

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACCOUNT_INFO:
      const { totalIn, totalOut, account } = action.payload
      const { accountName, budget, wage } = account
      return {
        ...state,
        account: { accountName, budget, wage, totalIn, totalOut }
      }
    case RECORD_TYPE:
      const recordType = action.payload
      return {
        ...state,
        recordType
      }
    case RECENT_RECORD:
      const recentRecords = action.payload
      return {
        ...state,
        recentRecords
      }

    default:
      return state
  }
}
