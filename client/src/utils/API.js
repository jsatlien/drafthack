const axios = require('axios');

class API {

    //Rankings methods
    //TODO: I think list type may be deprecated (name can cover things like rookie vs startup)
    static uploadRankings(listName, formData, listType) {
        return axios({
            method: 'POST',
            url: `/api/upload/rankings?name=${listName}&type=${listType}`,
            data: formData
        });
    }

    static uploadTiers(listName, formData) {
        return axios({
            method: 'POST',
            url: `/api/upload/tiers?name=${listName}`,
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

    static endDraft(externalId) {
        //TODO: constrain by user id in session
        return axios({
            method: 'PUT',
            url: '/api/draft/deactivate/' + externalId
        });
    }


    //TODO: refactor for multiple league types
    static checkSleeperDraftStatus(draftId) {
        return axios({
            method: 'GET',
            url: 'https://api.sleeper.app/v1/draft/' + draftId
        });
    }
}

export default API; 