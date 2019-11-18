var faker = require ('faker');
var db = require('../index');
var User = require( './User').User;
  // select the ids from the database for hte users .
  for(i=0; i <=100; i++){
    // var item = new Article()
    //var item = ;
    var user =new User({
        id: Math.floor(Math.random() * (4000 - 2001 + 1)) + 2001,
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        pic: faker.internet.avatar(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence()
      });
      console.log(user);
      user.save(err =>{
        if(err) {
            console.log(err);
        } else{
            console.log('Hi');
        }
      }

      );
    } 
    



