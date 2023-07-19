import * as dotenv from 'dotenv'
dotenv.config()
import Note from '../models/Notes.js';

const createNotes = async(req,res) =>{
    let userId = req.user.id;
    try{
        const notes = await Note.create({
            user:userId,
            title:req.body.title,
            body:req.body.body,
        })
        res.status(201).json(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:'msg:internal server error '})
    }
}

//fetch notice of a particular admin. login adn auth-token required 
const getUserNotes= async(req,res)=>{
    let userID = req.user.id
    try {
        const note = await Note.find({user: userID});
        res.send(note);
    } catch (error) {
        res.status(500).send({error:"Internal server error"});
        console.log(error)
    }
}

// id of the note is required!
const updateNote = async (req,res) =>{
    let userID = req.user.id
    const {title,body} = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (body) { newNote.body = body};

        let note = await Note.findById(req.params.id);
        if (!note) { 
            return res.send(404).send("Not Found") 
        }

        if (note.user.toString() !== userID) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        return res.json({ note });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'msg:internal server error '})
    }
}

const deleteNote = async (req,res) =>{
    let userID = req.user.id;
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { 
            return res.send(404).send("Not Found") 
        }

        if (note.user.toString() !== userID) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);

        return res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'msg:internal server error '})
    }
}

export{
    createNotes,
    getUserNotes,
    updateNote,
    deleteNote
    // getAdminNotice,
    // deleteNotice
}