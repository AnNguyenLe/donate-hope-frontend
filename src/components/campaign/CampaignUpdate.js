import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";

export default function CampaignUpdate({ campaign, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [updatedCampaign, setUpdatedCampaign] = useState({ ...campaign });
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const mergedCampaign = { ...campaign, ...updatedCampaign };
      const response = await axiosInstance.put(
        `/campaign/${campaign.id}`,
        mergedCampaign
      );
      alert("Campaign updated successfully!");
      onUpdate(response.data);
      navigate(`/campaign/${campaign.id}`);
      handleClose();
    } catch (error) {
      console.error("Error updating campaign:", error);
      alert("Failed to update campaign.");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginTop: 2 }}
      >
        Update Campaign
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle
          variant="h5"
          sx={{ fontWeight: "bold", color: "primary.main" }}
          gutterBottom
        >
          Update Campaign
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={updatedCampaign.title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Subtitle"
            name="subtitle"
            value={updatedCampaign.subtitle}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mô tả"
            name="description"
            value={updatedCampaign.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mục tiêu quyên góp"
            name="goalAmount"
            type="number"
            value={updatedCampaign.goalAmount}
            onChange={handleInputChange}
            margin="normal"
          />
          <Box
            sx={{
              display: "flex",
              marginTop: 2,
              justifyContent: "space-between",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expected start date"
                value={
                  updatedCampaign.expectingStartDate
                    ? dayjs(updatedCampaign.expectingStartDate)
                    : null
                }
                onChange={(newValue) => {
                  setUpdatedCampaign((prev) => ({
                    ...prev,
                    expectingStartDate: newValue
                      ? dayjs(newValue).format("YYYY-MM-DD")
                      : null,
                  }));
                }}
                format="DD/MM/YYYY"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={!updatedCampaign.expectingStartDate}
                    helperText={
                      !updatedCampaign.expectingStartDate
                        ? "Start date is required"
                        : ""
                    }
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expected end date"
                value={
                  updatedCampaign.expectingEndDate
                    ? dayjs(updatedCampaign.expectingEndDate)
                    : null
                }
                onChange={(newValue) => {
                  setUpdatedCampaign((prev) => ({
                    ...prev,
                    expectingEndDate: newValue
                      ? dayjs(newValue).format("YYYY-MM-DD")
                      : null,
                  }));
                }}
                format="DD/MM/YYYY"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={!updatedCampaign.expectingStartDate}
                    helperText={
                      !updatedCampaign.expectingStartDate
                        ? "End date is required"
                        : ""
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <TextField
            fullWidth
            label="Tổng chi tiêu"
            name="spendingAmount"
            value={updatedCampaign.spendingAmount}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Link hình ảnh chiến dịch"
            name="proofsUrl"
            value={updatedCampaign.proofsUrl.split(",").join("\n")}
            multiline
            rows={5}
            onChange={(e) =>
              setUpdatedCampaign((prev) => ({
                ...prev,
                proofsUrl: e.target.value.split("\n").join(","),
              }))
            }
            margin="normal"
            helperText="Enter each URL on a new line. These will be saved as a comma-separated list."
          />
          <FormControlLabel
            control={
              <Switch
                checked={updatedCampaign.isPublished}
                onChange={(e) =>
                  setUpdatedCampaign((prev) => ({
                    ...prev,
                    isPublished: e.target.checked,
                  }))
                }
              />
            }
            label="Is Published"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
