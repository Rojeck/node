const {User} = require('./models/users.js');


const getUserInfo = (req,res,next) => {
 
        User.findById({_id: req.user.userId}).then(data => {
            res.json(data);
        }).catch(() => {
            res.status(400).json({
                "message": "Did not find"
            })
        })
    
}

module.exports = {
    getUserInfo
}