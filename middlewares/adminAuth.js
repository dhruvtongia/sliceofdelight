const adminAuth=(req,res,next)=>{
    if(req.isAuthenticated()&&req.user.role==='admin')
    {
       //console.log('innnnnn');
         next();
    }
    else
    {
        //return res.redirect('/login');
        
        return res.status(401).json({message:'Invalid access'});
    }
};

module.exports=adminAuth;