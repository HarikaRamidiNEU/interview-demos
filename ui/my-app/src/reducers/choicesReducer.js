import AppState from '../store/State'
import { ChoicesActionTypes } from '../actions/ChoicesActions'

/**
 * This is used to modify the state according to the action type
 * @param {state} AppState 
 * @param {ChoicesActionTypes} action 
 * @returns 
 */
const choicesReducer = (state=AppState, action) => {
    const type = action.type;
    const payload = action.payload;
    let newChoices = [...state.choices]
    switch(type){
        case ChoicesActionTypes.ADD_CHOICE: 
            newChoices = [...state.choices];
            newChoices.push(payload);
            break;
        case ChoicesActionTypes.DELETE_CHOICE:
            const filtered = state.choices.filter(c => c!==payload);
            newChoices = [...filtered];
            break;
        case ChoicesActionTypes.ADD_MANY_CHOICE:
            newChoices = payload;
            break;
        case ChoicesActionTypes.GET_CHOICE:
            return {choices: newChoices};
       default:
            newChoices = [...state.choices];
            break;
    }
    return Object.assign({}, state, {choices: newChoices});
}

export default choicesReducer;