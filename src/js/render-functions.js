import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loaderBottom = document.querySelector(".loader-bottom");
const loadMore = document.querySelector(".btn-load-more");


export function createGallery(images) {

    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li>
            <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" width="360"/></a>
            <div class="descr">
                <p><span>Likes</span> ${likes}</p>
                <p><span>Views</span> ${views}</p>
                <p><span>Comments</span> ${comments}</p>
                <p><span>Downloads</span> ${downloads}</p>
            </div>
        </li>
    `).join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();

}


 const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsDelay: 250,
 });


export function clearGallery() {
    gallery.innerHTML = "";
    lightbox.refresh();
}


export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}

export function showLoaderBottom() {
    loaderBottom.classList.remove("hidden");
}

export function hideLoaderBottom() {
    loaderBottom.classList.add("hidden");
}


export function showLoadMoreButton() {
    loadMore.classList.replace("hidden", "load-more-active");
}


export function hideLoadMoreButton() {
    loadMore.classList.replace("load-more-active", "hidden");
}


