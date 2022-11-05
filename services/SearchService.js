import axios from 'axios'

async function getTags() {
    const URL = 'http://localhost:3000/api/tags'
    const responce = await axios.get(URL)
    return responce.data
}

const SearchService = {
    getTags,
}

export default SearchService