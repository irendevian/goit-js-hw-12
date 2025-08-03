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

function handleSubmit(event) {
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

    showLoader();
    clearGallery();
    hideLoadMoreButton();
    currentQuery = userValueInput;


    getImagesByQuery(currentQuery, currentPage)
        .then(data => {
            const images = data.hits;
            const totalHits = data.totalHits;

            if (images.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight'
                });
                return;
            }

            createGallery(images);

            if (images * 15 >= totalHits) {
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight'
                });
            } else {
                showLoadMoreButton();
            }
        })
        
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: error.message,
                position: 'topRight'
            });
             
        })
        .finally(() => {
            hideLoader();
        });

}

function handleLoadMore() {
    currentPage++;
    showLoaderBottom();

    loadMore.disabled = true;

    getImagesByQuery(currentQuery, currentPage)
        .then(data => {
            createGallery(data.hits);

            if (data.hits * 15 >= totalHits) {
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight'
                });
            }
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: error.message,
                position: 'topRight'
            });
        })
        .finally(() => {
            hideLoaderBottom();
            loadMore.disabled = false;
        });
} 

