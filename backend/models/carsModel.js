// Create table for cars
import mongoose from 'mongoose'

const carsSchema = new mongoose.Schema({

    name: {type: String, required: true},
    type: {type: String, required: true},
    image: {type: String, required: true},
    payPerDay: {type: Number, required: true},
    fuelType: {type: String, required: true},
    bookedTimeSlots: [
        {
            from: {type: String, required: true},
            to: {type: String, required: true}
        }
    ],
    capacity: {type: Number, required: true}

}, {
    timestamps: true
});

const Cars = mongoose.model('Cars', carsSchema);
export default Cars;