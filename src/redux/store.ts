import { configureStore } from '@reduxjs/toolkit';
import constantReducer from './slices/constantSlice';
import runtimeReducer from './slices/runtimeSlice';

export const store = configureStore({
    reducer: {
        constant: constantReducer,
        runtime: runtimeReducer,
    },
});

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof store.getState>;