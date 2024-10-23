const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const userSchema = new mongoose.Schema({
    email:{ type:String,required:true,unique:true},
    password:{ type:String,required:true,unique:true},
    role:{type :String, enum: ['admin','modrateur','client']},
    nom:String,
    premon:String,
    age:Number,
    adress:String,
    image_User : String,
    
    createdAt :Date,
//   image_User : {type : String , required: true , Default:"client.png"}
orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // Ajout de la relation avec les commandes
});



userSchema.post("save",function(next){
    console.log("new user was created & save successfully ");
next();
})
userSchema.pre("save", async function(next){
    try {
        const salt = await bcrypt.genSalt();
        const user = this;
        console.log(user.password);
        user.password = await bcrypt.hash(user.password, salt);
        //user.image_User = "client.png"
        user.createdAt = Date.now();
        next();
    } catch (error) {
        next(error);
    }
    })
    
const User = mongoose.model("User", userSchema);
module.exports = User;
