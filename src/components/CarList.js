import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const CarList = () => {
	const cars = useSelector((state) => state.cars.data);
	return (
		<Box>
			{cars &&
				cars.length &&
				cars.map((car) => (
					<Box key={car.id}>
						<span>{car.name}</span>
						<span>{car.cost}</span>
					</Box>
				))}
		</Box>
	);
};

export default CarList;
