import { Box, Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCar, changeCost, changeName } from "../store";

const CarForm = () => {
	const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();
	const onSubmit = (data) => {
		dispatch(changeName(data.name));
		dispatch(changeCost(parseInt(data.cost) ?? 0));
		dispatch(addCar(data));
		reset();
	};
	return (
		<Box>
			<h4>Add car</h4>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<Box>
						<label>Name</label>
						<Input {...register("name")} />
					</Box>
					<Box>
						<label>Cost</label>
						<Input type='number' {...register("cost")} />
					</Box>
				</Box>
				<Button type='submit'>Submit</Button>
			</form>
		</Box>
	);
};

export default CarForm;
