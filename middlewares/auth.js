const auth=(req,res,next)=>{
    if(req.isAuthenticated())
    {
       
        return next();
    }
    else
    {
        return res.redirect('/login');
        
        //return res.status(401).json({message:'user not found'});
    }
};

module.exports=auth;