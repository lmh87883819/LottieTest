/**
 * ajax api
 */
import axios from 'axios';
import { BaseURL } from '../config'

export default Api = {
    goHome: () => {
        return axios.get(BaseURL).then(function (response) {
            if (response.status == 200) {
                return response.data
            } else {
                console.log('error')
            }
        }).catch(err => {
            console.log(err);
        })
    },
}
