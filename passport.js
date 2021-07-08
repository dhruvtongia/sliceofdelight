const LocalStrategy=require('passport-local').Strategy;
const User=require('./models/user');
const bcrypt=require('bcrypt');

const init=(passport)=>{

    passport.use(new LocalStrategy({usernameField:'email'} , async(email,password,done)=>{

        //done is callback function which has arg as error,user if any,message
        try {
            const user=await User.findOne({email:email});

        if(!user)
        {
            return done(null,false,{message:"No user found for the email"});
        }
        
        bcrypt.compare(password,user.password)
        .then(match=>{

            if(match)
            {
                return done(null,user,{message:"LoggedIn successfully"});
            }
            else
            {
                return done(null,false,{message:"Wrong username or password"});
            }
        })
        .catch(err=>{
             done(null,false,{message:"Something went wrong"});
            
        });
        } catch (error) {
            
            console.log(err);
        }
        


    }));

    // when user gets loggedin then ,this method store the information we provide, to the session
    passport.serializeUser((user,done)=>{
        done(null,user._id);//user id is stored in the session which tells us whether user is logged in or not
    });


    //from this method we get user in req ie we can use req.user
    passport.deserializeUser((id,done)=>{ // we pass that data that we store in session for the loggedin user

        //finding user for that id and then passing it to done so thet we can access user in the req 
        User.findById(id,(err,user)=>{ 
            done(err,user);
        });

    });
}

module.exports=init;