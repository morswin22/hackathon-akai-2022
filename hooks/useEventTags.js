import SearchService from '../services/SearchService'
import { useQuery } from '@tanstack/react-query'

export default function useEventTags(){
    return useQuery(['getEventTags'], () => SearchService.getTags())
}