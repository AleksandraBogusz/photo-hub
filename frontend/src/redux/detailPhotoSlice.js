import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    detailPhotoUrl: ''
};

const slice = createSlice({
    name: 'detailPhoto',
    initialState,
    reducers: {
        changeUrl: (state, action) => {
            state.detailPhotoUrl = action.payload;
        }
    }
});


export const detailPhotoUrlSelector = state => state.detailPhotoUrl;
export const changeUrl = slice.actions.changeUrl;
export default slice.reducer;