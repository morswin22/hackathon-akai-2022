import axios from 'axios'

function getTags() {
    return ['sport']
    URL = 'http://localhost:3000/api/tags'
    responce = axios.get(URL)
    return responce.data
}

const SearchService = {
    getTags,
}

export default SearchService