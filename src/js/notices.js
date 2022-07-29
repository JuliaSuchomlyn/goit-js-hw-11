import Notiflix from "notiflix";
export { ifNoImagesNotices, ifEndGallerryNotices, ifImagesLoadingNotices }

function ifNoImagesNotices() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

function ifEndGallerryNotices() {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
};

function ifImagesLoadingNotices(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

