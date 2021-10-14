export default {
  port: process.env.PORT || 5050,
  mongoUrl: process.env.MONGO_URL || global.__MONGO_URI__ || 'mongodb://localhost:27017/clean-node-api',
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H3'
}
