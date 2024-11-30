import { configureStore } from "@reduxjs/toolkit";

import { appUserReducer } from "./slices/appUserSlice";
import { campaignsReducer } from "./slices/campaignsSlice";

const store = configureStore({
	reducer: {
		appUser: appUserReducer,
		campaigns: campaignsReducer,
	},
});

export { store };

export * from "./thunks/appUser/signInUser";
export * from "./thunks/campaigns/fetchCampaigns";
