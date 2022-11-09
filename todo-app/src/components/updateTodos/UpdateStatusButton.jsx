import checkIcon   from "../../assets/icons/checkIcon.svg"
import onworkIcon from "../../assets/icons/onwork.svg"
import withContext from "../../HOC/withContext";

function UpdateStatusButton(props){

    const {status,context,todoId} = props ;

    const handleClick = () => {
        let newStatus = (status === "-1" || status === "1" ) ? "0" : "1" ;
        context.updateStatus(todoId,newStatus)
    }


    if(status === "-1" || status === "1") {
        return <button type="button" className="btn btn-warning" onClick={handleClick}>
                  <img src={onworkIcon} />
        </button>
    }

    if(status === "0"){
        return <button type="button" className="btn btn-success" onClick={handleClick}>
                <img src={checkIcon} />
        </button>
    }
}

export default withContext(UpdateStatusButton) ;