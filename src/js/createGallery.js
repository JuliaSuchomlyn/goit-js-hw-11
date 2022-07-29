export { createGallery };

const gallery = document.querySelector('.gallery');

function createGallery(images) {
    const createImages = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        const markup =
                `<a class="gallery__link" href="${largeImageURL}">
                    <div class="gallery__item">
                        <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                        <div class="gallery__info">
                            <p class="info-item"><b>Likes</b>${likes}</p>
                            <p class="info-item"><b>Views</b>${views}</p>
                            <p class="info-item"><b>Comments</b>${comments}</p>
                            <p class="info-item"><b>Downloads</b>${downloads}</p>
                        </div>
                    </div>
                </a>`;
        return markup;
    })
        .join('');
    
    gallery.insertAdjacentHTML('beforeend', createImages)
};

