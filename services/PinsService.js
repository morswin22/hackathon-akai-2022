import axios from 'axios'

async function getPins() {
    return (await axios.get('/api/pins')).data
}

async function postNewPin(data) {
    return (await axios.post('/api/newPin', data)).data
}

const PinsService = {
    getPins,
    postNewPin,
}

export default PinsService