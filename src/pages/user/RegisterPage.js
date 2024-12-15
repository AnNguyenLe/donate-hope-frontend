import { Box, TextField, Typography, Grid, Button } from "@mui/material";
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
        console.log(formData);
        dispatch(signUpUser(formData));
    };
    return (
        <Grid
            container
            sx={{
                height: "100vh",
                background: "white",
                overflow: "hidden",
            }}
        >
            {/* Bên trái */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundImage: "url(/img-signin-form.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                }}
            ></Grid>
            {/* Bên phải */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        width: "90%",
                        maxWidth: "500px",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" mb={4}>
                        Đăng ký tài khoản
                    </Typography>
                    <Box display="flex" gap={2} mb={2}>
                        <TextField
                            label="Tên"
                            fullWidth
                            {...register("firstName")}
                            variant="filled"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                        <TextField
                            label="Họ và tên lót"
                            fullWidth
                            {...register("lastName")}
                            variant="filled"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Box
                            variant="body1"
                            width="240px"
                            height="60px"
                            display="flex"
                            textAlign="start"
                            alignItems="center"
                            justifyContent="flex-start"
                            borderRadius={1}
                            sx={{
                                backgroundColor: "#F0F0F0",
                            }}
                        >
                            <Typography sx={{ ml: 1, color: "gray" }}>
                                Ngày sinh
                            </Typography>
                        </Box>
                        <DatePickerField
                            control={control}
                            name="dateOfBirth"
                            label="Pick a Date of Birth"
                            rules={{ required: "Xin vui lòng nhập ngày sinh" }}
                            errors={errors}
                        />
                    </Box>

                    <Box display="flex" mb={2}>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="filled"
                            type="email"
                            {...register("email")}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    </Box>

                    <Box display="flex" mb={2}>
                        <TextField
                            label="Mật khẩu"
                            fullWidth
                            variant="filled"
                            type="password"
                            {...register("password")}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    </Box>
                    <Box display="flex" mb={2}>
                        <TextField
                            label="Xác nhận mật khẩu"
                            fullWidth
                            variant="filled"
                            type="password"
                            {...register("confirmPassword")}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                            py: 1.5,
                        }}
                    >
                        <strong>Đăng ký</strong>
                    </Button>
                    <Typography variant="body1" mt={2}>
                        Bạn đã có tài khoản?{" "}
                        <Link
                            to="/signin"
                            style={{
                                color: "#9c27b0",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            Đăng nhập
                        </Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export default RegisterPage;
