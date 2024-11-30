import React, { useState, useEffect, useCallback } from "react";
import {
	Container,
	Card,
	CardContent,
	Typography,
	Box,
	LinearProgress,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";

const CampaignDetailPage = () => {
	const [campaign, setCampaign] = useState(null);

	const { id } = useParams();

	const fetchCampaignDetail = useCallback(async () => {
		try {
			const response = await axiosInstance.get(`/campaign/${id}`);
			setCampaign(response.data);
		} catch (error) {
			console.error("Error fetching campaign details:", error);
		}
	}, [id]);

	useEffect(() => {
		fetchCampaignDetail();
	}, [fetchCampaignDetail]);

	if (!campaign) {
		return <Typography>Loading campaign details...</Typography>;
	}

	return (
		<Container maxWidth='md' className='mt-6'>
			<Card>
				<CardContent>
					<Typography variant='h4' gutterBottom>
						{campaign.title}
					</Typography>
					<Typography variant='h6' color='textSecondary' gutterBottom>
						{campaign.subtitle}
					</Typography>

					<Typography variant='body1' paragraph>
						{campaign.description}
					</Typography>

					<Typography variant='body2' color='textSecondary' paragraph>
						<strong>Summary:</strong> {campaign.summary}
					</Typography>

					<Box marginTop={2}>
						<Typography variant='body2' color='textSecondary' gutterBottom>
							Goal: {campaign.goalAmount} {campaign.unitOfMeasurement}
						</Typography>
						<LinearProgress
							variant='determinate'
							value={(campaign.achievedAmount / campaign.goalAmount) * 100}
						/>
						<Typography variant='body2' color='textSecondary' marginTop={1}>
							Achieved: {campaign.achievedAmount} {campaign.unitOfMeasurement} |
							Status: {campaign.goalStatus}
						</Typography>
					</Box>

					<Box marginTop={3}>
						<Typography variant='body2' color='textSecondary'>
							<strong>Start Date:</strong>{" "}
							{new Date(campaign.startDate).toLocaleDateString()}
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							<strong>End Date:</strong>{" "}
							{new Date(campaign.endDate).toLocaleDateString()}
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							<strong>Number of Ratings:</strong> {campaign.numberOfRatings}
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							<strong>Average Rating:</strong>{" "}
							{campaign.averageRatingPoint.toFixed(1)} / 5
						</Typography>
					</Box>

					<Box marginTop={3}>
						<Typography variant='body2' color='textSecondary'>
							<strong>Total Spending:</strong> {campaign.spendingAmount}{" "}
							{campaign.unitOfMeasurement}
						</Typography>
					</Box>

					{campaign.proofsUrl && (
						<Box marginTop={3}>
							<Typography variant='body2' color='textSecondary'>
								<strong>Proofs:</strong>{" "}
								<a
									href={campaign.proofsUrl}
									target='_blank'
									rel='noopener noreferrer'
								>
									View Proofs
								</a>
							</Typography>
						</Box>
					)}
				</CardContent>
			</Card>
		</Container>
	);
};

export default CampaignDetailPage;
