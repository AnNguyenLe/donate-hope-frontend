import { Container, Typography, Box, LinearProgress } from "@mui/material";
export default function CampaignDetail({ campaign }) {
    return (
        <Container maxWidth="lg" className="mt-6">
            <Typography variant="h4" gutterBottom>
                {campaign.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                {campaign.subtitle}
            </Typography>

            <Typography variant="body1">{campaign.description}</Typography>

            <Box marginTop={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Goal: {campaign.goalAmount} {campaign.unitOfMeasurement}
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={
                        (campaign.achievedAmount / campaign.goalAmount) * 100
                    }
                />
                <Typography variant="body2" color="textSecondary" marginTop={1}>
                    Achieved: {campaign.achievedAmount}{" "}
                    {campaign.unitOfMeasurement} | Status: {campaign.goalStatus}
                </Typography>
            </Box>

            <Box marginTop={3}>
                <Typography variant="body2" color="textSecondary">
                    <strong>Expecting Start Date:</strong>{" "}
                    {new Date(campaign.expectingStartDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Expecting End Date:</strong>{" "}
                    {new Date(campaign.expectingEndDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Number of Ratings:</strong>{" "}
                    {campaign.numberOfRatings}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Average Rating:</strong>{" "}
                    {campaign.averageRatingPoint.toFixed(1)} / 5
                </Typography>
            </Box>

            <Box marginTop={3}>
                <Typography variant="body2" color="textSecondary">
                    <strong>Total Spending:</strong> {campaign.spendingAmount}{" "}
                    {campaign.unitOfMeasurement}
                </Typography>
            </Box>

            {campaign.proofsUrl && (
                <Box marginTop={3}>
                    <Typography variant="body2" color="textSecondary">
                        <strong>Proofs:</strong>{" "}
                        <a
                            href={campaign.proofsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Proofs
                        </a>
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
