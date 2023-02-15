import axios from 'axios';
const API_KEY = '32843259-f5703e00df468d9f6ba0105bc';
axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchPhotosByQuery = async (query, page = 1) => {
  const { data } = await axios.get(`/?q=${query}&page=${page}`);

  return data;
};
