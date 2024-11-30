import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Box,
	LinearProgress,
	Divider,
} from "@mui/material";

export default function CampaignCard({ campaign, goToDetailPage }) {
	const progress = (campaign.AchievedAmount / campaign.GoalAmount) * 100;
	return (
		<Card sx={{ maxWidth: "350px", border: "1px solid #9AD221" }}>
			<CardContent>
				<Typography
					variant='h5'
					component='div'
					gutterBottom
					onClick={() => goToDetailPage()}
					sx={{
						":hover": {
							borderBottom: ".2rem solid #9AD221",
						},
					}}
				>
					{campaign.title || "Untitled Campaign"}
				</Typography>
				<Typography variant='body2' color='text.secondary' gutterBottom>
					{campaign.subtitle || "No subtitle available"}
				</Typography>

				<Typography variant='body1'>
					{campaign.description || "No description available"}
				</Typography>

				<Box display='flex' alignItems='center' marginBottom={2}>
					<Typography variant='body2' color='text.secondary' flex={1}>
						Goal: {campaign.goalAmount} {campaign.unitOfMeasurement || "USD"}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Achieved: {campaign.achievedAmount}
					</Typography>
				</Box>

				<LinearProgress
					variant='determinate'
					value={progress}
					sx={{ marginBottom: 2 }}
				/>

				<Box marginBottom={2}>
					<Typography variant='body2' color='text.secondary'>
						Status: {campaign.goalStatus || "Unknown"}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{campaign.campaignStatus ?? "No status"}
					</Typography>
				</Box>

				<Box display='flex' alignItems='center' marginBottom={2}>
					<Typography variant='body2' color='text.secondary'>
						Average Rating: {campaign.averageRatingPoint?.toFixed(2) ?? 0.0} (
						{campaign.numberOfRatings ?? 0} ratings)
					</Typography>
				</Box>

				<Box marginBottom={2}>
					<Typography variant='body2' color='text.secondary'>
						Start Date:{" "}
						{campaign.startDate
							? new Date(campaign.startDate).toLocaleDateString()
							: "Not started yet"}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						End Date:{" "}
						{campaign.endDate
							? new Date(campaign.endDate).toLocaleDateString()
							: "Not ended yet"}
					</Typography>
				</Box>

				<Divider sx={{ marginBottom: 2 }} />

				<Box display='flex' justifyContent='space-between'>
					<Typography variant='body2' color='text.secondary'>
						Created At:{" "}
						{campaign.createdAt
							? new Date(campaign.createdAt).toLocaleString()
							: "N/A"}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Updated At:{" "}
						{campaign.updatedAt
							? new Date(campaign.updatedAt).toLocaleString()
							: "N/A"}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
