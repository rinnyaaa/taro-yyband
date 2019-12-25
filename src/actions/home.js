import {ACCOUNT_NAME, ACCOUNT_BUDGET,ACCOUNT_INCOME,ACCOUNT_INFO,RECORD_TYPE} from '../constants/home'
import {API_Account_INFO,API_TYPE} from '../constants/api'
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

// export const dispatchAddRecord = payload => createAction({
//   url: API_Record,
//   type: ACCOUNT_INFO,
//   method:'POST',
//   // cb: res=>{
//   // },
//   payload
// });