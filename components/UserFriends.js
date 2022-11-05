import getLocalStorage from '../hooks/getLocalStorage'

export default function UserFriends() {

    function getUserId() {
        console.log(getLocalStorage('userId', -1))
    }

    return null
}