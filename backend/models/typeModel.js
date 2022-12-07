import mongoose from "mongoose";

//for create Table into DB for User
const typeSchema = new mongoose.Schema(
    {
        type: {type: String, required: true}
    }, 
    {
        timestamps: true //for date
    }
);

const Category = mongoose.model("Category", typeSchema);
export default Category;