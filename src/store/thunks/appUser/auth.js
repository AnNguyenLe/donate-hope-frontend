import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrlV1 } from "../../../constants/api";
import axiosInstance from "../../../utils/axiosInstance";

const signInUser = createAsyncThunk("user/signIn", async (formData) => {
	const response = await axios.post(`${baseUrlV1}/account/login`, formData);
	return response.data;
});

const signUpUser = createAsyncThunk("user/signUp", async (formData) => {
	const response = await axiosInstance.post("/account/register", formData);
	return response.data;
});

const signUpCharity = createAsyncThunk("charity/signUp", async (formData) => {
	const response = await axiosInstance.post(
		"/charity/account/register",
		formData
	);
	return response.data;
});

export { signInUser, signUpUser, signUpCharity };
