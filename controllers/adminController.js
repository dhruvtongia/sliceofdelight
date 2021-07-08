const Menu=require("../models/menu");
const Order=require("../models/order");
const Emitter=require('events');

const adminController=(router)=>
{
    return{
        
        removeMenuItem(req,res){

            const {menuId}=req.body;
            Menu.deleteOne({_id:menuId})
            .then(result=>{
                res.status(200).json({message:'successfully deleted'});
            })
            .catch(err=>{
                console.log(err);
                res.status(400).json({message:'error'});
            })
        },

        adminDashboard(req,res){
               Order.find({ orderStatus: { $ne: 'completed' } }, null, ).populate('customerId','-password')
               .then((orders)=>{
                    res.status(200).json({orders});
               })
               .catch(err=>{
                   
                   res.status(400).json({message:'error'});
               })
            
            },

        addMenuItem(req,res){

            const menu=new Menu(req.body);
         
            menu.save()
                    .then(response=>{
         
                         res.status(201).json({message:'Successfully Added'});
                    })
                    .catch(err=>{
                        console.log(err);
                         res.status(500).json({message:'Failed to Add Please try again'});
                    });
         }
    }
}

module.exports=adminController;