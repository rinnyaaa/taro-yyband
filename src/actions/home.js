import {ACCOUNT_NAME, ACCOUNT_BUDGET,ACCOUNT_INCOME,ACCOUNT_INFO,RECORD_TYPE,RECENT_RECORD} from '../constants/home'
import {API_Account_INFO,API_TYPE,API_RECORD} from '../constants/api'
import { createAction } from "../utils/redux";

export const dispatchAccount = payload => createAction({
  url: API_Account_INFO,
  type: ACCOUNT_INFO,
  payload
});

export const type = payload => createAction({
  url: API_TYPE,
  type: RECORD_TYPE,
  payload
});

export const getRecentRecord = payload => createAction({
  url: API_RECORD+'/2',
  type: RECENT_RECORD,
  payload
});
// export const dispatchAddRecord = payload => createAction({
//   url: API_Record,
//   type: ACCOUNT_INFO,
//   method:'POST',
//   // cb: res=>{
//   // },
//   payload
// });