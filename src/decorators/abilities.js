export const connection = () => {

};


export const hasTimestamps = () => {

};

export const paginable = () => {

};

export const taggable = () => {

};

export const embedded = () => {

};

export const referrence = () => {

};

export const searchable = () => {

};

export const type = (key, caster) => Model => {
    return class extends Model {
        static get typeCastings() {
            return [...super.typeCastings, {key, caster}];
        }
    }
};
