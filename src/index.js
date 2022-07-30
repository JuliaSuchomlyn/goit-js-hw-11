import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


import { fetchImages } from './js/fetchImages';
import { createGallery } from './js/createGallery';
import { ifNoImagesNotices, ifEndGallerryNotices, ifImagesLoadingNotices } from './js/notices'
import { onScroll, onToTopBtn } from './js/onScroll'

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');

let simpleLightBox;
let query = '';
let page = 1;
const perPage = 40;

searchForm.addEventListener('submit', onSearchButtonForm)
loadMoreButton.addEventListener('click', createNextPage);

onScroll();
onToTopBtn();

function onSearchButtonForm(e) {
    e.preventDefault();
    window.scrollTo({ top: 0 });
    page = 1;
    query = e.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    loadMoreButton.classList.add('visualy-hidden');

    if (query === '') { 
        ifNoImagesNotices();
        return;
    }
    fetchImages(query, page, perPage)
    .then(({ data }) => {
        createGallery(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250}).refresh();

        ifImagesLoadingNotices(data)
            if (data.totalHits > perPage) {
                loadMoreButton.classList.remove('visualy-hidden');
            }
    })
        .catch(error => console.log(error))
        .finally(() => {
      searchForm.reset();
    });
}


function createNextPage() {
    page += 1;
    simpleLightBox.destroy();

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            createGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250}).refresh();

            const totalPages = Math.ceil(data.totalHits / perPage);

            if (page > totalPages) {
                loadMoreButton.classList.add('visualy-hidden');
                ifEndGallerryNotices();
            }
    })
        .catch(error => console.log(error))
        .finally(() => {
        searchForm.reset();
    });
}