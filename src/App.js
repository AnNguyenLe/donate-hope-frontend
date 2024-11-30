import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import Root from "./pages/layout/Root";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/user/RegisterPage";
import CampaignsListPage from "./pages/campaign/CampaignsListPage";
import CampaignDetailPage from "./pages/campaign/CampaignDetailPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/signin",
				element: <LoginPage />,
			},
			{
				path: "/signup",
				element: <RegisterPage />,
			},
			{
				path: "/signout",
				element: <LoginPage />,
			},
			{
				path: "/campaign/:id",
				element: <CampaignDetailPage />,
			},
			{
				path: "/campaign",
				element: <CampaignsListPage />,
			},
			{
				path: "/",
				element: <HomePage />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
