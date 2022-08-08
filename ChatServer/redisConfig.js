const redis = require("redis");

const connectToRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.log(err);
  }
};
const redisClient = redis.createClient();
connectToRedis();
redisClient.on("connect", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to redis");
  }
});

module.exports = {redisClient};
