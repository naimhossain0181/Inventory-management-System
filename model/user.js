const mongoose=require('mongoose')
const validator=require("validator")
const crypto=require("crypto")
const bcrypt=require("bcryptjs")

const userSchema=mongoose.Schema({
    firstName:{
        type: String,
        require:[true,"provide your first name"],
        minLength:[3,"must have 3 character"],
        maxLength:50,
        trim: true
    },
    lastName:{
        type:String,
        require:[true,"provide your last name"],
        minLength: [3,"must have 3 character"],
        maxLength: 50,
        trim:true
    },
    email:{
        type:String,
        validate:[validator.isEmail(),"provide a valid email"],
        trim:true,
        require: [true,"email address is required"],
        lowercase:true,
        unique:true
    } ,
    password:{
        type:String,
        validate: [{
            validator:(value)=>{
                validator.isStrongPassword(value,{
                    minLength:6,
                    minLowercase:3,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:1
                })
            }
        }],
        require:true,
        message:"Password {VALUE} must have one Upercase ,3 LowerCase,One Number,One Symble (Abc0@)"

    },
    confirmPassword:{
        validate:[{
            validate:function (value) {
                return value===this.password
            },
            message: "password dont match"
        }]
    },
    role:{
        type:String,
        enum:["buyer","manager","admin"],
        default:"buyer"
    },
    contactNumber:{
        type:Number,
        validate:[validator.isMobilePhone(),"Please Provide Valid Number"]
    },
    shippingAddress:String,
    imageURL:{
        validate:[validator.isURL(),"Provide valid image url"]
    },
    status:{
        type:String,
        enum: ["active","inactive","blocked"],
        default: "inactive",
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("User","userSchema")