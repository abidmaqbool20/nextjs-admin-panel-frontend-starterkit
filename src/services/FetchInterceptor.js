import axios from 'axios';
import { API_BASE_URL } from '../configs/AppConfig';
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {logoutUser} from "@/slices/userSlice";
// import { signOutSuccess } from 'store/slices/authSlice';
// import store from '../store';
import { AUTH_TOKEN, TOKEN_PAYLOAD_KEY } from "@/constants/index";
import {extractErrorMessage} from "@/helpers/shared";

const unauthorizedCode = [400, 401, 403];
const service = axios.create({
	baseURL: API_BASE_URL,
	timeout: 60000
});


// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;
	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`
	}
	return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
	Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use((response) => {

	if (response?.data.success && response.data.message) {
		toast.success( response.data.message);
	}

	if (response?.data.warning && response.data.message) {
		toast.warning( response.data.message);
	}

	return response.data
}, (error) => {
	let notificationParam = {
		message: ''
	}

	// Remove token and redirect
	if (unauthorizedCode.includes(error.response.status)) {
		notificationParam.message = 'Authentication Fail'
		// notificationParam.description = 'Please login again'
		localStorage.clear();
		logoutUser();
		redirect("/login");
		// store.dispatch(signOutSuccess())
	}
	if (error) {
		notificationParam.message = extractErrorMessage(error)
	}

	if (error.response.status !== 422) {
		toast.error(notificationParam);
	}
	return Promise.reject(error);

});

export default service;
