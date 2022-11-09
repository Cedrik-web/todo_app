import React from "react";
import FormTodos from "./FormTodos";

class ModalTodoForm extends React.Component {

    constructor(){
        super()

        this.state = {
            isOpen : false
        }

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen(){
        this.setState( (prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        })
    }

    render(){

        let show = this.state.isOpen ? "show" : "";
        let display = this.state.isOpen ? "block" : "none";

        return <div>
                <button type="button" className="btn btn-primary" onClick={this.toggleOpen}>
                    Ajouter une Todo
                    </button>

                    
                    <div style={{display}} className={`modal fade ${show}`} id="exampleModal" tabindex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" onClick={this.toggleOpen}></button>
                                </div>
                            <div className="modal-body">
                                <FormTodos addTodo={this.props.addTodo} toggleOpen={this.props.toggleOpen}/>
                            </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
    }
}

export default ModalTodoForm;