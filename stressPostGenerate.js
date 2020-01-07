const faker = require('faker');

const generateData = (context, events, next) => {
  var prices = ['$', '$$', '$$$', '$$$$'];
  var genres = ['American', 'Asian', 'Mexican', 'Indian'];
  var id = faker.random.number({ min: 10000001, max: 12000000 });
  var genre = genres[Math.floor(Math.random() * Math.floor(genres.length))];
  var title1 = faker.company.companyName();
  var price = prices[Math.floor(Math.random() * prices.length)];
  var description = faker.lorem.sentence();
  var numRecommRestau = Math.floor(Math.random() * 5) + 1;

   var recommendRestaurant = [];
   for (var j = 0; j < numRecommRestau; j++) {
    recommendRestaurant.push(Math.floor(Math.random() * 100000) + 1);
   }


   //  var string3 = '';
    var photosArr = []
    for (var l = 0; l < 5; l++) {
      var photoNum = Math.floor(Math.random() *1000) + 1;
      photosArr.push(photoNum)
    }

    context.vars.id = id;
    context.vars.title = title1;
    context.vars.genre = genre;
    context.vars.price = price;
    context.vars.description = description;
    context.vars.recommendRestaurant = recommendRestaurant;
    context.vars.images = photosArr;
    next();
}
module.exports = { generateData }
