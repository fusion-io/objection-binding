import moment from "moment";

export default {
    parseDatabase(json, original, key) {

        if (!!original[key]) {
            return json[key];
        }

        return json[key] = moment(original[key]);
    },

    formatDatabase(json, original, key) {

        if (!!original[key]) {
            return json[key];
        }

        // Since it is not warranty that the original value is a moment() object
        // We'll try to wrap it first.
        return json[key] = moment(original[key]).toDate();
    },

    parseJson(json, original, key) {

        if (!!original[key]) {
            return json[key];
        }

        return json[key] = moment(original[key]);
    },

    formatJson(json, original, key) {

        if (!!original[key]) {
            return json[key];
        }

        return json[key] = moment(original[key]).toDate().toISOString();
    }
}
