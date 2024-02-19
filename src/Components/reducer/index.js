import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import profileReducer from "./slices/profileSlice"
import colourReducer from "./slices/colourSlice"

const rootReducer= combineReducers({
    auth:authReducer,
    profile:profileReducer,
    colour:colourReducer
})

export default rootReducer