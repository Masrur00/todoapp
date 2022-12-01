import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormTodo } from "./components/FormTodo";
import { Todo } from "./components/Todo";
import "./App.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import { base_url } from "./constants/constants";
// import  base_url  from "./constants/constants";

function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = async (text) => {
    const newtask = {
      text: text,
    };
    addTask(newtask);
  };

  const getData = async () => {
    try {
      const data = await axios.get(`http://localhost:8085/api/todo/task`);
      setTodos([...data.data]);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const deleteTask =  (id) => {
    const params = { id: id };
    try {
       axios.delete(
        `http://localhost:8085/api/todo/task`,
        { data: params }
      ).then((res) => {
        getData();
        console.log(res);
      });
      
    } catch (error) {
      console.log("delete :", error);
    }
  };
  const addTask = (params) => {
    try {
       axios
        .post(`http://localhost:8085/api/todo/task/`, params)
        .then((res) => {
          getData();
        });
    } catch (error) {
      console.log("Inside addTask :", error);
    }
  };

  const removeTodo = (id) => {
    console.log("inside removeTodo");
    deleteTask(id);    
  };

  const markTodo = (todo) => {
      axios
        .patch(`http://localhost:8085/api/todo/task`, todo)        
        .then((response) => {
          getData();
        });
    };

  const editTodo = (params) => {
    console.log("inside editTodo");  
    axios.patch(`http://localhost:8085/api/todo/task/edit`, params)
      .then((response) => {
           console.log(response);
           getData();
         });      
  };

  useEffect(() => {
    console.log(process.env);
    getData();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card key={todo._id}>
              <Card.Body>
                <Todo
                  key={todo._id}
                  id={todo._id}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
