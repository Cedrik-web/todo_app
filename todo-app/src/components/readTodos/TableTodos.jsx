import {useState}  from 'react' ; 
import withContext from '../../HOC/withContext';
import DeleteButton from "../deleteTodos/DeleteButton"
import UpdateStatusButton from "../updateTodos/UpdateStatusButton"


function TableTodos(props){

    //le hook useState nous permet d'utiliser un state dans un composant fonctionnel
    const  [sorting,setSorting]   = useState({
        sortBy:"title",
        orderBy:"asc"
    }) ;

    const priorities = ["Faible","Moyenne","Forte"] ;

    const handleClick = (e) => {
        setSorting( (prevState) => {
            return {
                sortBy: e.target.id ,
                orderBy:prevState.orderBy === "asc" ? "desc" : "asc"
            }
        } )
    }

    const sortTodosBy = (todos) => {
        let copyState = [...todos] ;
        copyState.sort( (a,b) => {
          if(a[sorting.sortBy].toLowerCase() > b[sorting.sortBy].toLowerCase()){
            return sorting.orderBy === "asc" ? 1 : -1 ;
          }else if(a[sorting.sortBy].toLowerCase() < b[sorting.sortBy].toLowerCase()){
            return sorting.orderBy === "asc" ? -1 : 1 ;
          }else {
            return 0
          }
        })
        return copyState
      }


    return <div>
        <table className="table table-success" >
            <thead>
                <tr>
                    <th scope="col" >#</th>
                    <th scope="col" id="title" onClick={handleClick} style={{cursor:"pointer"}} >Titre</th>
                    <th scope="col" >Description</th>
                    <th scope="col" id="priority" onClick={handleClick} style={{cursor:"pointer"}} >Priorité</th>
                    <th scope="col" id="createdAt" onClick={handleClick} style={{cursor:"pointer"}}>Crée le</th>
                    <th scope="col" id="status" onClick={handleClick} style={{cursor:"pointer"}}>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    sortTodosBy(props.context.todos)
                    .map( (todo,index) => {

                        let status = todo.status === "-1" ? "A faire" : todo.status === "0" ? "En cours" : "Terminer" ;

                        let priorityColor = todo.priority === "0" ? "green" 
                                            : todo.priority === "1"  ? "orange" : "red" ;
                                            
                        let statusColor = todo.status === "-1" ? "grey" 
                                            : todo.status === "0"  ? "yellow" : "green" ;

                       return <tr key={todo.id} >
                            <th scope="row" > {index+1} </th>
                            <td> {todo.title} </td>
                            <td> {todo.description} </td>
                            <td style={{backgroundColor:priorityColor}} > { priorities[todo.priority] } </td>
                            <td> {todo.createdAt} </td>
                            <td style={{backgroundColor:statusColor}}> {status} </td>
                            <td>  <UpdateStatusButton todoId={todo.id} status={todo.status} />  </td>
                            <td> <DeleteButton todoId={todo.id} /> </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default withContext(TableTodos) ;