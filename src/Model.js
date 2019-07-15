import {Model as BaseModel} from "objection";
import pluralize from "pluralize";
import snakeCase from "lodash.snakecase";

export default class Model extends BaseModel {

    static get tableName() {
        return snakeCase(pluralize(this.name));
    }
}
