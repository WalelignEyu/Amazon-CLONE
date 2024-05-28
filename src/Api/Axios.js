import axios from 'axios'

const axiosInstance = axios.create({
	//local instance of firebase functions
	// baseURL: "http://127.0.0.1:5001/clone-b033a/us-central1/api",
	baseURL: "http://localhost:5001",

	// deployed version of firebase function
	// baseURL: "https://api-rfuhblh3ka-uc.a.run.app/",
	// deployed version of amazon server on render.com
	// baseURL: "https://amazon-api-deploy-mn4t.onrender.com/",
});

export { axiosInstance };