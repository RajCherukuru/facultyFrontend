import { createSlice } from "@reduxjs/toolkit";



const initialState={
    colour: "dark"
}

const colourSlice = createSlice({
    name:"colour",
    initialState: initialState,
    reducers:{
        setColour(state, value){
            state.colour= value.payload;
        }
    }
})


export const {setColour} = colourSlice.actions;
export default colourSlice.reducer;




