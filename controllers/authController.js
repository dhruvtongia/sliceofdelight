const User=require("../models/user");
const passport=require('passport');
const bcrypt=require('bcrypt');
const authController=()=>
{
    return{
        registerUser(req,res){
        
            const {name,email,password}=req.body;
        
            User.findOne({email:email})
            .then(async(result)=>{
        
                if(result)
                {        
                     res.status(422).json({message:"User already registered"});
                }
                else
                {
                    //hashing the password
                    const hashedPassword=await bcrypt.hash(password,10); //making its parent function async
        
                    //console.log(hashedPassword);
        
                    const user=new User({
                        name,
                        email,
                        password:hashedPassword
                    });
        
                    user.save()
                    .then(response=>{
        
                         res.status(201).json({message:'Successfully Registered'});
                    })
                    .catch(err=>{
                        console.log(err);
                         res.status(500).json({message:'Failed to register'});
                    });
                }
            })
            .catch(err=>{
                res.status(400).json({message:"error Please try again"});
            })
        
             
        },

        loginUser(req,res,next){

            passport.authenticate('local',(err,user,info)=>{ //this callback function is nothing but done fun we are receiving
        
                if(err)
                {
                    res.status(400).json({message:info.message});
                    return next(err);
                }
        
                if(!user)
                {
                    
                    res.status(400).json({message:"Invalid Credentials"});
                }
                //now logging in the user user req.log .this is made possible bcoz of the passport
                req.logIn(user,(err)=>{
                    if(err)
                    {
                        res.status(400).json({message:"Invalid Credentials"});
                    }
        
                    res.status(200).json({message:"Successfully LoggedIn",user:req.user});
                });
            })(req,res,next);
        
          
        },

        logoutUser(req,res){
            
            req.logout();
            res.json({user:req.user});
            
        }
    }
}

module.exports=authController;