import { refs } from './partials/api';
import { renderPicture, clearResults } from './partials/render';
import { fetchPictures } from './partials/api';
import Notiflix from 'notiflix';
import axios from 'axios';
refs.input.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onLoadMore);
let searchQuery = '';
let currentPage = 1;
async function onLoadMore() {
  currentPage += 1;
  try {
    const { hits, totalHits } = await fetchPictures(searchQuery, currentPage);
    renderPicture(hits);
    if (totalHits < 40) {
      hideButton();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    showButton();
  } catch (error) {
    Notiflix.Notify.warning(`Warning!${error.message}`);
  }
}
async function onSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  clearResults();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    return Notiflix.Notify.info(
      'Please, enter the information you are looking for.'
    );
  }

  try {
    const { hits, totalHits } = await fetchPictures(searchQuery, currentPage);
    Notiflix.Notify.info(`Hooray! We've found ${totalHits} images.`);
    if (totalHits === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderPicture(hits);
    if (totalHits < 40) {
      hideButton();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else showButton();
  } catch (error) {
    Notiflix.Notify.warning(`Warning!${error.message}`);
  }
}
function showButton() {
  refs.btn.classList.remove('is-hidden');
}
function hideButton() {
  refs.btn.classList.add('is-hidden');
}
