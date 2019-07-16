export const type = (key, caster) => Model => {
    return class extends Model {
        static get typeCastings() {
            return [...super.typeCastings, {key, caster}];
        }
    }
};
