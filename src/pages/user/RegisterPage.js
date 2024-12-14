import { Box, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import DatePickerField from "../../components/shared/DatePickerField";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../store";
import { useEffect } from "react";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const accessToken = useSelector(
        (state) => state.appUser?.data?.accessToken
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    const onSubmit = (formData) => {
        dispatch(signUpUser(formData));
    };
    return (
        <Box
            className="flex flex-col justify-center items-center pt-10"
            sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
            }}
        >
            <h3 className="text-4xl">Đăng ký tài khoản</h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="pt-8"
                style={{ width: "50%" }}
            >
                <Box className="pt-12 flex justify-between">
                    <label className="text-xl">Tên</label>
                    <Input
                        sx={{ width: "70%" }}
                        type="text"
                        {...register("firstName")}
                    />
                </Box>
                <Box className="pt-12 flex justify-between">
                    <label className="text-xl">Họ và tên lót</label>
                    <Input
                        sx={{ width: "70%" }}
                        type="text"
                        {...register("lastName")}
                    />
                </Box>
                <Box className="pt-12 flex justify-between">
                    <label className="text-xl">Ngày sinh</label>
                    <DatePickerField
                        control={control}
                        name="dateOfBirth"
                        label="Pick a Date of Birth"
                        rules={{ required: "Date of Birth is required" }}
                        errors={errors}
                    />
                </Box>
                <Box className="pt-12 flex justify-between">
                    <label className="text-xl">Email</label>
                    <Input
                        sx={{ width: "70%" }}
                        type="email"
                        {...register("email")}
                    />
                </Box>
                <Box className="pt-12 flex justify-between">
                    <label className="text-xl">Mật khẩu</label>
                    <Input
                        sx={{ width: "70%" }}
                        type="password"
                        {...register("password")}
                    />
                </Box>
                <Box className="pt-12 flex justify-between">
                    <label className="text-xl">Xác nhận mật khẩu</label>
                    <Input
                        sx={{ width: "70%" }}
                        type="password"
                        {...register("confirmPassword")}
                    />
                </Box>
                <Box
                    className="text-2xl mt-16 text-center"
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
                    <button type="submit">Đăng ký</button>
                </Box>
                <Box
                    className="text-xl pt-8"
                    sx={{ display: "flex", justifyContent: "space-around" }}
                >
                    <span>Bạn đã có tài khoản? </span>
                    <span className="text-blue-500 hover:border-b-4 border-solid border-blue-500">
                        <Link to="/signin">Đăng nhập!</Link>
                    </span>
                </Box>
            </form>
        </Box>
    );
}

export default RegisterPage;
