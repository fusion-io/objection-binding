import Money from "dinero.js";

export default {
    parseDatabase(json, original, key) {

        if (original[key + '_amount'] === null || original[key + '_amount'] === undefined) {
            return json[key] = null;
        }

        const amount    = original[key + '_amount'];
        const precision = original[key + '_precision'];
        const currency  = original[key + '_currency'];

        json[key] = Money({amount, precision, currency});
    },

    formatDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return delete json[key];
        }

        const money = original[key];

        json[key + '_amount']    = money.getAmount();
        json[key + '_precision'] = money.getPrecision();
        json[key + '_currency']  = money.getCurrency();

        delete json[key];
    },

    parseJson(json, original, key) {
        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        if ('number' === typeof original[key]) {
            return json[key] = Money({amount: original[key]});
        }

        const { amount, precision, currency } = original[key];

        json[key] = Money({amount, precision, currency});
    },

    formatJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        json[key] = original[key].toObject();
    },
}
