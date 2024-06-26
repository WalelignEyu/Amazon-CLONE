import { useContext, useEffect } from "react";
import "./App.css";
import Routering from "./Router";
import { DataContext } from "./components/DataProvider/DataProvider.jsx";
import { Type } from "./Utility/Action.type.js";
import { auth } from "./Utility/Firebase.js";

function App() {
	const [{ user }, dispatch] = useContext(DataContext);
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: Type.SET_USER,
					user: authUser,
				});
			} else {
				dispatch({
					type: Type.SET_USER,
					user: null,
				});
			}
		});
	}, []);
	return (
		<>
			<Routering />
		</>
	);
}

export default App;
