const axios = require('axios');

class API {

    //Rankings methods
    static uploadRankings(listName, formData, listType) {
        return axios({
            method: 'POST',
            url: `/api/upload/rankings?name=${listName}&type=${listType}`,
            data: formData
        });
    }

    static getRankings() {
        return axios({
            method: 'GET',
            url: `/api/rankings`
        });
    }

    static getRankingsDetail(listId) {
        return axios({
            method: 'GET',
            url: `/api/rankings/` + listId
        });
    }

    //Draft methods
    static getDraftDetail(externalId) {
        return axios({
            method: 'GET',
            url: `/api/draft?external_id=` + externalId
        });
    }

    static getActiveDraft() {
        //TODO: constrain by user id in session
        return axios({
            method: 'GET',
            url: '/api/draft?active=Y'
        });
    }
}

export default API; 