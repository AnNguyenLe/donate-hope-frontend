import { createSlice } from "@reduxjs/toolkit";
import { signInUser } from "../thunks/appUser/signInUser";

const appUserSlice = createSlice({
	name: "appUser",
	initialState: {
		isLoading: false,
		error: null,
		data: null,
	},
	extraReducers(builder) {
		builder.addCase(signInUser.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(signInUser.fulfilled, (state, action) => {
			state.isLoading = false;
			const data = {
				...action.payload,
				displayName: `${action.payload.firstName} ${action.payload.lastName}`,
			};
			state.data = data;
			localStorage.setItem("appUser", data);
		});
		builder.addCase(signInUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});
	},
});

export const appUserReducer = appUserSlice.reducer;
