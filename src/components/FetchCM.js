import {useState,useEffect} from "react";


export default function FetchCM() {
    const [carrymarkData, setCarrymarkData] = useState([]);

    const FetchData = () => {
        fetch(`http://localhost:5555/carrymark`)
        .then((response)=> response.json())
        .then((jsonData) => setCarrymarkData(jsonData))
        .catch((error) => console.log(error));
    }

    useEffect(() =>  {
    FetchData();
    }, []);
    
    return (
        <div>
        <h1> ID : {carrymarkData[0].id} </h1>
        <h1> test1 : {carrymarkData[0].test1} </h1>
        <h1> test2 : {carrymarkData[0].test2} </h1>
        </div>)
    
    }

    

