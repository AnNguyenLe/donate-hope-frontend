import React, { useCallback, useEffect, useState } from "react";
import {
	TextField,
	Button,
	Avatar,
	Typography,
	Box,
	List,
	ListItem,
	Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { useForm } from "react-hook-form";

const CommentSection = ({ campaignId }) => {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	const fetchComments = useCallback(async () => {
		try {
			const response = await axiosInstance.get(
				`/campaign-comment/${campaignId}`
			);
			setComments(response.data);
		} catch (error) {
			console.error("Error fetching comments:", error);
		}
	}, [campaignId]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	const appUser = useSelector((state) => state.appUser.data);

	const { register, handleSubmit } = useForm();

	const onPostComment = ({ content }) => {
		if (content.trim()) {
			const contentObj = {
				id: comments.length + 1,
				user: appUser.displayName,
				text: content,
			};
			setComments([contentObj, ...comments]);
			axiosInstance.post("/campaign-comment/create", {
				campaignId,
				content,
			});
		}
	};

	return (
		<Box sx={{ width: "95%", marginTop: "4rem" }}>
			<form onSubmit={handleSubmit(onPostComment)}>
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<Avatar sx={{ width: 40, height: 40, mr: 2 }}>
						{appUser.firstName.charAt(0)}
					</Avatar>
					<TextField
						fullWidth
						label='Add a comment'
						variant='outlined'
						value={newComment}
						sx={{ marginRight: 1 }}
						multiline
						{...register("content", {
							onChange: (event) => setNewComment(event.target.value),
						})}
					/>
					<Button
						variant='contained'
						color='primary'
						onClick={handleSubmit(onPostComment)}
						disabled={!newComment.trim()}
					>
						Post
					</Button>
				</Box>
			</form>

			<Divider />

			<List sx={{ mt: 2 }}>
				{comments.length === 0 && "Hãy là người đầu tiên bình luận!"}
				{comments.length !== 0 &&
					comments.map((comment) => (
						<ListItem key={comment.id} sx={{ py: 1 }}>
							<Avatar sx={{ width: 40, height: 40, mr: 2 }}>
								{comment.user[0]}
							</Avatar>
							<Box sx={{ width: "100%" }}>
								<Typography variant='subtitle2' sx={{ fontWeight: "bold" }}>
									{comment.user}
								</Typography>
								<Typography variant='body2' sx={{ mb: 1 }}>
									{`${comment.text}`}
								</Typography>
							</Box>
						</ListItem>
					))}
			</List>
		</Box>
	);
};

export default CommentSection;
