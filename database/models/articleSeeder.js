var faker = require ('faker');
var db = require('../index');
var Article = require( './Article').Article;
var User = require( './User').User;
var Category = require( './Category').Category;

// select the ids from the database for hte users .
const structureArticles=  function() {
    User.find({}).
    exec(function (err, users) {
        if(err){ console.log(err)}
        else {
            Category.find({}).
            exec(function(err, categories){
                if(err){console.log(err)}
                else {
                    var itemObject;
                    for(i=0; i <=10; i++){
                        // var item = new Article()
                         itemObject={
                            id: faker.random.number(),       
                            title: faker.lorem.sentence(),
                            subTitle: faker.lorem.sentences(),
                            pic: faker.image.imageUrl(),
                            createdAt: faker.date.between('2019-11-18', '2019-11-25'),
                            readingTime: Math.floor(Math.random() * (20 - 1 + 1)) + 1 ,
                            text:faker.lorem.paragraphs(),
                            clapsNumber: Math.floor(Math.random() * (1000- 1 + 1)) + 1 ,   
                            authorId: users[Math.floor(Math.random() * ((users.length-1) - 0 + 1)) + 0 ].id,
                            categoryId: categories[Math.floor(Math.random() * ((categories.length-1) - 0 + 1)) + 0 ].id,
                            
                        }   
                        var comments=[];
                        var commentsNum = Math.floor(Math.random() * (20- 1 + 1)) + 1

                        for(i=0; i <=commentsNum; i++){
                           var comment ={
                            image: faker.internet.avatar(),                           
                            writerName: faker.name.firstName()+" "+ faker.name.lastName(),                         
                            date:faker.date.between('2019-11-18', '2019-11-25'),
                            Description: faker.lorem.paragraph(),
                            NoOfClub:Math.floor(Math.random() * (1000- 1 + 1)) + 1 ,
                           }
                           comments.push(comment);
                        }  
                        itemObject.comments = comments;
                        var tags = [];
                        var tagsNum = Math.floor(Math.random() * (5- 1 + 1)) + 1
                        for(i=0; i <=tagsNum; i++){
                            tags.push(faker.random.word());
                        }
                        console.log(tags);
                        itemObject.tags = tags;
                        console.log(itemObject);
                    }
                    
                }
            })
        }
    })
  }; 

  structureArticles();

