import axios from 'axios'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false,
});

export const Api = axios.create({
    baseURL: 'https://ec2-3-236-108-31.compute-1.amazonaws.com/api',
    httpsAgent: agent
})