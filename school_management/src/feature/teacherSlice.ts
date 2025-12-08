import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ITeacher } from '../types/ITeacher';

interface StudentState {
    getAllTeacher: ITeacher[];
    total: number;
}
const initialState: StudentState = {
    getAllTeacher: [],
    total: 0,
};

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        getTeacherAtRedux: (state, action: PayloadAction<{ getAllTeacher: ITeacher[]; total: number }>) => {
            state.getAllTeacher = action.payload.getAllTeacher;
            state.total = action.payload.total;
        },
    },
});
export const teacherReducer = teacherSlice.reducer;
export const { getTeacherAtRedux } = teacherSlice.actions;
export default teacherSlice;
