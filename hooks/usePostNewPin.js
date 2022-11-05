import {useMutation} from '@tanstack/react-query'
import PinsService from '../services/PinsService'

export default function usePostNewPin() {
    return useMutation((data) => PinsService.postNewPin(data))
}