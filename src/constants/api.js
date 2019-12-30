/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
// export const host = HOST
// export const host = 'http://192.168.1.7:7001'
export const host = 'http://192.168.0.116:7001'
// export const hostM = HOST_M
/* eslint-enable */
// user
export const API_USER_LOGIN = `${host}/api/user/access/login`;

// --------------记账----------------
//account
export const API_Account_INFO= `${host}/api/account`; 

//record
//recent record `${host}/api/record/num`
export const API_RECORD= `${host}/api/record`;
export const API_RECORD_BY_MONTH= `${host}/api/recordByMonth`;

//type
export const API_TYPE= `${host}/api/type`;

