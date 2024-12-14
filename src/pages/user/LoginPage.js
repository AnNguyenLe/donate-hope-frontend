import {
    Box,
    Input,
    Typography,
    Button,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInUser } from "../../store";
import { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = useSelector(
        (state) => state.appUser?.data?.accessToken
    );
    const onSubmit = (formData) => {
        dispatch(signInUser(formData));
    };

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                background: "url(/bg-signin.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    margin: "5rem auto",
                    padding: 4,
                    background: "white",
                    borderRadius: "1rem",
                    boxShadow: 3,
                    textAlign: "center",
                }}
            >
                <LoginIcon sx={{ mb: 1, fontSize: "2rem" }}></LoginIcon>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                    Đăng nhập
                </Typography>

                <Box sx={{ marginBottom: 2, textAlign: "left" }}>
                    <Typography variant="body1">Email</Typography>
                    <Input
                        sx={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "1rem",
                            marginTop: 1,
                            border: "1px solid #ccc",
                            transition:
                                "border 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                            ":focus": {
                                borderColor: "#4CAF50",
                                boxShadow: "0 0 5px rgba(76, 175, 80, 0.5)",
                            },
                            ":before": {
                                display: "none",
                            },
                            ":after": {
                                display: "none",
                            },
                            ":hover": {
                                borderColor: "#4CAF50",
                            },
                        }}
                        type="email"
                        {...register("email")}
                    />
                </Box>

                <Box sx={{ marginBottom: 2, textAlign: "left" }}>
                    <Typography variant="body1">Mật khẩu</Typography>
                    <Input
                        sx={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "1rem",
                            marginTop: 1,
                            border: "1px solid #ccc",
                            transition:
                                "border 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                            ":focus": {
                                borderColor: "#4CAF50",
                                boxShadow: "0 0 5px rgba(76, 175, 80, 0.5)",
                            },
                            ":before": {
                                display: "none",
                            },
                            ":after": {
                                display: "none",
                            },
                            ":hover": {
                                borderColor: "#4CAF50",
                            },
                        }}
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>

                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    sx={{
                        width: "100%",
                        padding: "12px",
                        fontWeight: "bold",
                        borderRadius: "1rem",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#45a049",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                        marginTop: 3,
                    }}
                >
                    BẮT ĐẦU
                </Button>

                {/* Sign up link */}
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="body2">
                        Bạn chưa có tài khoản?{" "}
                        <Link
                            to="/signup"
                            style={{
                                color: "#4CAF50",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Đăng ký ngay!
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginPage;
