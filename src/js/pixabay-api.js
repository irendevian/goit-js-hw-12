import axios from "axios";

const MY_API_KEY = "51560534-ee0888e2507fe11f794ee77c8";


export function getImagesByQuery(query) {

    return axios('https://pixabay.com/api/', {
        params: {
            key: MY_API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true
                
        }
    })
        .then(res =>  res.data.hits);
}

