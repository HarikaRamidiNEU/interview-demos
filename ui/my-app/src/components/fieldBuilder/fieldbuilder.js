import React from 'react';
import './Fieldbuilder.scss'
import { connect } from 'react-redux' 
import FieldService from '../../services/MockService'
import {addChoiceAction, addManyChoicesAction, getChoiceAction} from "../../actions/ChoicesActions";
import Card from '../common-utils/Pill/Pill'
import Button from '../common-utils/Button/button';


/**
 * mapStoreToProps is used to map the state from store to the component
 */
 const mapStoreToProps = (state) => ({choices: state.choices})

 /**
  * mapDispatchToProps is used to map the component to dispatch the add choice action
  */
 const mapDispatchToProps = (dispatch) => {
     return {
       add: (choice) => dispatch(addChoiceAction(choice)),
       addMany: choices => dispatch(addManyChoicesAction(choices)),
       get: () => dispatch(getChoiceAction()),
     }
 }

class FieldBuilder extends React.Component{
  constructor(props) {
    super(props);
    //local Storage is used to fetch the last updated state of the form
    let initialState = JSON.parse(localStorage.getItem('fieldObj'));
    if(!initialState){
      let fieldObj = {'label': '', 'required': false, 'choices': [], 'displayAlpha': true, 'default': ''};
      localStorage.setItem('fieldObj',JSON.stringify(fieldObj));
      initialState = JSON.parse(localStorage.getItem('fieldObj'));
    }   
    this.state = {
      label: initialState.label,
      required: initialState.required,
      choices: initialState.choices,
      displayAlpha: initialState.displayAlpha, 
      default: initialState.default,
      formErrors: false,
      fieldsObj: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setLabel = this.setLabel.bind(this);
    this.setRequired = this.setRequired.bind(this);
    this.setChoices = this.setChoices.bind(this);
    this.setDisplayAlpha = this.setDisplayAlpha.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.closeErrorPopup = this.closeErrorPopup.bind(this);
    let fieldObj = {'label': this.state.label, 'required': this.state.required, 'choices': this.state.choices, 'displayAlpha': this.state.displayAlpha, 'default': this.state.default};
    localStorage.setItem('fieldObj',JSON.stringify(fieldObj))
  }

    /**
     * Used to handle the submit functionality
     * @param {*} event 
     */
     handleSubmit(event) {
      if(this.state.default !== '' && this.props.choices.filter(c => c === this.state.default).length === 0)
        this.addChoices(this.state.default);
      if(this.state.label === ''){
        this.setState({formErrors: true})
        this.setState({error: 'Label is mandatory'})
      }
      else if(!this.state.formErrors){
        this.props.get();
          let fieldsObj = JSON.parse(localStorage.getItem('fieldObj'));
          FieldService.saveField(fieldsObj);
          //this code can be used when we want to reset the content of the form after submit
        // let fieldObj = {'label': '', 'required': false, 'choices': [], 'displayAlpha': true, 'default': ''};
        // localStorage.setItem('fieldObj',JSON.stringify(fieldObj))
      }
  }

  /**
   * This method is used to handle the functionality of cancel on the form
   * @param {*} event 
   */
  handleCancel(event){
    this.setState({
      label: '',
      required: false,
      choices: [],
      displayAlpha: true, 
      default: '',
      formErrors: false,
      error: ''
  })
  this.props.addMany([]);
  let fieldObj = {'label': '', 'required': false, 'choices': [], 'displayAlpha': true, 'default': ''};
  localStorage.setItem('fieldObj',JSON.stringify(fieldObj))
  event.preventDefault();
  }

  /**
   * This method is used to set the label value in state when label value of form changes 
   * @param {*} event 
   */
  setLabel(event) {
      this.setState({label: event.target.value});
      let fieldsObj = JSON.parse(localStorage.getItem('fieldObj'));
      fieldsObj.label = event.target.value;
      localStorage.setItem('fieldObj',JSON.stringify(fieldsObj));
    }

    /**
    * This method is used to set the required value in state when required value of form changes 
    * @param {*} event 
    */
    setRequired(event) {
      let fieldsObj = JSON.parse(localStorage.getItem('fieldObj'));
      if(event.target.value === 'on'){
        this.setState({required: true});
        fieldsObj.required = true;
      }
      else{
        this.setState({required: false});
        fieldsObj.required = false;
      }
      localStorage.setItem('fieldObj',JSON.stringify(fieldsObj));
    }
    /**
    * This method is used to set the choices value in state when each choice value is entered and clicked on enter
    * @param {*} event 
    */
    setChoices(event) {
      if(event.key === 'Enter') {
        const val = event.target.value;
        if(val.includes("\n")){
          const choicesArray = val.split("\n");
          let i=0;
          while(i < choicesArray.length){
            this.addChoices(choicesArray[i++]);
          }
        }
        else{
          this.addChoices(val);
        }
        event.target.value = ''
      }
    }

    /**
     * Thhis method is used to add choices to the props and storage
     * @param {*} choice 
     */
    addChoices(choice){
      let choicesObj = JSON.parse(localStorage.getItem('fieldObj'));
      if(choicesObj.choices.length === 50){
        this.setState({formErrors: true});
        this.setState({error: 'Max 50 choices are only allowed'})
      }
      else if(choicesObj.choices.filter(c => c === choice).length !== 0){
        this.setState({formErrors: true});
        this.setState({error: 'Duplicate choices are not allowed'})
      }
      else{
        this.props.add(choice);
        let fieldsObj = JSON.parse(localStorage.getItem('fieldObj'));
        fieldsObj.choices.push(choice);
        localStorage.setItem('fieldObj',JSON.stringify(fieldsObj));
      }  
    }

    /**
    * This method is used to set the display order value in state when display order value of form changes 
    * @param {*} event 
    */
    setDisplayAlpha(event) {
      this.setState({displayAlpha: event.target.value});
      let fieldsObj = JSON.parse(localStorage.getItem('fieldObj'));
      fieldsObj.displayAlpha = event.target.value;
      localStorage.setItem('fieldObj',JSON.stringify(fieldsObj));
    }
    /**
    * This method is used to set the default value in state when default value of form changes 
    * @param {*} event 
    */
    setDefault(event) {
      this.setState({default: event.target.value});
      let fieldsObj = JSON.parse(localStorage.getItem('fieldObj'));
      fieldsObj.default = event.target.value;
      localStorage.setItem('fieldObj',JSON.stringify(fieldsObj));
    }

    /**
    * This method is used to reset the error state 
    * @param {*} event 
    */
    closeErrorPopup(event){
      event.target.parentElement.style.display='none';
      this.setState({
        formErrors: false,
        error: ''
      })
    }

  render(){
    const fieldObjStored = JSON.parse(localStorage.getItem('fieldObj'));
    const choices = fieldObjStored.choices;
    let items, card;
    if(choices){
        items = choices.map((t,i) => <Card 
    card={t} 
    key={i} 
    index={i}
    selectedHandler={this.props.selectedHandler}/>)
    }
    if(items && items.length > 0)
      card = <div className="cards">
      {items}
      </div>
    let error;
    if(this.state.formErrors)
      error = <div className="alert">
      <span className="closebtn" onClick={this.closeErrorPopup}>&times;</span>
      {this.state.error}
  </div>
  const isChecked = this.state.required;
  let isdisplayAlpha;
  if(this.state.displayAlpha === true)
    isdisplayAlpha = true;
  else
   isdisplayAlpha = false;
  return (
    <div className="field-builder">
       {error}
      <section className="formSection">
      <header className="field-builder-header">
        Field Builder    
      </header>
        <div className="fieldsContainer">
          <label className="mainLabel">Label</label>
          <input type="text" value={this.state.label} onChange={this.setLabel}/>
       </div>
       <div className="fieldsContainer">
          <label className="mainLabel">Type</label>
          <label className="text_before_checkbox">MultiSelect</label>
          <input type="checkbox" onChange={this.setRequired} checked={isChecked ? 'checked' : ''}/>
          <label className="text_after_checkbox">A value is required</label>
       </div>
       <div className="fieldsContainer">
          <label className="mainLabel">Default Value</label>
          <input type="text" value={this.state.default} onChange={this.setDefault}/>
       </div>
       <div className="fieldsContainer">
          <label className="mainLabel">Choices</label>
          <section>
          <textarea onKeyDown={this.setChoices} />
          {card}
          </section>
       </div>
       <div className="fieldsContainer">
          <label className="mainLabel">Order</label>
          <select onChange={this.setDisplayAlpha} value={isdisplayAlpha}>
            <option value="true" >Display Choices in Alphabetical</option>
            <option value="false" >Display Choices in Reverse Alphabetical</option>
          </select>
       </div>
       <section className="buttonsSection">
          <Button type="button" value="Save Changes" method={this.handleSubmit}/>
          Or
          <a className="cancel" id="cancel" onClick={this.handleCancel}>Cancel</a>
       </section>
      </section>
    </div>
  );
  }
}

/**
 * Connecting the component with the store state and actions
 */
 const fieldbuilders = connect(mapStoreToProps, mapDispatchToProps)(FieldBuilder)

 export default fieldbuilders;