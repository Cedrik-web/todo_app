import React from 'react' ;
import FormTodos from './FormTodos';

class ModalTodosForm extends React.Component {
    
    constructor(){
        super()
        this.state = {
            isOpen:false
        }
        this.toggleOpen = this.toggleOpen.bind(this)
    }

    toggleOpen(){
        this.setState( (prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        } )
    }

    render(){

        let show = this.state.isOpen ? "show" : "";
        let display = this.state.isOpen ? "block" : "none" ;

        return <div>
                <button type="button" className="btn btn-primary" onClick={this.toggleOpen} >
                    Ajouter une todo
                </button>

                <div style={{display}} className={`modal fade ${show}`}  id="exampleModal" tabIndex="-1" >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" onClick={this.toggleOpen}></button>
                            </div>
                            <div className="modal-body">
                                <FormTodos toggleOpen={this.toggleOpen} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.isOpen &&
                    <div className="modal-backdrop fade show"></div>
                }
        </div>
    }
}

export default ModalTodosForm ;