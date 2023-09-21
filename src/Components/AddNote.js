import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const a = useContext(noteContext)
    const { addNoteFunct } = a;
    const [mainNote, setMainNote] = useState({title:"", description:""  ,tag:"" })
    const handleClick = (e)=>{
        e.preventDefault();// So that page doestnot load
        addNoteFunct(mainNote.title,mainNote.description,mainNote.tag,)
        setMainNote({title:"", description:""  ,tag:"" })
        props.showAlert("Added Notes","success")
    }
    const onChange = (e)=>{
        setMainNote({...mainNote, [e.target.name] : e.target.value})// Here spread operator is used so every value is same as usual only value is updated as name or changes in name will be equal to value 
    }
    return (
        <div>
            <h2>Add a Note</h2>
            <form className="mb-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name ="title"  value ={mainNote.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name ="description" value ={mainNote.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name ="tag" value ={mainNote.tag} onChange={onChange}/>
                </div>
                
                <button disabled ={mainNote.title.length<5 ||mainNote.description.length<5 } type="submit" className="btn btn-primary" onClick = {handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
