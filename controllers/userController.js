const User=require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user-profile', {
        title: 'User Profile'
    })
}




module.exports.sign_in = function(req,res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user-sign-in', {
        title: "Social Site | Sign In"
    })
}


//rendering signup page 
module.exports.sign_up= function(req,res){
    
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user-sign-up', {
        title: "Social Site | Sign Up"
    })
}




module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_pass){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}