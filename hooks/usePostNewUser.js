import {useMutation} from '@tanstack/react-query'
import axios from 'axios'

export default function usePostNewUser() {
    return useMutation((newUser) => axios.post('/api/newUser', newUser))
}