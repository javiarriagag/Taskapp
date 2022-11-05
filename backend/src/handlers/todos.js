import express from 'express';
import { getDBHandler} from '../db/index.js';

const TodosRequestHandler = express.Router();

TodosRequestHandler.post("/to-dos", async (request, response) =>{
    try{
        const { title, description, isDone: is_done } = request.body;
        const dbHandler = await getDBHandler();

        const newTodo = await dbHandler.run(`
         INSERT INTO todos (title, description, is_done)
         VALUES (
            '${title}',
            '${description}',
            ${is_done}
            )
        `);

    await dbHandler.close();

    response.send({newTodo: { title, description, is_done, ...newTodo }});
} catch(error){
        response.status(500).send({
            error: `Something went wrong when trying to create a new to do`,
            errorinfo: error.message,
            });
    }
});

TodosRequestHandler.get("/to-dos", async (request, response) =>{
    try{

        const dbHandler = await getDBHandler();

        const todos = await dbHandler.all('SELECT * FROM todos')
        await dbHandler.close();

    if (!todos || !todos.length){
        return response.status(404).send({message: 'To Dos Not Found'});
    }
       
    response.send({ todos });
} catch(error){
        response.status(500).send({
            error: `Something went wrong when trying to create a new to do`,
            errorinfo: error.message,
            });
    }
});

TodosRequestHandler.delete("/to-dos/:id", async (request, response) =>{
    try{
        const todoId = request.params.id;
        const dbHandler =await getDBHandler();

        const deleteTodo = await dbHandler.run(
            'DELETE FROM todos WHERE id=?',
            todoId
            );

    await dbHandler.close();

    response.send({ todoRemoved: {...deleteTodo}});
} catch(error){
        response.status(500).send({
            error: `Something went wrong when trying to create a new to do`,
            errorinfo: error.message,
            });
    }
});

TodosRequestHandler.patch('/to-dos/:id', async (request, response) => {
    try{
       const todoId = request.params.id;
       const { title, description, isDone: is_done } = request.body;
       const dbHandler = await getDBHandler();

       const todoUpdated = await dbHandler.get(
        `SELECT * FROM todos WHERE id = ?`,
        todoId
       );
        await dbHandler.run (
        `
         UPDATE todos SET title = ?, description = ?, is_done = ?
        WHERE id =?
        `,
         title || todoUpdated.title, 
         description || todoUpdated.description, 
         is_done == todoUpdated.is_done? todoUpdated.is_done:is_done,
         todoId,
         );

        await dbHandler.close();

        response.send({ 
            todoUpdated: {...todoUpdated, title, description, is_done}
        });
    } catch(error){
        response.status(500).send({
            error: `Something went wrong when trying to create a new to do`,
            errorinfo: error.message,
            });
    }
});

export default TodosRequestHandler;