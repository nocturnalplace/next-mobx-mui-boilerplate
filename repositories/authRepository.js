import axios from 'axios';

class AuthRepository {

    BASE_URL = 'https://yourapi.com/';

    checkAuthState(jwt) {
        return axios.get(`${this.BASE_URL}users/me`,
            { headers: { "Authorization": `Bearer ${jwt}` } })
    }
 
}

export default new AuthRepository();