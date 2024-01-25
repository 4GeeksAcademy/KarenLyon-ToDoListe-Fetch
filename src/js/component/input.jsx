import React, { useEffect, useState } from "react";

const Input = () => {


    const validateInput = () => {
        if (inputValue === "") alert("The input cannot be empty");
        else (setItem(item.concat(inputValue)));
    }
    const validate = (value) => {
        if (value === ' ') { alert("The input its not correct") } else (setInputValue(value))
    }
    
    const validateTask = (item) => {
        if (item == 0) { return <p>No items yet</p> }
        else if (item === 1) { return <p>{item} item left</p> }
        else return <p>{item} items left</p>;
    }

    const [inputValue, setInputValue] = useState("");
    const [item, setItem] = useState([]);

   
    // Para obtener las tareas
    const getTask = () => {
       
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Karelyon', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(
 response => setItem(response))
         
    }
  
    // cambia el estado
    useEffect(() => {
        getTask();
    }, []);


    // Para actualizar la tarea 
    const UpdateTask = (value) => {
        const newTask = {
            label: value,
            done: false
        }
        const updateList = [...item, newTask]
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateList)
        }
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Karelyon', requestOptions)
            .then((response) => {
                if (response.ok) {
                    setInputValue("");
                    return getTask()
                } else {
                    throw new Error("Error al agregar la tarea")
                }
            }).catch((error) => { console.error("Error al agregar la tarea", error) })

    }



    const deleteItem = (deletedItem) => {
        const newList = item.filter((listitem) => listitem.id !== deletedItem.id);
        setItem(newList);
        return fetch('https://playground.4geeks.com/apis/fake/todos/user/Karelyon', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newList)
        }).then((response) => {
            if (response.ok) {
                setInputValue("");
                return getTask()
            } else {
                throw new Error("Error al agregar la tarea")
            }
        }).catch((error) => { console.error("Error al agregar la tarea", error) });
    }


    const DeleteAll = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Karelyon', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        }).then((response) =>{ if(response.ok){setItem([])}})
    }
    return (
        <div className="back">

            <h1 className="text-center">To Do List</h1>
            <ul>
                <li >
                    <input type="text" value={(inputValue)} onChange={(e) => {validate(e.target.value)}}  placeholder="Write your new task"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                {validateInput()(UpdateTask(inputValue))}
                            }
                        }}
                    />

                </li>

                {item.map(listitem => {
                    return (

                        <li key={listitem.id} className="listInput d-flex justify-content-between align-items-center ">
                            {listitem.label}

                            <i className="fa-solid fa-trash trash" onClick={() => deleteItem(listitem)}></i>
                        </li>)
                })}
            </ul>
            <div className="task">
                <p>{validateTask(item.length)}</p>
            </div>
            <div>
            <button type="button" className="btn btn-danger" onClick={()=>DeleteAll(alert("Don't Forget to create a new User"))}>DELETE EVERYTHING</button>
            </div>
        </div>


    );
};

export default Input;