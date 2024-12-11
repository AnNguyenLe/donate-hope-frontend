import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Typography } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import CampaignDetail from "../../components/campaign/CampaignDetail";
import CommentSection from "../../components/comment/CommentSection";
import DonationWidget from "../../components/widget/DonationWidget";

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
		<Container
			maxWidth={false}
			className='mt-6'
			sx={{ display: "flex", justifyContent: "space-between" }}
		>
			<Box sx={{ width: "70%" }}>
				<CampaignDetail campaign={campaign} />
				<CommentSection campaignId={id} />
			</Box>
			<Box sx={{ width: "28%" }}>
				<DonationWidget campaignId={id} unitOfMeasurement={campaign.unitOfMeasurement} />
			</Box>
		</Container>
	);
};

export default CampaignDetailPage;
