import { createSlice } from '@reduxjs/toolkit';

const constantSlice = createSlice({
    name: 'constant',
    initialState: {
        gravityConstant: -9.8,
        margin: 0.001,
        defaultTimeDiv: 1,
        showAllBricks: false
    },
    reducers: { }
});

export const {} = constantSlice.actions;
export default constantSlice.reducer;