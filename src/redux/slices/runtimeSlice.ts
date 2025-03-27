import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const defaultTimeDiv = useSelector((state: RootState) => state.constant.defaultTimeDiv);

const runtimeSlice = createSlice({
    name: 'constant',
    initialState: {
        runPhysics: false,
        timeDiv: 2,
    },
    reducers: {
        slowDown: (state) => { state.timeDiv = 4 },
        speedUp: (state) => { state.timeDiv = defaultTimeDiv },
        speedChange: (state, action) => { state.timeDiv = action.payload },
        stopPhysics: (state) => { state.runPhysics = false },
        startPhysics: (state) => { state.runPhysics = true },
        togglePhysics: (state) => { state.runPhysics = !state.runPhysics },
    }
});

export const { slowDown, speedUp, speedChange, stopPhysics, startPhysics, togglePhysics } = runtimeSlice.actions;
export default runtimeSlice.reducer;