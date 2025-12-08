import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IStudent } from '../types/IStudent';

interface StudentState {
    getAllStudent: IStudent[];
    total: number;
}
const initialState: StudentState = {
    getAllStudent: [],
    total: 0,
};

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getStudentAtRedux: (state, action: PayloadAction<{ getAllStudent: IStudent[]; total: number }>) => {
            state.getAllStudent = action.payload.getAllStudent;
            state.total = action.payload.total;
        },
    },
});

export const studentReducer = studentSlice.reducer;
export const { getStudentAtRedux } = studentSlice.actions;
export default studentReducer;
