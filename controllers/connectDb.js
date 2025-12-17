const mongoose=require('mongoose');
const uri = "mongodb+srv://Andy:Merlin_2618%3F%23@nthambiepotraits.bkvblp0.mongodb.net/nthambieDB?retryWrites=true&w=majority";

async function connectDB(){
    try{
      await mongoose.connect(uri);
       console.log("connected to mongoDb")
    }
    catch(err){
        console.error(err.message);
    }
}
module.exports={connectDB};
