import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from "axios";
import Users from "./Users"



const Form = props => {
    const [formState, setFormState] = useState([{name: "", email: "", password: "",  terms: true}]);
    const [user, setUser] = useState([]);

    const [post, setPost] = useState([]);

 
    const [serverError, setServerError] = useState("");

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        name: "", 
        email: "",
        password: "",
        
        terms: ""
      });
  



const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
    password: yup.string().min(6, 'Password has to be longer than 6 characters!')  
    .required('Password is required!'),
    terms: yup.boolean().required(false)
})

useEffect(() => {
    console.log(
      "checking to see if all values in form state follows the rules set in formSchema"
    );
    formSchema.isValid(formState).then(isFormValid => {
      console.log("is form valid?", isFormValid);
      setButtonDisabled(!isFormValid); 
    });
  }, [formState]);

  const formSubmit = e => {e.preventDefault()
    axios.post("https://reqres.in/api/users", formState)
    .then(res => {
        setPost(res.data)
        console.log(res.data)
        console.log("successful post")
        setUser([...user,res.data])



       

        setFormState({
            name: "",
            email: "",
            password: "",
            terms: true
        }
        )
        setServerError(null)
    })
    .catch(err => {
        
        setServerError("oops! something happened!");
      });
  };

  const validateChange = e => {
    
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value) 
      .then(inputIsValid => {
        
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };
  
  const inputChange = e => {
    
    e.persist(); /
    console.log("input changed!", e.target.value);
    console.log("name of input that fired event", e.target.name); 

    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.name === "terms" ? e.target.checked : e.target.value /
    };

    validateChange(e); 
    setFormState(newFormData); 
  };


  

    
    return (
     <div>
        <form onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          onChange={inputChange}
          value={formState.name}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          onChange={inputChange}
          value={formState.email}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="password" className="password">
          Password
          <input 
            id="password"
            type="password"
            name="password"
            onChange={inputChange}
            value={formState.password} />
            {errors.name.length > 0 ? <p className="error">{errors.password}</p> : null}
            </label>


      <label htmlFor="terms" className="terms">
        <input
          id="terms"
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms and Conditions
        {errors.terms.length > 0 ? 
          <p className="error">{errors.terms}</p>
         : null}
      </label>
      <button type="submit" disabled={buttonDisabled}>
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
    
     <Users user={user}/>

</div>
 
     
    
    )
   
}
    

  


export default Form;