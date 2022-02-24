import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/stocks/${id}`);
export const fetchPosts = (page) => API.get(`/stocks?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/stocks/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/stocks', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/stocks/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/stocks/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchUsers = () => API.get('/user');
export const deleteUser = (id) => API.delete(`/users/${id}`);