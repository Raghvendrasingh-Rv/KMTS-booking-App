import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import { getAllCars } from '../redux/actions/actions'
// import { DatePicker } from 'antd';
import axios from 'axios'

// const { RangePicker } = DatePicker;

const Home = () => {

  const navigate = useNavigate();

  const {cars} = useSelector(state => state.reducer);
  const {loading} = useSelector(state => state.loading)
  const [totalCar, setTotalCar] = useState([]);
  // const [category, setCategory] = useState([]);
  const [query, setQuery] = useState("");

  console.log(cars);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllCars());
    },[dispatch])

  useEffect(() => {
    if(!localStorage.getItem("userInfo")) {
      navigate('/login');
    }

    setTotalCar(cars)
  }, [cars, navigate])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/category');
      console.log(result.data);
      // setCategory(result.data)
    }
    fetchData();
  }, [])

  // const setFilter = () => {
  //   var temp=[]

  //   for(var car of cars){

  //         if(car.bookedTimeSlots.length === 0){
  //             temp.push(car)
  //         }
  //   }


  //   setTotalCar(temp)
  // }

  // const filterResult = (catItem) => {
  //   const catResult = totalCar.filter((curCat) => {
  //       return curCat.type === catItem;
  //   });
  //   setTotalCar(catResult);
  // }

  const keys = ["type"];

  const search = () => {
    return totalCar.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
  };

  return (
    <Layout>
      <div className="slider" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
        <div className="left">
          <h1 className="title">Gwalior, U.P, Bihar, chhattisgarh, visakhapatnam</h1>
          {/* <p style={{color:"red"}}>Kushal Mangal Transport Service  was established in 2008 by Kushal Mangal Singh with more than 6 years of experience of the Logistics Industry and passionate belief of transforming lives through transportation.
Our Regd. office is equipped to provide best and round the clock services with experinced drives. We provide our clients Express Service (If required) with nominal charges to ensure quick and timely delivery.
 Our Business philosophy revolves around the customer dedication, innovation and value creation.</p> */}
        </div>
        <div className="right">
          <img className="right_img" src="./images/slider/slider.png" alt="" />
        </div>
      </div>
      <div className='content'>
          <div className="content-row">
            <h1 className='big-title' style={{textDecoration:"underline"}}>Trucks Available</h1>
          </div>
          <div className="content-flex">
            <div className="content-row flex-1">
              <div className="div-filter" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: "rgb(0, 141, 141)"}}>
                <h2 className="car-subtitle" style={{color:"white"}}>Search by truck name</h2>
                <input type="search" placeholder='Search...' onChange={(e) => setQuery(e.target.value)} className='search' 
                style={{
                  color: "white",
                  backgroundColor:"black",
                  // width: "16.25rem",
                  // border:"1px solid red",
                  paddingLeft: "20px",
                  paddingright: "20px",
                  fontSize: "24px !important",
                  marginTop:"6px",
                  marginBottom:"12px",
                  textAlign:"center"
                 }}
                 />
              </div>
              {/* <div className="div-filter">
                <h2 className="car-subtitle">Filter for date</h2>
                <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={setFilter} />
              </div>
              <div className="div-filter">
                <h2 className="car-subtitle">Filter by Type</h2>
                <div className="filter-btns">
                  <button onClick={() => setTotalCar(cars)} className="btn-type">All</button>
                  {category.map((cat) => (
                      <button key={cat._id} onClick={() => filterResult(cat.type) } className="btn-type">{cat.type}</button>
                  ))}
                </div>
              </div> */}
            </div>
            <div className="content-row flex-2">
              {loading ? (<Loading />) : (
                <div className="content-groups">
                  {search(totalCar).map((car) => (
                    <div className="card" key={car._id}>
                      <div className="card-body">
                        <img src={car.image} className="img-cars" alt={car.name} />
                      </div>
                      <div className="card-footer">
                        <div className="card-footer-top">
                          <h3 className='car-title'>{car.name}</h3>
                          <p className='per-day'>Per Day: <span className='bold-price'> RS. {(car.payPerDay).toFixed(2)}</span></p>
                        </div>
                        <div className="card-footer-bottom">
                          <button className='rent-now'><Link to={`/car/${car._id}`} className="rent-link">Rent Now</Link></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </Layout>
  )
}

export default Home