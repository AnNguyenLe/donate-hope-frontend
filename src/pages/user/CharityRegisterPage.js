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
    const accessToken = useSelector(
        (state) => state.appUser?.data?.accessToken
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    const steps = [
        "Đại diện pháp lý",
        "Thông tin tổ chức từ thiện",
        "Thông tin đăng nhập",
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
                    <Box className="flex flex-col justify-between">
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Tên</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="text"
                                {...register("repFirstName", {
                                    required: "Xin vui lòng nhập tên",
                                })}
                            />
                            {errors.firstName && (
                                <span>{errors.firstName.message}</span>
                            )}
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Họ và tên lót</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="text"
                                {...register("repLastName", {
                                    required: "Xin vui lòng nhập họ và tên lót",
                                })}
                            />
                            {errors.lastName && (
                                <span>{errors.lastName.message}</span>
                            )}
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Ngày sinh</label>

                            <DatePickerField
                                control={control}
                                name="repDateOfBirth"
                                label="Date of birth"
                                rules={{
                                    required: "Xin vui lòng nhập ngày sinh",
                                }}
                                errors={errors}
                            />
                            {errors.dateOfBirth && (
                                <span>{errors.dateOfBirth.message}</span>
                            )}
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Email</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="email"
                                {...register("repEmail", {
                                    required: "Xin vui lòng nhập Email",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Địa chỉ email không hợp lệ",
                                    },
                                })}
                            />
                            {errors.repEmail && (
                                <span>{errors.repEmail.message}</span>
                            )}
                        </Box>
                    </Box>
                );
            case 1:
                return (
                    <Box className="flex flex-col justify-between">
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Tên tổ chức</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="text"
                                {...register("orgName", {
                                    required: "Xin vui lòng nhập tên tổ chức",
                                })}
                            />
                            {errors.orgName && (
                                <span>{errors.orgName.message}</span>
                            )}
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Địa chỉ</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="text"
                                {...register("orgAddress", {
                                    required: "Xin vui lòng nhập địa chỉ",
                                })}
                            />
                            {errors.orgAddress && (
                                <span>{errors.orgAddress.message}</span>
                            )}
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Số điện thoại</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="tel"
                                {...register("orgPhone", {
                                    required: "Xin vui lòng nhập số điện thoại",
                                })}
                            />
                            {errors.orgPhone && (
                                <span>{errors.orgPhone.message}</span>
                            )}
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Email (bắt buộc)</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="email"
                                {...register("orgEmail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Địa chỉ email không hợp lệ",
                                    },
                                })}
                            />
                            {errors.orgEmail && (
                                <span>{errors.orgEmail.message}</span>
                            )}
                        </Box>
                    </Box>
                );
            case 2:
                return (
                    <Box className="flex flex-col justify-between">
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">
                                Đăng nhập bằng Email
                            </label>
                            <Input
                                sx={{ width: "70%" }}
                                type="email"
                                value={getValues("orgEmail")}
                                disabled
                            />
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Mật khẩu</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="password"
                                {...register("password", {
                                    required: "Xin vui lòng nhập mật khẩu",
                                    minLength: 6,
                                })}
                            />
                            {errors.password && (
                                <span>{errors.password.message}</span>
                            )}
                        </Box>
                        <Box className="pt-12 flex justify-between">
                            <label className="text-xl">Xác nhận mật khẩu</label>
                            <Input
                                sx={{ width: "70%" }}
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Xin vui lòng nhập lại mật khẩu",
                                    validate: (value) =>
                                        value === getValues("password") ||
                                        "Mật khẩu không chính xác",
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
            className="flex flex-col justify-center items-center pt-10"
            sx={{
                fontFamily: "Roboto, monospace, sans-serif",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
            }}
        >
            <h3 className="text-4xl">Đăng ký tổ chức từ thiện</h3>
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
                className="pt-8"
            >
                {renderStepContent()}

                <Box className="flex justify-between mt-12">
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                        color="primary"
                        sx={{ width: "30%" }}
                    >
                        Back
                    </Button>
                    {activeStep !== 2 && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            sx={{
                                width: "30%",
                                backgroundColor: "black",
                                ":hover": {
                                    backgroundColor: "#6DE219",
                                    boxShadow: "10px 10px black",
                                },
                            }}
                            disabled={
                                !isValid || Object.keys(errors).length > 0
                            }
                        >
                            Next
                        </Button>
                    )}
                </Box>

                {activeStep === steps.length - 1 && (
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
                        <button type="submit">Submit</button>
                    </Box>
                )}
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

export default CharityRegisterPage;
