import axios from "axios";

const MY_API_KEY = "51560534-ee0888e2507fe11f794ee77c8";

export async function getImagesByQuery(query, page = 1) {

    const res = await axios('https://pixabay.com/api/', {
        params: {
            key: MY_API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page,
            per_page: 15
        }
    })

    return res.data;
    
}

