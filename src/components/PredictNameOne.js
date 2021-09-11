import React, { useState } from "react";
import axios from 'axios'

    function PredictNameOne() {    
        const [data, setData] = useState({})
        const [name , setName] = useState('')
        const [place , setPlace] = useState('')
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault() 
           
    try {     
      const { data } = await axios({
        method: 'GET',
        baseURL: 'https://api.agify.io',
        url: `?name=${name}&country_id=${place}`,
       
     }) 
      setData(data)
      console.log(data)
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
    <div >
      <form onSubmit={handleSubmit}>
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
          <button type="submit">SEND</button>
        </form>
        <article>
            <p>{data.name}</p>
            <p>{data.age}</p>
            <p>{data.country_id}</p>
        </article>       
    </div>    
    )
    }
    export default PredictNameOne