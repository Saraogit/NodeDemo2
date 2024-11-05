const mongoose = require("mongoose")
const app = require("./app")
const dotenv=require("dotenv")

dotenv.config({path:"./config.env"})
// console.log(process.env)

const port =process.env.PORT || 3000

mongoose.connect(
    process.env.DB_LOCAL_URL,
).then((con)=>{
    console.log("Connection done successfull")
    //console.log(con.connection);
}).catch((err)=>{
    console.log("Connection failed", err);
})

app.listen(port, () => {
    console.log(`Express app is running ${port}`);
})