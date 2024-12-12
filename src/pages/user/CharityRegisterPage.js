import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Input, Button } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DatePickerField from "../../components/shared/DatePickerField";
import { useDispatch, useSelector } from "react-redux";
import { signUpCharity } from "../../store";

function CharityRegisterPage() {
	const [activeStep, setActiveStep] = useState(0);
	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { errors, isValid },
		trigger,
	} = useForm({ mode: "onChange", reValidateMode: "onChange" });
	const dispatch = useDispatch();
	const accessToken = useSelector((state) => state.appUser?.data?.accessToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) {
			navigate("/");
		}
	}, [accessToken, navigate]);

	const steps = [
		"Legal Representative",
		"Charitable Organization Info",
		"Login Info",
	];

	const onSubmit = (data) => {
		dispatch(signUpCharity(data));
	};

	const handleNext = async () => {
		const isStepValid = await trigger();
		if (isStepValid) {
			setActiveStep((prevStep) => prevStep + 1);
		}
	};

	const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

	const renderStepContent = () => {
		switch (activeStep) {
			case 0:
				return (
					<Box className='flex flex-col justify-between'>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>First Name</label>
							<Input
								sx={{ width: "70%" }}
								type='text'
								{...register("repFirstName", {
									required: "First name is required",
								})}
							/>
							{errors.firstName && <span>{errors.firstName.message}</span>}
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Last Name</label>
							<Input
								sx={{ width: "70%" }}
								type='text'
								{...register("repLastName", {
									required: "Last name is required",
								})}
							/>
							{errors.lastName && <span>{errors.lastName.message}</span>}
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Date of Birth</label>

							<DatePickerField
								control={control}
								name='repDateOfBirth'
								label='Date of birth'
								rules={{ required: "Date of birth is required" }}
								errors={errors}
							/>
							{errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Email</label>
							<Input
								sx={{ width: "70%" }}
								type='email'
								{...register("repEmail", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
							/>
							{errors.repEmail && <span>{errors.repEmail.message}</span>}
						</Box>
					</Box>
				);
			case 1:
				return (
					<Box className='flex flex-col justify-between'>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Organization Name</label>
							<Input
								sx={{ width: "70%" }}
								type='text'
								{...register("orgName", {
									required: "Organization name is required",
								})}
							/>
							{errors.orgName && <span>{errors.orgName.message}</span>}
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Address</label>
							<Input
								sx={{ width: "70%" }}
								type='text'
								{...register("orgAddress", {
									required: "Address is required",
								})}
							/>
							{errors.orgAddress && <span>{errors.orgAddress.message}</span>}
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Phone</label>
							<Input
								sx={{ width: "70%" }}
								type='tel'
								{...register("orgPhone", {
									required: "Phone number is required",
								})}
							/>
							{errors.orgPhone && <span>{errors.orgPhone.message}</span>}
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Email (required)</label>
							<Input
								sx={{ width: "70%" }}
								type='email'
								{...register("orgEmail", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
							/>
							{errors.orgEmail && <span>{errors.orgEmail.message}</span>}
						</Box>
					</Box>
				);
			case 2:
				return (
					<Box className='flex flex-col justify-between'>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Login Email</label>
							<Input
								sx={{ width: "70%" }}
								type='email'
								value={getValues("orgEmail")}
								disabled
							/>
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Password</label>
							<Input
								sx={{ width: "70%" }}
								type='password'
								{...register("password", {
									required: "Password is required",
									minLength: 6,
								})}
							/>
							{errors.password && <span>{errors.password.message}</span>}
						</Box>
						<Box className='pt-12 flex justify-between'>
							<label className='text-xl'>Confirm Password</label>
							<Input
								sx={{ width: "70%" }}
								type='password'
								{...register("confirmPassword", {
									required: "Please confirm your password",
									validate: (value) =>
										value === getValues("password") || "Passwords do not match",
								})}
							/>
							{errors.confirmPassword && (
								<span>{errors.confirmPassword.message}</span>
							)}
						</Box>
					</Box>
				);
			default:
				return null;
		}
	};

	// Submit button styled similarly to the provided register page
	return (
		<Box
			className='flex flex-col justify-center items-center pt-10'
			sx={{
				fontFamily: "monospace",
				fontWeight: 700,
				letterSpacing: ".1rem",
				color: "inherit",
			}}
		>
			<h3 className='text-4xl'>Charity Registration</h3>
			<Stepper
				activeStep={activeStep}
				alternativeLabel
				sx={{ width: "80%", marginTop: 2 }}
			>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ width: "50%" }}
				className='pt-8'
			>
				{renderStepContent()}

				<Box className='flex justify-between mt-12'>
					<Button
						disabled={activeStep === 0}
						onClick={handleBack}
						variant='outlined'
						color='primary'
						sx={{ width: "30%" }}
					>
						Back
					</Button>
					{activeStep !== 2 && (
						<Button
							variant='contained'
							color='primary'
							onClick={handleNext}
							sx={{
								width: "30%",
								backgroundColor: "black",
								":hover": {
									backgroundColor: "#6DE219",
									boxShadow: "10px 10px black",
								},
							}}
							disabled={!isValid || Object.keys(errors).length > 0}
						>
							Next
						</Button>
					)}
				</Box>

				{activeStep === steps.length - 1 && (
					<Box
						className='text-2xl mt-16 text-center'
						sx={{
							border: ".2rem solid black",
							borderRadius: "4px",
							backgroundColor: "black",
							color: "white",
							":hover": {
								backgroundColor: "#6DE219",
								boxShadow: "10px 10px black",
							},
						}}
					>
						<button type='submit'>Submit</button>
					</Box>
				)}
				<Box
					className='text-xl pt-8'
					sx={{ display: "flex", justifyContent: "space-around" }}
				>
					<span>Already have an account? </span>
					<span className='text-blue-500 hover:border-b-4 border-solid border-blue-500'>
						<Link to='/signin'>Sign in!</Link>
					</span>
				</Box>
			</form>
		</Box>
	);
}

export default CharityRegisterPage;
