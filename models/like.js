const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath:'onModel'
    },
    // this field is used for defined the type of the liked object since these is the dynamic reference 
    onModel:{
        type: String,
        require: true,
        enum:['Post', 'Comment']
    }
},{
          timestamps: true  
    
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
