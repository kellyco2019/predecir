import React, { useState } from "react";
import axios from 'axios'
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
     
    function PredictName() {    
        const [data, setData] = useState({})
        const [name , setName] = useState('')
        const [tags, setTags] = useState(["example tag"])
        const [place , setPlace] = useState('')
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(false)
         

    async function handleSubmit(e) {
        e.preventDefault() 
           
    try {     
        const { data } = await axios({
        method: 'GET',
        baseURL: `https://api.agify.io`,
        params: `?name=${name}&country_id=${place}` 
     }) 
      setData(data)
      setLoading(false)  
     }catch(error){
     console.log(error)
      setError(true)
      setLoading(false)
    }
      
    }
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Opsss something ent Wrong...</p>
    return(
    <div>
      <form onSubmit={handleSubmit}>

  <ReactTagInput 
  tags={tags} 
  placeholder="Type and press enter"
  maxTags={10}
  editable={true}
  readOnly={false}
  removeOnBackspace={true}
  onChange={(newTags) => setTags(newTags)}
  // validator={(value) => {
  //   // Don't actually validate e-mails this way
  //   const isEmail = value.indexOf("@") !== -1;
  //   if (!isEmail) {
  //     alert("Please enter an e-mail address");
  //   }
  //   // Return boolean to indicate validity
  //   return isEmail;
  // }}
/>
        <label htmlFor="name">Name</label>
        <input 
        id="name"
        type="text"
        placeholder="write your name here"
        onChange={(e) => setName(e.target.value)}
        value={name}
        ></input> 
        <label htmlFor="place">Place</label>
        <input 
        id="place"
        type="text"
        placeholder="write the place"
        onChange={(e) => setPlace(e.target.value)}
        value={place}
        ></input> 
        <button type="submit" >SEND</button>
      </form>
      <article>
          <p>{data.name}</p>
          <p>{data.age}</p>
          <p>{data.country_id}</p>
        </article> 
        
    </div>    
    )
    }
    export default PredictName