import express from 'express';
import connect_to_mongo from './db.js';
import user from './routes/user.js'
import note from './routes/note.js'
import cors from 'cors'

const app = express();
app.use(express.json());
const PORT = 5001
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/v1/user',user);
app.use('/api/v1/note',note);

app.get('/',(req,res)=>{
    res.send("<h1>Working fine</h1>") 
})


const start = () =>{
    app.listen(PORT, ()=>{
        console.log(`app is running on port : ${PORT}`)
    })

    connect_to_mongo()
}

start()