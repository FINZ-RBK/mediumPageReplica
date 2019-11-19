var faker = require ('faker');
var db = require('../index');
var Category = require( './Category').Category;
  // select the ids from the database for hte users .
  for(i=0; i <=20; i++){
    var category =new Category({
        id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
        name: faker.random.word()
      });
      console.log(category);
      category.save(err =>{
        if(err) {
            console.log(err);
        } else{
            console.log('Hi');
        }
      }

      );
    } 
    
