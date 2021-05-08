import { configureStore } from '@reduxjs/toolkit';
import detailPhotoReducer from './detailPhotoSlice';


export const store = configureStore({
    reducer: detailPhotoReducer
});