import {Model as BaseModel} from "objection";
import pluralize from "pluralize";
import snakeCase from "lodash.snakecase";
import Extended from "./extensions/Extended";

export default class Model extends BaseModel {

    static get tableName() {
        return snakeCase(pluralize(this.name));
    }

    static get queryBuilderExtensions() {
        return [
            Extended()
        ]
    }

    static get QueryBuilder() {
        return this
            .queryBuilderExtensions
            .reduce(
                (ExtendQueryBuilder, extension) => extension(ExtendQueryBuilder),
                BaseModel.QueryBuilder
            );
    }

    static get typeCastings() {
        return [
            // { key, caster }
        ];
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);

        let willBeParsedJson = Object.assign({}, json);

        this.constructor
            .typeCastings
            .forEach(({key, caster}) => {

                // Only apply casting when we have the key
                if (json[key] !== undefined) {
                    caster.parseDatabase(willBeParsedJson, json, key)
                }
            })
        ;

        willBeParsedJson.$original = json;

        return willBeParsedJson;
    }

    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);

        let willBeFormatted = Object.assign({}, json);

        this.constructor
            .typeCastings
            .forEach(({key, caster}) => {
                if (json[key] !== undefined) {
                    caster.formatDatabase(willBeFormatted, json, key);
                }
            })
        ;

        return willBeFormatted;
    }

    $parseJson(json, opt) {
        json = super.$parseJson(json, opt);

        let willBeParsedJson = Object.assign({}, json);

        this.constructor
            .typeCastings
            .forEach(({key, caster}) => {
                if (json[key] !== undefined) {
                    caster.parseJson(willBeParsedJson, json, key)
                }
            })
        ;

        return willBeParsedJson;
    }

    $formatJson(json) {
        json = super.$formatDatabaseJson(json);

        let willBeFormatted = Object.assign({}, json);

        this.constructor
            .typeCastings
            .forEach(({key, caster}) => {
                if (json[key] !== undefined) {
                    caster.formatJson(willBeFormatted, json, key)
                }
            })
        ;

        return willBeFormatted;
    }
}
