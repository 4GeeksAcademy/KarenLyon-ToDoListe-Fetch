// const UpdateTask = (value) => {
//     const newTask = {
//      label: value,
//      done: false
//     }
//     const updateList = [...item,newTask]
     
    
//     const requestOptions = { 
//          method : 'PUT',
//          headers :{
//               'Content-type' : 'application/json'
//          },
//          body : JSON.stringify(updateList)
//      }
//      fetch('https://playground.4geeks.com/apis/fake/todos/user/Karelyon',requestOptions)
//      .then((response)=>{
//          if (response.ok) {
//              setInputValue("");
//              return getTask()
//          }else {
//              throw new Error ("Error al agregar la tarea")
//          }
//      }).catch ((error)=>{console.error("Error al agregar la tarea",error)})

// }
