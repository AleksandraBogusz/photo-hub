import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    comment: {
        value: '',
        timestamp: 0,
    },
    focusedPhoto: {
        url: '',
        id: '',
    }
};

const slice = createSlice({
    name: 'detailPhoto',
    initialState,
    reducers: {
        submitComment: (state, action) => {
            state.comment = {
                value: action.payload,
                timestamp: Date.now()
            }
        },
        setFocusedPhoto: (state, action) => {
            state.focusedPhoto = action.payload;
        }
    }
});


export const commentSelector = state => state.comment;
export const focusedPhotoSelector = state => state.focusedPhoto;
export const submitComment = slice.actions.submitComment;
export const setFocusedPhoto = slice.actions.setFocusedPhoto;
export default slice.reducer;