import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Mihir",
        "class": "10"
    }
    const [state, setstate] = useState(s1)

    const updatestate = () => {
        setTimeout(() => {
            console.log("Under  Update state")
            setstate({
                "name": "Liku",
                "class": "12"
            })
        }, 3000);
    }
    const host = "http://localhost:5000"
    const notesList = []
    const [note, setNote] = useState(notesList)
    // const notesList = [
    //     {
    //         "_id": "6419df1e1e646921754b29055",
    //         "user": "649b3fd8826e33e73cc6a7cc",
    //         "title": "My title",
    //         "description": "Please its my description",
    //         "tag": "personal",
    //         "date": "2023-06-29T21:04:33.305Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6429df1e1e646921754b29055",
    //         "user": "649b3fd8826e33e73cc6a7cc",
    //         "title": "My title",
    //         "description": "Please its my description",
    //         "tag": "personal",
    //         "date": "2023-06-29T21:04:33.305Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6439df1e1e646921754b29055",
    //         "user": "649b3fd8826e33e73cc6a7cc",
    //         "title": "My title",
    //         "description": "Please its my description",
    //         "tag": "personal",
    //         "date": "2023-06-29T21:04:33.305Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6494df1e1e646921754b29055",
    //         "user": "649b3fd8826e33e73cc6a7cc",
    //         "title": "My title",
    //         "description": "Please its my description",
    //         "tag": "personal",
    //         "date": "2023-06-29T21:04:33.305Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6495df1e1e646921754b29055",
    //         "user": "649b3fd8826e33e73cc6a7cc",
    //         "title": "My title",
    //         "description": "Please its my description",
    //         "tag": "personal",
    //         "date": "2023-06-29T21:04:33.305Z",
    //         "__v": 0

    //     }
    // ]
    //Add Note 
    const getNote = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },

            });
        const json = await response.json();
        console.log(json)
        setNote(json)
    }
    //Add Note 
    const addNoteFunct = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })

            });
            const json = await response.json();
             setNote(note.concat(json))
    }
    //Delete Note 
    // API CALL

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });
        const json = response.json();
        console.log(json)
        console.log("ID is - " + id)
        const deleteNotes = note.filter((notes) => {
            return (notes._id !== id)
        })
        setNote(deleteNotes)
    }
    //Edit Note 
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })

            });
        const json = response.json();
        console.log(json)
        // LOGIC 
        let newNotes = JSON.parse(JSON.stringify(note))// made a deep copy as we cannot directly change state( Converted again to json object)
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNote(newNotes)
    }
    return (
        <noteContext.Provider value={{ note,updatestate, setNote,s1, state, addNoteFunct, deleteNote, editNote, getNote }}>
            {props.children}
            {/* {console.log(props.children)} */}
        </noteContext.Provider>
    )
}
export default NoteState