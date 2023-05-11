import { Analytics } from '@segment/analytics-node';
const logger = require("./Winston");

logger.info("Creating analytics instance");
const analytics = new Analytics({ writeKey: `${process.env.MY_WRITE_KEY}` });

module.exports = analytics;
