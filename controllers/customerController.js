const Menu=require("../models/menu");
const Order=require("../models/order");

const customerController=()=>
{
    return{

        index(req,res){
            
           // console.log("in");
            Menu.find()
            .then(menu=>{
                res.json({menu,data:req.session.cart,user:req.user});
            })
            .catch(err=>{
                console.log(err);
            });
            
        },

        customerOrders(req,res){ //auth taki sirf loggedin user hi access kar paye

  
    
            Order.find({customerId:req.user._id})
            .then((result)=>{

                res.header('Cache-Control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
                delete req.session.cart;// deleting the cart as the order is placed
                res.status(201).json({orders:result});
            })
            .catch(err=>{
                res.status(400);
            })
            
           
        },

        newOrder(req,res){
         
            const order= new Order({
         
                customerId:req.user._id,
                items:req.session.cart.items,
                phone:req.body.phone,
                address:req.body.address
         
            });
         
            order.save()
                    .then(response=>{
         
                         res.status(201).json({message:'Successfully ordered'});
                    })
                    .catch(err=>{
                        console.log(err);
                         res.status(500).json({message:'Failed to place order'});
                    });
            
         },

         singleOrderTracker(req,res){

             Order.findById(req.params.id.toString())
             .then(order=>{
               
                  // authenticating the user with its order
                 if(req.user._id.toString()=== order.customerId.toString())
                 {
                     res.status(200).json({order,message:'correct'});
                 }
                 else
                 {
                     res.status(400).json({message:'incorrect'});
                 }
             })
             .catch(err=>console.log(err));
             
            
             
          }

        
    }
};

module.exports=customerController;