const mongoose=require('mongoose');

async function connectDB(){
    try{
      await mongoose.connect(process.env.DbUri);
       console.log("connected to mongoDb")
    }
    catch(err){
        console.error(err.message);
    }
}
module.exports={connectDB};
