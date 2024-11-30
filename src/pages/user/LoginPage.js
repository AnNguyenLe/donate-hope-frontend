import { Box, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../store";

function LoginPage() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onSubmit = (formData) => {
		dispatch(signInUser(formData));
		navigate("/");
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
			<h3 className='text-4xl'>Sign In</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='pt-8'
				style={{ width: "30%" }}
			>
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
					<button type='submit'>Sign In</button>
				</Box>
				<Box
					className='text-xl pt-8'
					sx={{
						display: "flex",
						justifyContent: "space-around",
					}}
				>
					<span>Don't have account yet? </span>
					<span className='text-blue-500 hover:border-b-4 border-solid border-blue-500'>
						<Link to='/signup'>Sign up!</Link>
					</span>
				</Box>
			</form>
		</Box>
	);
}

export default LoginPage;
