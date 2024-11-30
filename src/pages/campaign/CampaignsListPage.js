import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../../hooks/useThunk";
import { fetchCampaigns } from "../../store/thunks/campaigns/fetchCampaigns";
import { Skeleton, Container, Grid2 } from "@mui/material";
import CampaignCard from "./CampaignCard";
import { useNavigate } from "react-router-dom";

export default function CampaignsListPage() {
	const [doFetchCampaigns, isLoadingCampaigns, loadingCampaignsError] =
		useThunk(fetchCampaigns);

	useEffect(() => {
		doFetchCampaigns();
	}, [doFetchCampaigns]);

	const campaigns = useSelector((state) => state.campaigns);

	const navigate = useNavigate();

	let content;
	if (isLoadingCampaigns) {
		content = <Skeleton variant='wave' />;
	} else if (loadingCampaignsError) {
		content = <div>Error fetching data...</div>;
	} else if (campaigns.data?.length) {
		content = (
			<Container maxWidth='xl' sx={{ marginTop: "3rem" }}>
				<Grid2 container spacing={2}>
					{campaigns.data.map((campaign) => (
						<Grid2 item xs={12} sm={6} md={3} key={campaign.Id}>
							<CampaignCard
								campaign={campaign}
								goToDetailPage={() => {
									navigate(`/campaign/${campaign.id}`);
								}}
							/>
						</Grid2>
					))}
				</Grid2>
			</Container>
		);
	} else {
		content = <div>No campaigns available.</div>;
	}

	return content;
}
