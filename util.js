const redis = require('redis').createClient({
  host: 'redis-13262.c99.us-east-1-4.ec2.cloud.redislabs.com',
  port: 13262,
  auth_pass: '5UFnT6uOyTcIbR96QrywsSYdFxL10sKJ',
});

module.exports = redis;
