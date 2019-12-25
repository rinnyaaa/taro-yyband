// const isH5 = process.env.CLIENT_ENV === 'h5'
// const HOST = '"http://127.0.0.1:7001"'
const HOST = '"http://0.0.0.0:7001"'
// const HOST = '"http://192.168.1.7:7001"'
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST,
    // HOST_M: isH5 ? '"/api-m"' : HOST_M
    // HOST: isH5 ? '"/api"' : HOST,
    // HOST_M: isH5 ? '"/api-m"' : HOST_M
  },
  weapp: {},
  h5: {}
}
