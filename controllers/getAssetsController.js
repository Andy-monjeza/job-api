const path = require('path');

const getDashBoardPage = async (req, res) => {
    try {
            return res.sendFile(path.join(__dirname, '../public/dashboard.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
};

const getProfilePage=async(req,res)=>{
     try {
            return res.sendFile(path.join(__dirname, '../public/profile.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
}
module.exports ={getDashBoardPage,getProfilePage};