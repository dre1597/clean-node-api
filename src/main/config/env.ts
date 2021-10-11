export default {
  port: process.env.PORT || 5050,
  mongoUrl: global.__MONGO_URI__ || 'mongodb://localhost:27017/clean-node-api'
}
