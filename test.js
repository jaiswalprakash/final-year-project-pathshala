const request = require('request');
const url='http://time.jsontest.com/';

request({url},(error,Response)=>{
    const data =JSON.parse(Response.body);
    console.log(data);
});

