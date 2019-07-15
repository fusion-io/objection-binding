import {Model as BaseModel} from "objection";
import pluralize from "pluralize";
import snakeCase from "lodash.snakecase";

export default class Model extends BaseModel {

    static get tableName() {
        return snakeCase(pluralize(this.name));
    }

    static get $typeCastings() {
        return [];
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);

        let willBeParsedJson = Object.assign({}, json);

        willBeParsedJson.$original = json;

        this.constructor
            .$typeCastings
            .forEach(({key, caster}) => willBeParsedJson[key] = caster.parseDatabase(json, key))
        ;

        return willBeParsedJson;
    }
}
