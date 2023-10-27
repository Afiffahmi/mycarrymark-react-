import {useState,useEffect} from "react";
import axios from "axios";


export default function FetchCM() {
    const [carrymarkData, setCarrymarkData] = useState(null);
    useEffect( () =>  {
        FetchData();
        }, []);


    const FetchData = async () =>  {
         await axios({
            method: 'get',
            url: 'http://localhost:5555/carrymark',
            responseType: 'stream'
        })
        .then(function(response){
            setCarrymarkData(JSON.parse(response.data))
        }).catch((e) => {
            console.log(e);
        },[]);

    }

    if(!carrymarkData) return null

    
    
    return (
        <div>
        {console.log(carrymarkData[0].id)}
         <h1> ID : {carrymarkData[0].id} </h1>
        <h1> test1 : {carrymarkData[0].test1} </h1>
        <h1> test2 : {carrymarkData[0].test2} </h1>
        </div>)
    
    }

    

