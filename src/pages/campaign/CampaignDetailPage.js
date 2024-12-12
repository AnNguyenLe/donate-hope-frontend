import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Typography } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import CampaignDetail from "../../components/campaign/CampaignDetail";
import CommentSection from "../../components/comment/CommentSection";
import DonationWidget from "../../components/widget/DonationWidget";
import RatingSection from "../../components/rating/RatingSection";
import CampaignPhotos from "../../components/campaign/CampaignPhotos";

const CampaignDetailPage = () => {
    const [campaign, setCampaign] = useState(null);
	const [proofUrls, setProofUrls] = useState([]);

    const { id } = useParams();

	const photoUrls = ["https://vinades.vn/uploads/news/2010_10/images2056852_anhtuoitre.jpg"]

    const fetchCampaignDetail = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/campaign/${id}`);
            setCampaign(response.data);

			const urls = response.data.proofsUrl
				? response.data.proofsUrl.split(",").map((url) => url.trim())
				: [];

			setProofUrls(urls);

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
            className="mt-6"
            sx={{ display: "flex", justifyContent: "space-between" }}
        >
            <Box sx={{ width: "70%" }}>
                <CampaignDetail campaign={campaign} />
				<CampaignPhotos photoUrls={proofUrls.slice(0,3)} />
                <RatingSection campaignId={id} />
                <CommentSection campaignId={id} />
            </Box>
            <Box sx={{ width: "28%" }}>
                <DonationWidget
                    unitOfMeasurement={campaign.unitOfMeasurement}
                />
            </Box>
        </Container>
    );
};

export default CampaignDetailPage;
