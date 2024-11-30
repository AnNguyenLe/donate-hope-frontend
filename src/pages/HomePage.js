import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function HomePage() {
	const state = useSelector((state) => state.appUser);
	return <Box>{JSON.stringify(state)}</Box>;
}
