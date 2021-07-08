const cartController=()=>
{
    return{

        cartItems(req,res){

            res.json({data:req.session.cart});
        },

        deleteCartItems(req,res){
  
             const deleteItemid=req.body.itemId;
             const cart=req.session.cart;
             const cartItems=(req.session.cart.items);
             
             cart.totQty-=(cartItems[deleteItemid].qty);
           
             cart.totPrice-=( (Number(cartItems[deleteItemid].item.price) )*cartItems[deleteItemid].qty);
                
             delete cartItems[deleteItemid];
         
             res.json({data:req.session.cart});
         },

         updateCartItems(req,res){

            if(!req.session.cart)
            {
                req.session.cart={
                    items:{// iske andar pizaa object pura aur uski qty
                    },
                    totQty:0,
                    totPrice:0
                }
            }
            const cart=req.session.cart;
        
            if(!cart.items[req.body._id])
            {
                
                cart.items[req.body._id]={
        
                    item:req.body,
                    qty:1
                }
                cart.totQty+=1,
                cart.totPrice+=Number(req.body.price)
            }
            else
            {
                cart.items[req.body._id].qty+=1;
                cart.totQty+=1;
                cart.totPrice+=Number(req.body.price)
            }
        
            res.json({data:req.session.cart});
        }
        
    }
}

module.exports=cartController;