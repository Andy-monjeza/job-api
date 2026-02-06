const path = require('path');

const getDashBoard = async (req, res) => {
    try {
        
            return res.sendFile(path.join(__dirname, '../public/dashboard.html'));
        
    } catch (error) {
        res.status(500).send("Something went wrong, please try again sometime ");
    }
};

module.exports ={getDashBoard}