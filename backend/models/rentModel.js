// Create table for cars
import mongoose from 'mongoose'

const rentSchema = new mongoose.Schema({

    car : {type : mongoose.Schema.Types.ObjectID , ref:'cars'},
    user : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
    bookedTimeSlots : {
        from : {type : String} ,
        to : {type : String}
    } ,
    totalDays : {type : Number},
    total : {type : Number},
    driverRequired : {type : Boolean},
    name:{type : String},
    mobile:{type : Number},
    source:{type : String},
    dest : {type : String},

}, {
    timestamps: true
});

const Rent = mongoose.model('Rent', rentSchema);
export default Rent;