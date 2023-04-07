import React from "react";
import './Pill.scss'
import { connect } from 'react-redux' 
import { deleteChoiceAction } from "../../../actions/ChoicesActions";

/**
 * mapStoreToProps is used to map the state from store to the component
 */
const mapStoreToProps = (state) => ({choices: state.choices})
/**
* mapDispatchToProps is used to dispatch the actions like add and delete choices to state
*/
const mapDispatchToProps = dispatch => {
    return {
        deleteChoice: choices => dispatch(deleteChoiceAction(choices))
    }
}

class Pill extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pill: props.card,
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
            <div className="button"> {this.props.card}
            <button className="remove" name={this.props.card} onClick={this.removeChoice}>x</button>
            </div>
        );
    }
}

const Pills = connect(mapStoreToProps, mapDispatchToProps)(Pill)
export default Pills;