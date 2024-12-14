import { Toolbar, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar() {
	const appUser = useSelector((state) => state.appUser);
	const protectedPages = [
		{
			label: "Chiến dịch",
			path: "/campaign",
		},
	];
	const allowAnonymousPages = [
		{
			label: "Về chúng tôi",
			path: "/about-us",
		},
		{
			label: "Liên hệ",
			path: "/contact",
		},
	];

	const pages =
		appUser && appUser.data
			? [...protectedPages, ...allowAnonymousPages]
			: [...allowAnonymousPages];
	return (
		<Toolbar>
			<Typography
				variant='h6'
				sx={{
					fontFamily: "monospace",
					fontWeight: 500,
					color: "inherit",
					textDecoration: "none",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-around",
					width: "30rem",
				}}
			>
				{pages.map((page) => (
					<Box
						key={page.label}
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
