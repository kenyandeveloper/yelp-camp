const mongoose = require('mongoose');
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campgrounds');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author:'647946d4c48f885c9d7d16a3',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'These are campgrounds that I created for my test project not to be used for official production purposes.',
            price,
            geometry: {
                type : "Point", 
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                
                ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dhml0o3an/image/upload/v1686269532/YelpCamp/wppeot6rw401hqjenrbq.jpg',
                  filename: 'YelpCamp/wppeot6rw401hqjenrbq',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dhml0o3an/image/upload/v1686269532/YelpCamp/f8jfytsrm5hh0uhwn2tg.jpg',
                  filename: 'YelpCamp/f8jfytsrm5hh0uhwn2tg',
                 
                }
              ]
            
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})