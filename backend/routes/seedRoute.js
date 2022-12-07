import express from 'express'
import data from '../data.js';
import Cars from '../models/carsModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Cars.remove({});
    const createdCars = await Cars.insertMany(data.cars);

    res.send({createdCars});
});

export default seedRouter;