import { Box, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../store";

export default function SignedInAccount({ appUser }) {
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSignOut = () => {
		onSignOut();
		handleClose();
	};

	const onSignOut = () => {
		axiosInstance.get("/account/logout");
		localStorage.removeItem("appUser");
		dispatch(signOutUser);
		window.location.reload();
	};

	return (
		<Toolbar>
			<Typography
				variant='h6'
				sx={{
					fontFamily: "monospace",
					fontWeight: 500,
					letterSpacing: ".1rem",
					color: "inherit",
					textDecoration: "none",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Box
					onClick={handleClick}
					sx={{
						backgroundColor: "white",
						color: "#6DE219",
						borderRadius: ".5rem",
						paddingRight: ".5rem",
						paddingLeft: ".5rem",
						":hover": {
							border: ".2rem solid black",
							boxShadow: "5px 5px black",
						},
					}}
				>
					Hi, {`${appUser.firstName} ${appUser.lastName}`}
				</Box>
			</Typography>

			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem
					sx={{
						fontFamily: "monospace",
						fontWeight: "bold",
						textAlign: "center",
						width: "12rem",
						letterSpacing: ".1rem",
						backgroundColor: "white",
						color: "green",
						display: "flex",
						justifyContent: "center",
						":hover": {
							backgroundColor: "black",
							color: "white",
						},
					}}
					onClick={handleSignOut}
				>
					Sign Out
				</MenuItem>
			</Menu>
		</Toolbar>
	);
}
