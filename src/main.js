import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';
import { clearGallery } from './js/render-functions.js';
import { showLoader } from './js/render-functions.js';
import { hideLoader } from './js/render-functions.js';
import { showLoaderBottom } from './js/render-functions.js';
import { hideLoaderBottom } from './js/render-functions.js';
import { showLoadMoreButton } from './js/render-functions.js';
import { hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const input = document.querySelector("input");
const loadMore = document.querySelector(".btn-load-more");


let currentPage = 1;
let currentQuery = '';
let totalHits = 0;


form.addEventListener("submit", handleSubmit);
loadMore.addEventListener("click", handleLoadMore);


async function handleSubmit(event) {
    event.preventDefault();

    const userValueInput = input.value.toLowerCase().trim();

    if (!userValueInput) {
        iziToast.warning({
            title: 'Warning',
            message: 'Fill in the field!',
            position: 'topRight'
        });
        return;
    }

    currentPage = 1;
    showLoader();
    clearGallery();
    hideLoadMoreButton();
    currentQuery = userValueInput;

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
            const images = data.hits;
            totalHits = data.totalHits;

            if (images.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight'
                });
                return;
            }
    
            createGallery(images);

            if (currentPage * 15 >= totalHits) {
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight'
                });
            } else {
                showLoadMoreButton();
            }

    } catch (error) {
            iziToast.error({
                title: 'Error',
                message: error.message,
                position: 'topRight'
            });
             
        } finally {
            hideLoader();
        };
    
}

async function handleLoadMore() {
    currentPage++;
    showLoaderBottom();

    loadMore.disabled = true;

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);

        if (currentPage * 15 >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
        }

        const galleryCard = document.querySelector(".gallery-card");
        if (galleryCard) {
            const galleryCardHeight = galleryCard.getBoundingClientRect().height;
            window.scrollBy({
                top: galleryCardHeight * 2,
                left: 0,
                behavior: 'smooth'
            });
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: error.message,
            position: 'topRight'
        });
    } finally {
        hideLoaderBottom();
        loadMore.disabled = false;
    }
}
