const logger=(req,res,next)=>{
    const date=new Date();
    console.log(req.method, req.url, req.body ,date.toString());
    next();
}

module.exports={logger};
