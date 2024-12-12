import { Box, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AnonymousAccount() {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const registerPages = [
		{ path: "/signup", linkName: "as donator" },
		{ path: "/charity/signup", linkName: "as charity" },
	];

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
					<Link to='/signin'>Sign In</Link>
				</Box>
				<Box
					onClick={handleClick}
					sx={{
						paddingLeft: ".5rem",
						borderRadius: ".5rem",
						":hover": {
							border: ".2rem solid black",
							boxShadow: "5px 5px black",
						},
					}}
				>
					Sign Up
				</Box>
			</Typography>

			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{registerPages.map((page) => (
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
						onClick={handleClose}
					>
						<Link to={page.path}>{page.linkName}</Link>
					</MenuItem>
				))}
			</Menu>
		</Toolbar>
	);
}
