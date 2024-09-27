const {createSlice } = require("@reduxjs/toolkit");

const initialState= {
    eventid:'eventid redux',
    userdata:{}
}

const Slice = createSlice({
    name:'event',
    initialState,
    reducers:{
        addEvent:(state,action)=>{
          state.eventid = action.payload;
        } ,
        addUser:(state,action)=>{
          state.userdata = action.payload;
        }
    }
});

export const {addEvent ,addUser} = Slice.actions;
export const selecteventid = (state) => state.eventid;
export const selectuserdata = (state) => state.userdata;
export default Slice.reducer