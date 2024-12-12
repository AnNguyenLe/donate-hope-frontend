import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpCharity, signUpUser } from "../thunks/appUser/auth";

const appUserSlice = createSlice({
	name: "appUser",
	initialState: {
		isLoading: false,
		error: null,
		data: JSON.parse(localStorage.getItem("appUser")) || null,
	},
	reducers: {
		signOutUser: (state) => {
			state.data = null;
			state.error = null;
			state.isLoading = false;
			localStorage.removeItem("appUser");
		},
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
			localStorage.setItem("appUser", JSON.stringify(data));
		});
		builder.addCase(signInUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});

		builder.addCase(signUpUser.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(signUpUser.fulfilled, (state, action) => {
			state.isLoading = false;
			const data = {
				...action.payload,
				displayName: `${action.payload.firstName} ${action.payload.lastName}`,
			};
			state.data = data;
			localStorage.setItem("appUser", JSON.stringify(data));
		});
		builder.addCase(signUpUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});

		builder.addCase(signUpCharity.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(signUpCharity.fulfilled, (state, action) => {
			state.isLoading = false;
			const data = {
				...action.payload,
				displayName: `${action.payload.firstName} ${action.payload.lastName}`,
			};
			state.data = data;
			localStorage.setItem("appUser", JSON.stringify(data));
		});
		builder.addCase(signUpCharity.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});
	},
});

export const { signOutUser } = appUserSlice.actions;
export const appUserReducer = appUserSlice.reducer;
