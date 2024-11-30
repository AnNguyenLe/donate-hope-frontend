import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

const fetchCampaigns = createAsyncThunk("campaigns/fetch", async () => {
	const response = await axiosInstance.get("/campaign");
	return response.data;
});

export { fetchCampaigns };
