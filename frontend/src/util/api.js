import axios from 'axios';

export async function getTodos(){
    try{
        const {data:{ todos },
    } = await axios.get('http://localhost:3000/v1/to-dos');
        return todos;
     } catch(error){
        console.error(error.message);
        return [];
    }
}

export async function patchTodo(todoId, newValue){
    try{
      axios
    .patch(`http://localhost:3000/v1/to-dos/${todoId}`,{
      ...newValue,
      title: newValue.text,
    });
    } catch(error){
        console.error(error.message);
    }   
}
