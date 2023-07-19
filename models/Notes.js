import mongoose,{Schema} from "mongoose";

const notesSchema = new Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title :{
        type:String,
    },
    body :{
        type:String,
        required:true,
    }
});

notesSchema.set('timestamps', true);

const Note = mongoose.model('Notes',notesSchema);

export default Note;