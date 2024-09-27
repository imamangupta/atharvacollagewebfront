const {createSlice } = require("@reduxjs/toolkit");

const initialState= {
    eventid:'eventid redux'
}

const Slice = createSlice({
    name:'event',
    initialState,
    reducers:{
        addEvent:(state,action)=>{
          state.eventid = action.payload;
        }
    }
});

export const {addEvent} = Slice.actions;
export const selecteventid = (state) => state.eventid;
export default Slice.reducer