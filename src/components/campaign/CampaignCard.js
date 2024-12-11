import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DonationWidget from "../widget/DonationWidget";

const BulletPoint = () => (
  <Box
    component="span"
    sx={{
      color: "#28a745",
      fontWeight: "bold",
      fontSize: "1.5rem",
      marginRight: 1,
    }}
  >
    •
  </Box>
);

export default function CampaignCard({ campaign, goToDetailPage }) {
  const progress = (campaign.achievedAmount / campaign.goalAmount) * 100;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card
      sx={{
        border: "1px solid #9AD221",
        width: 450,
        height: 600,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          onClick={() => goToDetailPage()}
          sx={{
            display: "block",
            textAlign: "center",
            cursor: "pointer",
            background: "linear-gradient(to right, #66CC00, #FFFF66)",
            padding: "0.5rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            ":hover": {
              borderBottom: ".2rem solid #9AD221",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {campaign.title || "Untitled Campaign"}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {campaign.subtitle || "No subtitle available"}
        </Typography>

        <Divider sx={{ marginBottom: 1 }} />

        <Box>
          <Typography
            variant="body1"
            color="text.secondary"
            alignItems="center"
            marginBottom={2}
          >
            <strong>Summary:</strong>{" "}
            {campaign.summary || "No description available"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            display="flex"
            alignItems="center"
            flex={1}
          >
            <BulletPoint />
            Goal:&nbsp;
            <strong>
              <Box
                component="span"
                sx={{
                  color: "#990000",
                  textTransform: "uppercase",
                }}
              >
                {campaign.unitOfMeasurement || "USD"}{" "}
                {campaign.goalAmount?.toLocaleString() || "0"}
              </Box>{" "}
            </strong>
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            <BulletPoint />
            Achieved:&nbsp;
            <strong>
              <Box
                component="span"
                sx={{
                  color: "#990000",
                  textTransform: "uppercase",
                }}
              >
                {campaign.unitOfMeasurement || "USD"}{" "}
                {campaign.achievedAmount?.toLocaleString() || "0"}
              </Box>{" "}
            </strong>
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            <BulletPoint />
            Campaign status: {campaign.campaignStatus ?? "Unknown status"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            <BulletPoint />
            Expecting Start Date:{" "}
            {campaign.expectingStartDate
              ? new Date(campaign.expectingStartDate).toLocaleDateString()
              : "Not started yet"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            <BulletPoint />
            Expecting End Date:{" "}
            {campaign.expectingEndDate
              ? new Date(campaign.expectingEndDate).toLocaleDateString()
              : "Not ended yet"}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          alignItems="center"
          marginBottom={2}
        >
          <BulletPoint />
          Average Rating: {campaign.averageRatingPoint?.toFixed(2) ?? 0.0} (
          {campaign.numberOfRatings ?? 0} ratings)
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          borderTop: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary" flex={1}>
            Progress
          </Typography>
          <Typography variant="body2" color="#990000" fontWeight="bold">
            {Math.min(progress, 100).toFixed(1)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={{
            width: "100%",
            height: 8,
            borderRadius: 4,
            background: "#E6E6E6",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#66CC00",
            },
          }}
        />
      </Box>

      {/* Buttons Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          borderTop: "1px solid #ddd",
          marginTop: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            width: "30%",
            background: "#66CC00",
            fontWeight: "bold",
          }}
          onClick={handleOpenDialog}
        >
          Donate
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={goToDetailPage}
          sx={{
            textTransform: "capitalize",
            width: "30%",
          }}
        >
          Detail
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <DonationWidget
            campaignId={campaign.id}
            unitOfMeasurement={campaign.unitOfMeasurement}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
