/**
 * ajax api
 */
import axios from 'axios';
import { BaseURL } from '../config'

export default Api = {
    goHome: () => {
        return axios.get(BaseURL).then(response => {
            if (response.status == 200) {
                return response.data
            } else {
                console.log('error')
            }
        }).catch(err => {
            console.log(err);
        })
    },
    getMovieByTypeAndPage: (type, pageNum) => {
        return axios.get(BaseURL + '/type/' + type + '/' + pageNum + '.html').then(response => {
            if (response.status == 200) {
                // console.log(response.data);
                return response.data
            } else {
                console.log('err');
            }
        }).catch(err => {
            console.log(err);
        })
    },
    getMovieDetails : (href) => {
        return axios.get(href).then(response => {
            if (response.status == 200) {
                // console.log(response.data);
                return response.data
            } else {
                console.log('err');
            }
        }).catch(err => {
            console.log(err);
        })
    },
    getMovieResource : (id,num) => {
        // return axios.get(BaseURL + '/play/' + id + '/1/' + num + '.html').then(response => {
        return axios.get(BaseURL + '/play/' + id + '/1/' + num + '.html').then(response => {
            if (response.status == 200) {
                // console.log(response.data);
                return response.data
            } else {
                console.log('err');
            }
        }).catch(err => {
            console.log(err);
        })
    },
}
