import React from "react";
import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";

const CampaignPhotos = ({ photoUrls }) => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        {/* <Typography variant="h6" gutterBottom>
          Campaign Photos
        </Typography> */}
        <ImageList cols={3} gap={8}>
          {photoUrls.map((photoUrl, index) => (
            <ImageListItem key={index}>
              <img
                src={photoUrl}
                alt={`Campaign Photo ${index + 1}`}
                loading="lazy"
                style={{ borderRadius: "8px" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

export default CampaignPhotos;