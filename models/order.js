const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const orderSchema=new Schema({

    customerId:
    {
        type: Schema.Types.ObjectId, //user model aur order model ke beech connection banane ke liye
        ref:'User',// kis model se reference le raha h
        required:true
    },
    items:
    {
        type: Object,
        required:true
    },
    phone:
    {
        type:String,
        required:true
    },
    address:
    {
        type:String,
        required:true
    },
    paymentMethod:
    {
        type:String,
        default:'COD'
    },
    orderStatus:
    {
        type:String,
        default:'order_placed'
    }

    
},{timestamps:true});

const Order=mongoose.model("Order",orderSchema);

module.exports=Order;