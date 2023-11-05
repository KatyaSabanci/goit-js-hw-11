import axios from 'axios';
const API_KEY = '40075115-79ef778397691afa6e085785d';
const BASEURL = 'https://pixabay.com/api/';

async function fetchPictures(searchValue, page) {
  const { data } = await axios.get(
    `${BASEURL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safe_search=true&page=${page}&per_page=40`
  );

  const { totalHits, hits } = data;
  return { totalHits, hits };
}

export { fetchPictures };

const refs = {
  input: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  btn: document.querySelector('.load-more'),
};

export { refs };
