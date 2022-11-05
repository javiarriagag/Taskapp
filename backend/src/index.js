import cors from 'cors';
import  express from "express";
import { initDB } from "./db/index.js";
import  TodosRequestHandler  from "./handlers/todos.js";

const Api = express(); 

Api.use(cors());
Api.use(express.json());
Api.use(express.urlencoded({extended: false}));

Api.use('/v1', TodosRequestHandler);
// Api.use('/users', UsersRequestHandler);

// Api.get('/test',(request, response) => {
//     response.send({message: 'It works :)'})
// });

Api.listen(3000, ()=>{
    console.log('API IS RUNNING :)\n');
    initDB().then(()=> {
        console.log('DB IS READY :)');
    });
});


