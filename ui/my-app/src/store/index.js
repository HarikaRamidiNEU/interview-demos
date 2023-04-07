import { configureStore } from '@reduxjs/toolkit'
import choicesReducer from '../reducers/choicesReducer'

/**
 * Store is configured with choiceReducer
 */
export const store = configureStore({
    reducer: choicesReducer
})