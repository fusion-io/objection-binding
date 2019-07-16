import moment from "moment";

export default {
    parseDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = moment(original[key]);
    },

    formatDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = original[key].toDate().getTime();
    },

    parseJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = moment(original[key]);
    },

    formatJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = original[key].toDate().toISOString();
    },
}
