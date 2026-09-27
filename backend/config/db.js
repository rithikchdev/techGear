import mongoose from 'mongoose'

async function connectDB(){
    try{
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected:`)
    }
    catch(error){
        console.log(`Error connecting to mongodb: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;