import { createSlice } from "@reduxjs/toolkit";


const getUserFromLocalStorage = () => {
    const user  = localStorage.getItem('token');
    return user;
};


interface AuthState {
    user: string | null;
}

const initialState: AuthState = {
    user: getUserFromLocalStorage(),
};


const userSlice = createSlice({
 name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            localStorage.setItem("token", JSON.stringify(user));
          },
          logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("token");
          },
    },
})


export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

