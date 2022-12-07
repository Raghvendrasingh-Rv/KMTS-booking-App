import React, {useState} from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { DatePicker } from 'antd';
import moment from 'moment';
import { rentCar } from '../redux/actions/rent'
import { useDispatch } from 'react-redux'

const { RangePicker } = DatePicker;

const Car = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [car, setCar] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [driver, setDriver] = useState(false);
  const [total, setTotal] = useState(0);
  const [name,setName] = useState("");
  const [mobile,setMobile] = useState("");
  const [source,setSource] = useState("");
  const [dest,setDest] = useState("");

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const params = useParams();
    const {carId} = params;
// eslint-disable-next-line
  useEffect(() => {
    if(!localStorage.getItem("userInfo")) {
      navigate('/login');
    }

    const fetchData = async () => {
        
      try {
        const result = await axios.get(`/api/cars/car/${carId}`);
        console.log(result.data);
        setCar(result.data)

      } catch(err) {
        console.log("Error!");
      }
      
    }
    fetchData();

    setTotal(totalDays * car.payPerDay);
    if (driver) {
      setTotal(total + 40 * totalDays);
    }

  }, [carId, navigate, driver, car.payPerDay,total,totalDays])


  const selectTime = (values) => {
    setFrom(moment(values[0]).format("MMM:DD:yyy HH:mm"));
    setTo(moment(values[1]).format("MMM:DD:yyy HH:mm"));

    setTotalDays(values[1].diff(values[0], 'Days'))
  }

  const rentNow = () => {
    const reqObj = {
      user: userInfo._id,
      car: car._id,
      totalDays,
      total,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
      name:name,
      mobile:mobile,
      source:source,
      dest:dest,
      
    };

    dispatch(rentCar(reqObj));
    navigate('/');
  }

console.log(name);
  return (
    <Layout>
      <div className="car-container">
        <h3 className="car-rentTitle" style={{textDecoration:"underline"}}>Truck Description</h3>
        <div className="car-row">
          <div className="car-col">
            <div className="car-groups">
              <div className="car-group" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                {/* <h2 className="car-subtitle" style={{fontWeight:"bolder"}}>Info</h2> */}
                <div className="car-info" style={{itemAlign:"left !important"}}>
                  <span>1.  {car.name}</span>
                  <span>2.  Rs. {(car.payPerDay)?.toFixed(2)}</span>
                  <span>3. Fuel Type: {car.fuelType}</span>
                  <span>4. Max Capacity: {car.capacity} ton</span>
                </div>
              </div>
              <div className="car-group">
                <h2 className="car-subtitle" style={{textDecoration:"underline"}}>Book</h2>
                

                <div className="car-info">
                <div className='form'>
                  <input name="name" value={name} type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}
                   style={{
                    color: "black",
                    width: "16.25rem",
                    // border:"1px solid red",
                    paddingLeft: "12px",
                    paddingright: "12px",
                    fontSize: "12px !important",
                    marginTop:"6px",
                    marginBottom:"6px"
                   }}
                  className="mx-auto h-8 outline-none px-5  text-black text-xs  font-normal "
                  />
                  <input name="mobile" value={mobile} type="number" placeholder='Mobile' onChange={(e)=>setMobile(e.target.value)}
                  style={{
                    color: "black",
                    width: "16.25rem",
                    // border:"1px solid red",
                    paddingLeft: "12px",
                    paddingright: "12px",
                    fontSize: "12px !important",
                    marginTop:"6px",
                    marginBottom:"6px"
                  }}
                  />
                  <input name="source" value={source} type="text" placeholder='From' onChange={(e)=>setSource(e.target.value)}
                  style={{
                    color: "black",
                    width: "16.25rem",
                    // border:"1px solid red",
                    paddingLeft: "12px",
                    paddingright: "12px",
                    fontSize: "12px !important",
                    marginTop:"6px",
                    marginBottom:"6px"
                  }}
                  />
                  <input name="dest" value={dest} type="text" placeholder='To' onChange={(e)=>setDest(e.target.value)}
                  style={{
                    color: "black",
                    width: "16.25rem",
                    // border:"1px solid red",
                    paddingLeft: "12px",
                    paddingright: "12px",
                    fontSize: "12px !important",
                    marginTop:"6px",
                    marginBottom:"6px"
                  }}
                  />
                  </div>
                  <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm:ss" onChange={selectTime} style={{marginTop:"6px",
                    marginBottom:"6px"}}/>
                  {from && to && (
                    <>
                      <span>Total Days: {totalDays}</span>
                      {/* <span>Pay Per Day: ${(car.payPerDay)?.toFixed(2)}</span> */}
                      <p className='driver'>
                        <input type="checkbox" onChange={(e) => {
                          if(e.target.checked) {
                            setDriver(true)
                          } else {
                            setDriver(false)
                          }
                          }} id="driver"/> 
                        <label htmlFor='driver'>Driver Required</label>
                      </p>
                      <div className="total">
                        <h1 className="totalTitle">Total Amount: Rs. {(total).toFixed(2)}</h1>
                      </div>
                      <button className='rent-now' onClick={rentNow}>Rent Now</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="car-col">
            <div className="car-image">
              <img src={car.image} className="car-img" alt={car.name} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Car