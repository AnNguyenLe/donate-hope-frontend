import React, { useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	Box,
	Button,
	Divider,
	Dialog,
	DialogActions,
	DialogContent,
	Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { AccessTime } from "@mui/icons-material";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import DonationWidget from "../widget/DonationWidget";
import defaultCampaignImage from "../../assets/icons/default-campaign-card-image.png";

const CampaignCard = ({ campaign, goToDetailPage }) => {
	const progress = (campaign.achievedAmount / campaign.goalAmount) * 100;
	const [openDialog, setOpenDialog] = useState(false);
	const imageSource = campaign.proofsUrl && campaign.proofsUrl.split(",")[1];
	const imageBackgroundCard = imageSource ? imageSource : defaultCampaignImage;

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	return (
		<Card
			sx={{
				width: 360,
				height: 540,
				borderRadius: 2,
				boxShadow: 3,
				display: "flex",
				flexDirection: "column",
				marginBottom: 2,
			}}
		>
			<Box
				sx={{
					height: 200,
					backgroundImage: `url(${imageBackgroundCard})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					borderTopLeftRadius: 2,
					borderTopRightRadius: 2,
				}}
			></Box>

			<CardContent
				sx={{
					flex: 1,
				}}
			>
				<Typography
					variant='h6'
					sx={{
						fontWeight: "bold",
						mb: 3,
						textAlign: "center",
						color: "success.main",
					}}
				>
					{campaign.title || "Campaign Title"}
				</Typography>

				<Typography variant='body2' color='text.secondary'>
					Mục tiêu: ${campaign.goalAmount.toLocaleString()}{" "}
					{campaign.unitOfMeasurement}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Đã quyên góp: {campaign.achievedAmount.toLocaleString()}{" "}
					{campaign.unitOfMeasurement || "0"}
				</Typography>

				<Divider sx={{ my: 2 }} />
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginY: 2,
					}}
				>
					<CircularProgressWithLabel value={progress} />
				</Box>

                <Box
                    sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                >
                    <AccessTime sx={{ color: "gray" }} />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginLeft: 1 }}
                    >
                        <strong>Ngày bắt đầu:</strong>{" "}
                        {new Date(
                            campaign.expectingStartDate
                        ).toLocaleDateString("en-GB")}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginLeft: 1 }}
                        textAlign="center"
                    >
                        <strong>Ngày kết thúc:</strong>{" "}
                        {new Date(
                            campaign.expectingEndDate
                        ).toLocaleDateString("en-GB")}
                    </Typography>
                </Box>

				<Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
					<StarIcon sx={{ marginRight: 1, color: "warning.main" }} />
					<Typography variant='body2' color='textSecondary'>
						Điểm đánh giá:
					</Typography>
					<Rating
						name='average-rating'
						value={campaign.averageRatingPoint}
						precision={0.1}
						readOnly
					/>
				</Box>

				<Box
					sx={{
						marginTop: 2,
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Button
						variant='contained'
						color='primary'
						sx={{ width: "45%" }}
						onClick={goToDetailPage}
					>
						CHI TIẾT
					</Button>
					<Button
						variant='contained'
						color='secondary'
						sx={{ width: "45%" }}
						onClick={handleOpenDialog}
					>
						QUYÊN GÓP
					</Button>
				</Box>
			</CardContent>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				maxWidth='sm'
				fullWidth
			>
				<DialogContent>
					<DonationWidget
						campaignId={campaign.id}
						unitOfMeasurement={campaign.unitOfMeasurement}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
};

export default CampaignCard;
