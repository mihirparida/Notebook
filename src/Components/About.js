import React from 'react'
import { useContext ,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
// import { useEffect } from 'react'

const About = () => {
    const a = useContext(noteContext)
    // const {state} = a 
    useEffect (()=>{
      console.log("Under Use Effect")
        a.updatestate()
        // eslint-disable-next-line
    },[])
  return (
    <div>
      This is About {a.state.name} of class {a.state.class} of {a.s1.class}
      This is About
    </div>
  )
}

export default About
