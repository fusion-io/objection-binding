import moment from "moment";

export default {
    parseDatabase(json, original, key) {
        return json[key] = moment(original[key]);
    },
    formatDatabase(json, original, key) {
        return json[key] = original[key].toDate().getTime();
    },
    parseJson(json, original, key) {
        return json[key] = moment(original[key]);
    },
    formatJson(json, original, key) {
        return json[key] = original[key].toDate().toISOString();
    },
}
