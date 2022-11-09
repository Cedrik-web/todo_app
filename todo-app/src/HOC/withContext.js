import { Component } from "react";
import {todosContext} from '../context/todosContext'

//un hoc prend en param un autre composant qu'il enveloppe
function withContext( WrappedComponent ){

    class WithContext extends Component {

        constructor(props){
            super(props)
        }

        render(){
            return <todosContext.Consumer>
                {
                    (stateFromContext) => {
                        return <WrappedComponent context={stateFromContext} {...this.props} />
                    }
                }
            </todosContext.Consumer>
        }

    }

    return WithContext ;

}

export default withContext ;