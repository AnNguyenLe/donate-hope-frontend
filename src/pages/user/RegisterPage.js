import { Box, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function RegisterPage() {
	const { register, handleSubmit } = useForm();
	const onSubmit = (formData) => {
		console.log(formData);
	};
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
			<h3 className='text-4xl'>Sign Up</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='pt-8'
				style={{ width: "50%" }}
			>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>First Name</label>
					<Input sx={{ width: "70%" }} type='text' {...register("firstName")} />
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Last Name</label>
					<Input sx={{ width: "70%" }} type='text' {...register("lastName")} />
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Date of Birth</label>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker format='YYYY-MM-DD' {...register("dateOfBirth")} />
					</LocalizationProvider>
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Email</label>
					<Input sx={{ width: "70%" }} type='email' {...register("email")} />
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Password</label>
					<Input
						sx={{ width: "70%" }}
						type='password'
						{...register("password")}
					/>
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Confirm Password</label>
					<Input
						sx={{ width: "70%" }}
						type='password'
						{...register("confirmPassword")}
					/>
				</Box>
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
					<button type='submit'>Sign Up</button>
				</Box>
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

export default RegisterPage;
