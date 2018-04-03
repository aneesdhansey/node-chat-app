const moment = require('moment');

// const date = new Date();
// console.log(date.getMonth())

const date = moment();
//date.add(1, 'day').subtract(9, 'months')
console.log(date.format('MMM Do, YYYY hh:mm a'));