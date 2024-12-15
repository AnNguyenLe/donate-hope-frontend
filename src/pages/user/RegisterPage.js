import { Box, Input, FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import DatePickerField from "../../components/shared/DatePickerField";
import { useDispatch, useSelector } from "react-redux";
import { resetError, signUpUser } from "../../store";
import { useEffect, useState } from "react";

function RegisterPage() {
	const {
		register,
		handleSubmit,
		control,
		getValues,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const accessToken = useSelector((state) => state.appUser?.data?.accessToken);

	useEffect(() => {
		if (accessToken) {
			navigate("/");
		}
	}, [accessToken, navigate]);

	const backendError = useSelector((state) => state.appUser?.error);

	const [responseError, setResponseError] = useState(null);

	useEffect(() => {
		if (backendError) {
			setResponseError(backendError);
		} else {
			setResponseError(null);
		}
	}, [backendError]);

	useEffect(() => {
		dispatch(resetError());
	}, [dispatch]);

	const onSubmit = (formData) => {
		dispatch(signUpUser(formData));
	};

	return (
		<Box
			className='flex flex-col justify-center items-center pt-10'
			sx={{
				fontFamily: "Roboto, sans-serif",
				fontWeight: 700,
				letterSpacing: ".1rem",
				color: "inherit",
			}}
		>
			<h3 className='text-4xl'>Đăng ký tài khoản</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='pt-8'
				style={{ width: "50%" }}
			>
				{responseError && (
					<Box>
						<Box
							sx={{ color: "red", textAlign: "center", marginBottom: "16px" }}
						>
							{responseError.title}
						</Box>
						<Box
							sx={{ color: "red", textAlign: "center", marginBottom: "16px" }}
						>
							{responseError.detail}
						</Box>
					</Box>
				)}

				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Tên</label>
					<Input
						sx={{ width: "70%" }}
						type='text'
						{...register("firstName", { required: "Tên là bắt buộc" })}
					/>
					{errors.firstName && (
						<FormHelperText error>{errors.firstName.message}</FormHelperText>
					)}
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Họ và tên lót</label>
					<Input
						sx={{ width: "70%" }}
						type='text'
						{...register("lastName", { required: "Họ và tên lót là bắt buộc" })}
					/>
					{errors.lastName && (
						<FormHelperText error>{errors.lastName.message}</FormHelperText>
					)}
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Ngày sinh</label>
					<DatePickerField
						control={control}
						name='dateOfBirth'
						label='Chọn ngày sinh của bạn'
						rules={{ required: "Ngày sinh là bắt buộc" }}
						errors={errors}
					/>
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Email</label>
					<Input
						sx={{ width: "70%" }}
						type='email'
						{...register("email", { required: "Email là bắt buộc" })}
					/>
					{errors.email && (
						<FormHelperText error>{errors.email.message}</FormHelperText>
					)}
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Mật khẩu</label>
					<Input
						sx={{ width: "70%" }}
						type='password'
						{...register("password", {
							required: "Mật khẩu là bắt buộc",
							minLength: {
								value: 8,
								message: "Mật khẩu phải có ít nhất 8 ký tự",
							},
							pattern: {
								value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
								message:
									"Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
							},
						})}
					/>
					{errors.password && (
						<FormHelperText error>{errors.password.message}</FormHelperText>
					)}
				</Box>
				<Box className='pt-12 flex justify-between'>
					<label className='text-xl'>Xác nhận mật khẩu</label>
					<Input
						sx={{ width: "70%" }}
						type='password'
						{...register("confirmPassword", {
							required: "Xác nhận mật khẩu là bắt buộc",
							validate: (value) =>
								value === getValues("password") || "Mật khẩu không khớp",
						})}
					/>
					{errors.confirmPassword && (
						<FormHelperText error>
							{errors.confirmPassword.message}
						</FormHelperText>
					)}
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
					<button type='submit'>Đăng ký</button>
				</Box>
				<Box
					className='text-xl pt-8'
					sx={{ display: "flex", justifyContent: "space-around" }}
				>
					<span>Bạn đã có tài khoản? </span>
					<span className='text-blue-500 hover:border-b-4 border-solid border-blue-500'>
						<Link to='/signin'>Đăng nhập!</Link>
					</span>
				</Box>
			</form>
		</Box>
	);
}

export default RegisterPage;
