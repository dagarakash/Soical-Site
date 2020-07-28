const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/Social_Site',{ useNewUrlParser: true, useUnifiedTopology: true });

const db=mongoose.connection;


db.on('error',console.error.bind(console,'ERROR BRO ERROR IN CONNECTING IN DB'));


db.once('open',function(){
console.log('::::Connected to DATABASE::::');

});


module.exports=db;
