import React, { useState } from "react";
import axios from 'axios'
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";

    function PredictNameMany() {    
        const [data, setData] = useState([])
        const [names, setNames] = useState([])
        const [place , setPlace] = useState('')
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault() 
        let newNames = []
        for (let i = 0; i < names.length - 1 ; i++) {
            newNames.push(names[i] + "&name[]=")
        } 
            newNames.push(names[names.length-1])
            newNames = newNames.join('')
            
            
    try {     
      const { data } = await axios({
        method: 'GET',
        baseURL: 'https://api.agify.io', 
        url: `?name[]=${newNames}&country_id=${place}`,
      
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
           <label htmlFor="name">Names</label>

          <ReactTagInput 
              id="name"
              type="text"
              tags={names} 
              placeholder="Type some names and press enter"
              maxTags={7}
              editable={true}
              readOnly={false}
              removeOnBackspace={true}
              onChange={(newNames) => setNames(newNames)}
              
            /> 
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
            <div>
                {data.map((el) => {
                return  <article key={el.count}>
                    <p>{el.name}</p>
                    <p>{el.age}</p>
                    <p>{el.count}</p>
                    <p>{el.country_id}</p>
                 </article> 
                }
    
       )}
             </div>     
    </div>    
    )
    }
    export default PredictNameMany