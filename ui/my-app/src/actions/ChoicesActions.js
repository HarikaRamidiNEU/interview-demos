/**
 * used to define all the action types on the choices
 */
 export const ChoicesActionTypes = {
    ADD_CHOICE: '[Choice] Add Choice',
    DELETE_CHOICE: '[Choice] Delete Choice',
    GET_CHOICE: 'get Choices',
    ADD_MANY_CHOICE: 'Add Many Choices'
}

/**
 * Add action used to add a choice item to the state
 * @param {JSON} payload 
 * @returns 
 */
export const addChoiceAction = (payload) => ({
    type: ChoicesActionTypes.ADD_CHOICE,
    payload : payload
})

/**
 * This method is used to delete the choice item from the state
 * @param {JSON} payload 
 * @returns 
 */
export const deleteChoiceAction = (payload) => ({
    type: ChoicesActionTypes.DELETE_CHOICE,
    payload : payload
})

/**
 * Add action used to add a choice item to the state
 * @param {JSON} payload 
 * @returns 
 */
 export const addManyChoicesAction = (payload) => ({
    type: ChoicesActionTypes.ADD_MANY_CHOICE,
    payload : payload
})


/**
 * This method is used to get the choices from the state 
 * @returns choices
 */
export const getChoiceAction = () => ({
    type: ChoicesActionTypes.GET_CHOICE,
})