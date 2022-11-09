import React from "react" ;
import TableTodos from "./components/readTodos/TableTodos";
import ModalTodosForm from "./components/createTodos/ModalTodosForm";
import {todosContext} from './context/todosContext'

class App extends React.Component {
  constructor(){
    super()

    this.addTodo = this.addTodo.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)

    this.state = {
      todos:[],
      addTodo:this.addTodo,
      updateStatus:this.updateStatus,
      deleteTodo:this.deleteTodo,
    }
  }

  addTodo(newTodo){
    this.setState( (prevState) => {
      return {
        todos: [...prevState.todos,newTodo]
      }
    })
  }

  updateStatus(todoId,status){
      //par bonne pratique on ne vas pas agir sur le state mais sur une copie
      let copyState = [...this.state.todos] ;
    
      //je chercher l'index de la todo que je veux modifier dans la copy du state todos
      let index = copyState.findIndex( todo => todo.id === todoId) ;
      
      //je récupère l'index et modifie la valeur précédemment stockée à cet index
      //puis j'enregistre une nouvelle valeur à ce même index qui est un nouvel objet
      //contenant toute les valeurs précédentes ainsi que la nouvelle valeur du status
      copyState[index] = {
        ...copyState[index],
        status
      }

      this.setState({todos:copyState})
  }

  deleteTodo(todoId){
    let copyState =  [...this.state.todos] ;
    let newState = copyState.filter( todo => todo.id !== todoId )
    this.setState({todos:newState})
  }

  componentDidMount(){
    //ici je récupère les todos dans le ls
    let item = localStorage.getItem("todos") ;
    //je vérifie si il y a vraiment quelque chose ou non
    if(item !== null){
      //si oui je le parse pour transformer la string récup du ls en js
      let itemParsed = JSON.parse(item) ;
      //puis j'enregistre dans le state
      this.setState({todos:itemParsed}) ;
    }
  }

  componentDidUpdate(){

    //je transforme en string mon state 
    let stateStringified = JSON.stringify(this.state.todos) ;

    //puis je peux l'enregistrer dans mon localstorage
    localStorage.setItem("todos",stateStringified)
  }

 

  render(){
    return <todosContext.Provider value={this.state} >
            <div className="d-flex w-100 flex-column justify-content-center align-items-center my-5" >
              <h1>Ma todo App</h1>
              {
                this.state.todos.length === 0 ?
                <div className="alert alert-success my-5" >
                    <h2>Il n'y a rien de prévu à faire</h2>
                </div>
                :
                  <TableTodos/>
                }
              <ModalTodosForm/>
            </div>
        </todosContext.Provider>
  }

}

export default App ;
