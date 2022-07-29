import axios from "axios";
export { fetchImages };

const KEY = '28904548-d9c2cfbf9827312a5dc0908e6';
const OPTIONS = '&image_type=photo&orientation=horizontal&safesearch=true'
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(query, page, per_page) {
    const response = await axios.get(`?key=${KEY}&q=${query}${OPTIONS}&page=${page}&per_page=${per_page}`);
    return response;
};
