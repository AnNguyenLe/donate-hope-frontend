import { Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
	const pages = [
		{
			label: "Campaigns",
			path: "/campaign",
		},
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
				{pages.map((page) => (
					<Box
						sx={{
							":hover": {
								borderBottom: ".2rem solid white",
							},
						}}
					>
						<Link to={page.path}>{page.label}</Link>
					</Box>
				))}
			</Typography>
		</Toolbar>
	);
}
