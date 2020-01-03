const fs= require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream')
var writer = csvWriter();

function writeOneMillionTimes(fileName, startNum){
 var maxSize = 1000000;
 const Writer = fs.createWriteStream(fileName);

 Writer.write('id, genre, title, price, description, recommendRestaurant, images\n');
 function write(){
   let ok = true;

   do{
     var genres = ['American', 'Asian', 'Mexican', 'Indian'];
     var prices = ['$', '$$', '$$$', '$$$$'];
    //  var majorString = '';

     var genre = genres[Math.floor(Math.random() * Math.floor(genres.length))];
     var title1 = faker.company.companyName();
     maxSize--;
     var id = maxSize+startNum+1;
     var price = prices[Math.floor(Math.random() * prices.length)];
     var description = faker.lorem.sentence();
    //  majorString+=i+';'+genre+';'+title1+';'+price+';'+description


       var numRecommRestau = Math.floor(Math.random() * 5) + 1;
      //  var string2 = '';
       var recommendRestaurant = [];
       for (var j = 0; j < numRecommRestau; j++) {
        recommendRestaurant.push(Math.floor(Math.random() * 100) + 1);
       }
      //  string2 = recomRestrau.join(',');


       var numPhotos = Math.floor(Math.random() * (10 - 5 + 1) + 5);
      //  var string3 = '';
       var photosArr = []
       for (var l = 0; l < numPhotos; l++) {

         var photoNum = Math.floor(Math.random() *1000) + 1;

         var picUrl = `http://sdc-5-images.s3-us-west-1.amazonaws.com/scapeImages/${photoNum}.jpg`;
         photosArr.push(picUrl)
       }

      var majorString = `${id};${genre};${title1};${price};${description};[${recommendRestaurant}];[${photosArr}]\n`
      //  string3 = photosArr.join(',');
      //  string2+=';'+string3;
      //  majorString += ';'+string2;
      //  majorString += '\n'
       if(maxSize===0){
         Writer.write(majorString)
       }else{
         ok=Writer.write(majorString);
       }


   }while (maxSize > 0 && ok);
   if(maxSize > 0){
     Writer.once('drain', write);

   }
}
write();
}


console.log("lets start!!!")
writeOneMillionTimes('./server/db/generate/csv/file1.csv', 0);
writeOneMillionTimes('./server/db/generate/csv/file2.csv', 1000000);
writeOneMillionTimes('./server/db/generate/csv/file3.csv', 2000000);
writeOneMillionTimes('./server/db/generate/csv/file4.csv', 3000000);
writeOneMillionTimes('./server/db/generate/csv/file5.csv', 4000000);
writeOneMillionTimes('./server/db/generate/csv/file6.csv', 5000000);
writeOneMillionTimes('./server/db/generate/csv/file7.csv', 6000000);
writeOneMillionTimes('./server/db/generate/csv/file8.csv', 7000000);
writeOneMillionTimes('./server/db/generate/csv/file9.csv', 8000000);
writeOneMillionTimes('./server/db/generate/csv/file10.csv', 9000000);
