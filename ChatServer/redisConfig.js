const redis = require("redis");

const connectToRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.log(err);
  }
};
const redisClient = redis.createClient({
    url: `redis://default:0z2EOoNqAgl3jGeIcAhJH4xAWSFBeJNV@redis-12325.c250.eu-central-1-1.ec2.cloud.redislabs.com:12325`,
});
connectToRedis();
redisClient.on("connect", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to redis");
  }
});

module.exports = { redisClient };
