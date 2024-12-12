import { AppBar, Toolbar, Typography } from "@mui/material";
import { FaHeart } from "react-icons/fa6";
import NavBar from "./NavBar";
import UserAccount from "./UserAccount";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PageHeader() {
	const navigate = useNavigate();
	const appUser = useSelector((state) => state.appUser);

	return (
		<AppBar sx={{ position: "static", backgroundColor: "#6DE219" }}>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography
					variant='h5'
					sx={{
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".1rem",
						color: "inherit",
						textDecoration: "none",
						display: "flex",
						flexDirection: "row",
					}}
				>
					<div
						onClick={() => {
							navigate("/");
						}}
						style={{
							width: "250px",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-evenly",
							cursor: "pointer",
						}}
					>
						<FaHeart />
						<span>Donate Hope</span>
					</div>
					{appUser && appUser.data && <NavBar />}
				</Typography>
				<UserAccount />
			</Toolbar>
		</AppBar>
	);
}
