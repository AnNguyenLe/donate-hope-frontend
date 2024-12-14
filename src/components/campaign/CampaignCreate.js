import {
	Box,
	Button,
	Container,
	FormControlLabel,
	Grid2 as Grid,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePickerField from "../shared/DatePickerField";
import axiosInstance from "../../utils/axiosInstance";

export default function CampaignCreate() {
	const navigate = useNavigate();
	const onSubmit = async (formData) => {
		const combinedProofUrl = [
			formData.link1,
			formData.link2,
			formData.link3,
			formData.link4,
		].filter((link) => link)
		.join(",");

		const finalFormData = {
			...formData,
			proofsUrl: combinedProofUrl,
		}

		try {
			await axiosInstance.post("/campaign/create", finalFormData);
		} catch (error) {
			console.error("Error create new campaign:", error);
		}

		navigate("/campaign");
	};
	const methods = useForm();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	return (
		<Box sx={{ marginTop: "4rem" }}>
			<FormProvider {...methods}>
				<Container maxWidth='lg'>
					<Box
						sx={{
							padding: 6,
							backgroundColor: "#e8f5e9",
							borderRadius: 3,
							boxShadow: 5,
							mt: 4,
						}}
					>
						<Typography
							variant='h4'
							align='center'
							gutterBottom
							sx={{ fontWeight: "bold", color: "#388e3c" }}
						>
							Create Campaign
						</Typography>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container spacing={4}>
								<Grid size={12}>
									<Controller
										name='title'
										control={control}
										rules={{ required: "Title is required" }}
										render={({ field }) => (
											<TextField
												{...field}
												label='Campaign Title'
												variant='outlined'
												fullWidth
												required
												error={!!errors.title}
												helperText={errors.title?.message}
												sx={{
													bgcolor: "white",
													borderRadius: 2,
													boxShadow: 1,
													mb: 2,
												}}
											/>
										)}
									/>
								</Grid>

								<Grid size={12}>
									<Controller
										name='subtitle'
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label='Subtitle'
												variant='outlined'
												fullWidth
												sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 1 }}
											/>
										)}
									/>
								</Grid>

								<Grid size={12}>
									<Controller
										name='summary'
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label='Summary'
												variant='outlined'
												fullWidth
												multiline
												rows={4}
												sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 1 }}
											/>
										)}
									/>
								</Grid>

								<Grid size={12}>
									<Controller
										name='description'
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label='Description'
												variant='outlined'
												fullWidth
												multiline
												rows={6}
												sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 1 }}
											/>
										)}
									/>
								</Grid>

								<Grid container size={12}>
									<Grid size={8}>
										<Controller
											name='goalAmount'
											control={control}
											rules={{
												required: "Goal Amount is required",
												valueAsNumber: true,
												min: {
													value: 0,
													message: "Goal Amount must be a positive number",
												},
											}}
											render={({ field }) => (
												<TextField
													{...field}
													label='Goal Amount'
													variant='outlined'
													fullWidth
													required
													type='number'
													error={!!errors.goalAmount}
													helperText={errors.goalAmount?.message}
													sx={{
														bgcolor: "white",
														borderRadius: 2,
														boxShadow: 1,
													}}
												/>
											)}
										/>
									</Grid>

									<Grid size={4}>
										<Controller
											name='unitOfMeasurement'
											control={control}
											render={({ field }) => (
												<TextField
													{...field}
													label='Unit of Measurement'
													variant='outlined'
													fullWidth
													sx={{
														bgcolor: "white",
														borderRadius: 2,
														boxShadow: 1,
													}}
												/>
											)}
										/>
									</Grid>
								</Grid>

								<Grid container size={12}>
									<Grid size={6}>
										<DatePickerField
											control={control}
											name='expectingStartDate'
											label='Pick a Start Date'
											rules={{ required: "Start date is required" }}
											errors={errors}
										/>
									</Grid>

									<Grid size={6}>
										<DatePickerField
											control={control}
											name='expectingEndDate'
											label='Pick a End Date'
											rules={{ required: "End date is required" }}
											errors={errors}
										/>
									</Grid>
								</Grid>

								<Grid size={12}>
									<Typography
										variant="h6"
										sx={{ mb: 2, color: "#777c77" }}
									>
										Proofs URL
										</Typography>
								<Grid size={12} marginBottom={1}>
									<Controller
										name="link1"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label="Link Google Drive"
												variant="outlined"
												fullWidth
												sx={{ bgcolor: "white", borderRadius: 2 }}
											/>
										)}
									/>
								</Grid>
								<Grid size={12}  marginBottom={1}>
									<Controller
										name="link2"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label="Link hình 1"
												variant="outlined"
												fullWidth
												sx={{ bgcolor: "white", borderRadius: 2 }}
											/>
										)}
									/>
								</Grid>
								<Grid size={12}  marginBottom={1}>
									<Controller
										name="link3"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label="Link hình 2"
												variant="outlined"
												fullWidth
												sx={{ bgcolor: "white", borderRadius: 2 }}
											/>
										)}
									/>
								</Grid>
								<Grid size={12}  marginBottom={1}>
									<Controller
										name="link4"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label="Link hình 3"
												variant="outlined"
												fullWidth
												sx={{ bgcolor: "white", borderRadius: 2 }}
											/>
										)}
									/>
								</Grid>
								</Grid>

								<Grid item xs={12}>
									<Controller
										name='isPublished'
										control={control}
										render={({ field }) => (
											<FormControlLabel
												control={
													<Switch
														{...field}
														checked={field.value ?? false}
														color='primary'
													/>
												}
												label='Is Published'
											/>
										)}
									/>
								</Grid>

								<Grid size={12}>
									<Button
										variant='contained'
										color='primary'
										type='submit'
										fullWidth
										sx={{
											mt: 3,
											padding: "14px 24px",
											fontSize: "16px",
											borderRadius: 2,
											boxShadow: 3,
											"&:hover": {
												boxShadow: 6,
											},
										}}
									>
										Create Campaign
									</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
				</Container>
			</FormProvider>
		</Box>
	);
}
