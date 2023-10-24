import { useState } from "react";

const PasswordErrorMessage = () => { 
    return ( 
      <p className="FieldError">Password should have at least 8 characters</p> 
    ); 
   }; 

const Form = () =>{
const [test1, setTest1] = useState("");
const [test2, setTest2] = useState("");
const [password, setPassword] = useState({ 
    value: "", 
    isTouched: false, 
  }); 

const getIsFormValid = () => {
    return (test1 && test2)
}

const clearForm = () => {
    setTest1("");
    setTest2("");
}

const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted");
    clearForm();
}

return (
    <div className="App">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <h2>Carrymark</h2>
                <div className="Field">
                    <label>Test 1</label>
                    <input value={test1} onChange={(e) =>
                    setTest1(e.target.value)} placeholder="
                    0/10"/>
                </div>
                <div className="Field">
                    <label>Test 2</label>
                    <input value={test2} onChange={(e) =>
                    setTest2(e.target.value)} placeholder="
                    0/10"/>
                </div>
                <div className="Field"> 
           <label> 
             Password <sup>*</sup> 
           </label> 
           <input 
             value={password.value} 
             type="password" 
             onChange={(e) => { 
               setPassword({ ...password, value: e.target.value }); 
             }} 
             onBlur={() => { 
               setPassword({ ...password, isTouched: true }); 
             }} 
             placeholder="Password" 
           /> 
           {password.isTouched && password.value.length < 8 ? ( 
             <PasswordErrorMessage /> 
           ) : null} 
         </div> 
         <button type="submit" disabled={!getIsFormValid()}>Submit</button>
            </fieldset>
        </form>
    </div>
)

}



export default Form;