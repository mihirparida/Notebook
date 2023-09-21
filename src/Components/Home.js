import React from 'react'
import Notes from './Notes'
// import noteContext from '../context/notes/noteContext'
// import { useEffect } from 'react'



const Home = (props) => {
   
    // useEffect (()=>{
    //     a.updatestate()
    //     // eslint-disable-next-line
    // },[])
    return (
        <div>
            <Notes showAlert={props.showAlert} />
            
        </div>
    )
}
export default Home
