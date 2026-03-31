const mongoose = require("mongoose");
const listing = require("../models/listing.js")
const initData = require("./data.js");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderList');
}
main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });

const initDB = async()=>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: "69ca0962fd1238df32c3f6a9"}));
    await listing.insertMany(initData.data);
    console.log("data initialization done");
};
initDB();