const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    bName : {//business name
        type:String,
        required: [true, "Business name is required"],
    }, 
    logo: String,
    socialMedia : new mongoose.Schema({
        facebook:String,
        instagram:String,
        twitter:String
    }),
    content:new mongoose.Schema({
        aboutCompany:String,
        locationCompany:String
    }),
    relatedDocs:{
        type:String
    },
    remarks:{
        type:String
    },
    users_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
})

const Customer = mongoose.model("customers",customerSchema)

module.exports = Customer