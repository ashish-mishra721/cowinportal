import Select from 'react-select'
import axios from "axios";
import {useState, useEffect} from "react"
import ShowData from './ShowData';
// import {container, row} from "bootstrap"

export default function StateDistrict() {
    
    const [states, setStates] = useState([]) //all states 
    const [stateValue, setstateValue] = useState() //particular state id

    const [districtOptions, setdistrictOptions] = useState() //all districts
    const [districtValue, setdistrictValue] = useState() // particular district id

    const [click, setClick] = useState(false) // search click

    const [items, setItems] = useState() // setting items for local storage as initial value


    useEffect(() => {
        axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
            .then(res => {
                console.log("manish",...res.data.states);
                let opt = res.data.states.map(data1 => { return { label: data1.state_name, value: data1.state_id } })
                setStates(opt)
            })
    }, [])

    useEffect(() => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateValue}`)
            .then(res => {
                console.log(res.data.districts);
                let opt = res.data.districts.map(data1 => { return { label: data1.district_name, value: data1.district_id } })
                setdistrictOptions(opt)
            })
    }, [stateValue])
    

    console.log("manish",states, stateValue, districtOptions, districtValue);


    //local storage starts here -------

    // const storedData = localStorage.getItem("district_id");
    // console.log("checking stored data", storedData)

    // const handleLocalStorage = ()=>{
    //      const stateLocal = localStorage.setItem("state_id", stateValue)
    //      localStorage.setItem("district_id", districtValue)
    //      console.log(localStorage.getItem("state_id"),localStorage.getItem("district_id")) 
    // }


    return (
        <div>
        <br/>
            <div className="container">
            <h1>CoWin App</h1>
            <h3>Application to book appointment for Covid Vaccination </h3>
            <div className="row">
                <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        Search Centers
                    </div><br/>
                    <div className="row">
                <div className="col-lg-4" >
                    <Select options={states}
                        placeholder={'Select State'}
                        onChange={e => setstateValue(e.value)}
                    />
                </div>
                <div className="col-lg-4" >
                    <Select options={districtOptions}
                        placeholder={'Select District'}
                        onChange={e => setdistrictValue(e.value)}
                    />
                </div>
                <div className="col-lg-4" >
                    {(districtValue) ? 
                    <button onClick={()=>setClick(true)} className="btn btn-primary">Search</button>
                    :null
                    }
                </div>
               
            </div>
                </div>
                </div>
            </div>
            
            </div>
            {
                (click) ? <ShowData district={districtValue} /> : null
            }
            
            </div>
       
    )
}


