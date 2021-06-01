const axios = require('axios');

class API {
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
}

export default API; 