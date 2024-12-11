import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DonationWidget = ({ campaignId, unitOfMeasurement }) => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [donating, setDonating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDonation = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }
    setDonating(true);
    setError("");

    navigate(`/campaign/${campaignId}/contribute`, {
      state: { amount, name, message, unitOfMeasurement, campaignId },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "primary.main" }}
          gutterBottom
        >
          Make a Donation
        </Typography>
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={`Donation Amount (${unitOfMeasurement.toUpperCase()})`}
          variant="outlined"
          fullWidth
          margin="normal"
          textTransform="uppercase"
          value={amount.toLocaleString()}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            const numericValue = Number(rawValue);
            if (!isNaN(numericValue)) {
              setAmount(numericValue);
            }
          }}
          type="text"
        />
        <TextField
          label="Message (optional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={3}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleDonation}
          disabled={donating}
        >
          {donating ? "Processing..." : "Donate Now"}
        </Button>
      </Box>
    </Container>
  );
};

export default DonationWidget;
