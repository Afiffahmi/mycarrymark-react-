
import Login from './Login.tsx'
import FetchCM from './components/FetchCM'
import { useEffect, useState } from 'react';
import Loader from './components/loader/Loader';



function App() {
  const[token,setToken] = useState(undefined);
  const[isLoading,setIsLoading] = useState(true);

  useEffect(() =>{

    const fakeDataFetch = () => {
      setTimeout(()=>{
        setIsLoading(false);
      },4000)
    }

    fakeDataFetch();

    const loggedUser = localStorage.getItem('user');
    if(loggedUser){
      const foundUser = JSON.parse(loggedUser)
      setToken(foundUser);
    }

    
  },[]);

  if(!token){

    return <Login setToken={setToken} />
  }
  if(token !== undefined){
    
    localStorage.setItem('user',JSON.stringify(token))  ;
  }



  const handleLogout = () => {
    setToken();
    localStorage.clear();
  }
  



  
  return ( isLoading ? (<Loader />) : (
    <div>
   <h1>{JSON.parse(token).email}</h1>
   <FetchCM />
   <button onClick={handleLogout}>logout</button>
   </div>
  ))
}

export default App;
