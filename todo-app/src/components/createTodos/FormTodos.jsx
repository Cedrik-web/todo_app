import {Component} from "react";
import {v4 as uuidV4} from "uuid";
import withContext from "../../HOC/withContext";


class FormTodos extends Component {
    constructor(props){
        super(props)
        this.state = {
            title:"",
            description:"",
            priority:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault() ;
        let newTodo = {
            id:uuidV4(),
            createdAt: new Date().toLocaleString() ,
            status:"-1",
            ...this.state
        }
        this.props.context.addTodo(newTodo)
        this.setState({
            title:"",
            description:"",
            priority:""
        })
        this.props.toggleOpen()
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        return <form onSubmit={this.handleSubmit} >
            <div className="mb-3" >
                <label htmlFor="title" >Titre :</label>
                <input 
                 className="form-control"
                 type="text" 
                 name="title" 
                 id="title" 
                 value={this.state.title}
                 onChange={this.handleChange}
                />
            </div>
            <div className="mb-3" >
                <label htmlFor="description" >Description :</label>
                <textarea 
                 className="form-control"
                 name="description" 
                 id="description" 
                 value={this.state.description}
                 onChange={this.handleChange}
                ></textarea>
            </div>
            <div className="mb-3" >
                <label htmlFor="priority" >Priorité :</label>
                <select 
                 className="form-select"
                 name="priority" 
                 id="priority" 
                 value={this.state.priority}
                 onChange={this.handleChange}
                >
                    <option value="">Sélectionnez une priorité</option>
                    <option value="0" > Faible </option>
                    <option value="1" > Moyenne </option>
                    <option value="2" > Forte </option>
                </select>
            </div>
            <div className="mb-3" >
                <button type="submit"  className="btn btn-success"  >Ajouter</button>
            </div>
        </form>
    }
}
export default withContext(FormTodos) ;