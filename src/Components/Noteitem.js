import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const a = useContext(noteContext)
    const {deleteNote } = a
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body ">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{props.note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(props.note._id);props.showAlert("Deleted Notes","success")}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                    </div>
                    <p className="card-text">{props.note.description}

                    </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
