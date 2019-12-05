const faker = require('faker');
const Recs = require('./recs.js');

const seed = () => {

  var data = [];
  var genres = ['American', 'Asian', 'Mexican', 'Indian'];
  var prices = ['$', '$$', '$$$', '$$$$'];

  for (var i = 1; i <= 100; i++) {

    var genre = genres[Math.floor(Math.random() * Math.floor(genres.length))];
    var title1 = faker.random.companyName();
    var recommendationPage = {
      id: i,
      genre: genre,
      title: title1,
      recs: []
    }

    var k = Math.floor(Math.random() * 10) + 1;
    for (var j = 0; j < k; j++) {
      var title2 = faker.random.companyName();
      var price = prices[Math.floor(Math.random() * Math.floor(prices.length))];
      var text = faker.random.sentence();
      recommendationPage.recs.push({
        pics: [],
        title: title2,
        price: price,
        text: text
      });
    }

    data.push(recommendationPage);
  }

  Recs.insertMany(data)
    .then(() => console.log('seeding script complete'))
    .catch(err => console.log(err));
};

seed();