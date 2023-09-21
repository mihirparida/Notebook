const express = require("express");
const router = express.Router();
const fetchuser = require("../middleWare/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');
// ROUTE 1:Get all thenote using :GET "/api/notes/getuser" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal error happened")
    }
})
// ROUTE 2:Add a new note using :POST "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', "Enter valid title ").isLength({ min: 3 }),
    body('description', "Enter password more than 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title , description,tag} = req.body;
        const note = new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }catch(error){
        res.status(500).send("Internal error happened")
    }
 })
 // ROUTE 3 :Update an existing Note using :POST "/api/notes/updatenote" login required
 router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title , description,tag} = req.body;
    //Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    //Find the note to be updated & update it .
    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(401).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})

 })
 // ROUTE 4 :Delete an existing Note using :DELETE "/api/notes/deletenote" login required
 router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title , description,tag} = req.body;
    try {
        let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(401).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note Deleted"})
        
    } catch(error){
        res.status(500).send("Internal error happened")
    }
    //Find the note to be deleted & delete it .
    

 })
module.exports = router