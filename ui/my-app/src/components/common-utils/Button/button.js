import React from "react";
import './button.scss'

class Button extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            value: props.value,
            method: props.method
        }
        this.removeChoice = this.removeChoice.bind(this);
      }
    
    /**
    * This method is used to delete choice value in state
    * @param {*} choice 
    */
     removeChoice(event) {
        const choice = event.target.getAttribute("name");
        this.props.deleteChoice(choice);
        let fieldsObj = JSON.parse(localStorage.getItem('fieldObj'));
        const filtered = fieldsObj.choices.filter(c => c!==choice);
        fieldsObj.choices = [...filtered];
        localStorage.setItem('fieldObj',JSON.stringify(fieldsObj));
      }
   
    render(){
        return (
            <input type={this.props.type} value={this.props.value} className="save" id="save" onClick={this.props.method}/>
        );
    }
}

export default Button;