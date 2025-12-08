import { configureStore } from '@reduxjs/toolkit';
import queryReducer from '../feature/querySLice';
import studentReducer from '../feature/studentSlice';
import { teacherReducer } from '../feature/teacherSlice';

export const store = configureStore({
    reducer: {
        filter: queryReducer,
        student: studentReducer,
        teacher: teacherReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
