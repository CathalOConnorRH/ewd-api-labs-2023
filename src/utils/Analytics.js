import { Analytics } from '@segment/analytics-node';
// instantiation
const analytics = new Analytics({ writeKey: `${process.env.MY_WRITE_KEY}` });

module.exports = analytics;
