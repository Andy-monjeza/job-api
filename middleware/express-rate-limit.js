const limiter= require('express-rate-limit');

const limit=limiter({
    windowMs: 15 * 60 * 1000,
    limit:100,
    standardHeaders: 'draft-8', 
    legacyHeaders: false,      
},next=>{next()});

const limitLogin=limiter({
     windowMs: 15 * 60 * 1000,
    limit:10,
    standardHeaders: 'draft-8', 
    legacyHeaders: false,      
},next=>{ next()});

module.exports={limit, limitLogin};