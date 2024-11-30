import { Box, Toolbar, Typography } from "@mui/material";

export default function SignedInAccount({ appUser }) {
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
					Hi, {`${appUser.firstName} ${appUser.lastName}`}
				</Box>
			</Typography>
		</Toolbar>
	);
}
