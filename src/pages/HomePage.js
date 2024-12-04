import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import CampaignCard from "./campaign/CampaignCard";
import { useSelector } from "react-redux";

export default function HomePage() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  const token = useSelector((state) => state.appUser?.data?.accessToken);

  useEffect(() => {
    if (token) {
      const fetchCampaigns = async () => {
        try {
          const response = await axiosInstance.get("/campaign");
          setCampaigns(response.data.slice(0, 3));
        } catch (error) {
          console.error("Error fetching campaigns:", error);
        }
      };

      fetchCampaigns();
    } else {
      console.log("Token is not available yet.");
    }
  }, [token]);

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          backgroundImage: 'url("/hinh-thien-tai.jpg")',
          backgroundSize: "cover", // Ensures the image covers the entire box
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repeating the image
          color: "white",
          py: 8,
        }}
      >
        {/* Title and Description */}
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Donate Hope
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          For Our Compatriots
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "white",
            color: "#990000",
            "&:hover": { bgcolor: "#ddd" },
          }}
          component={Link}
          to="/campaign"
        >
          Explore Campaigns
        </Button>
      </Box>

      {/* About Section */}
      <Box sx={{ px: 3, py: 6, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Về Donate Hope
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#555", maxWidth: "800px", mx: "auto" }}
        >
          Donate Hope - For our compatriots là ứng dụng web phi lợi nhuận được
          thiết kế để hỗ trợ việc quyên góp từ thiện cho các nạn nhân bị ảnh
          hưởng bởi thiên tai với mục tiêu đảm bảo tính công khai, minh bạch và
          hiệu quả trong quản lý quyên góp và phân phối tài trợ.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ px: 3, py: 6, bgcolor: "#fff" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
        >
          Tính Năng Nổi Bật
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          {[
            {
              title: "Minh bạch",
              description: "Đảm bảo sự minh bạch trong quản lý quyên góp.",
            },
            {
              title: "Hiệu quả",
              description: "Quản lý phân phối tài trợ hiệu quả.",
            },
            {
              title: "Dễ sử dụng",
              description: "Giao diện thân thiện và dễ tiếp cận.",
            },
          ].map((feature, index) => (
            <Grid2 item xs={12} sm={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Campaigns Section */}
      <Box sx={{ px: 3, py: 6, textAlign: "center", bgcolor: "#f1f1f1" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Các Chiến Dịch Nổi Bật
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          {campaigns.map((campaign) => (
            <Grid2 item xs={12} sm={4} key={campaign.id}>
              <CampaignCard
                campaign={campaign}
                goToDetailPage={() => navigate(`/campaign/${campaign.id}`)}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#333", color: "white", py: 3, textAlign: "center" }}>
        <Typography variant="body2">
          © 2024 Donate Hope. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
