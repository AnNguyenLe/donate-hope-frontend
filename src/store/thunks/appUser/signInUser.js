import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrlV1 } from "../../../constants/api";

const signInUser = createAsyncThunk("user/signIn", async (formData) => {
	const response = await axios.post(`${baseUrlV1}/account/login`, formData);
	return response.data;
});

export { signInUser };
