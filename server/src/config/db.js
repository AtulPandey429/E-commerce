import mongoose from "mongoose";


const url = process.env.URL || 'mongodb+srv://atul:pandey@cluster0.zj1ebd2.mongodb.net/Assignment?retryWrites=true&w=majority';
const databaseConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnect;
