import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API base:", API_BASE_URL);

const api = axios.create({
	baseURL: API_BASE_URL,
});

export const getComputers = async (params = {}) => {
	const response = await api.get('/api/computer/', { params });
	return {
		items: response.data.results ?? response.data,
		next: response.data.next,
		previous: response.data.previous,
		count: response.data.count,
	};
};

export const getComputerById = async (id) => {
	const response = await api.get(`/api/computer/${id}/`);
	return response.data;
};

export const createComputer = async (data) => {
	const response = await api.post('/api/computer/', data, {
		headers: { "Content-Type": "multipart/form-data" }
	});
	return response.data;
};

export const updateComputer = async (id, data) => {
	const response = await api.put(`/api/computer/${id}/`, data, {
		headers: { "Content-Type": "multipart/form-data" }
	});
	return response.data;
};

export const deleteComputer = async (id) => {
	const response = await api.delete(`/api/computer/${id}/`);
	return response.data;
};