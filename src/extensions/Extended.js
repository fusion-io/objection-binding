export default () => Base => {
    return class Extended extends Base {

        /**
         * Update or Insert
         *
         * @param model
         * @return {*}
         */
        upsert(model) {
            if (model.id) {
                return this.update(model).where(model.constructor.idColumn, model.id);
            } else {
                return this.insert(model);
            }
        }

        /**
         *
         * @param model
         * @return {*}
         */
        save(model) {
            return this.upsert(model);
        }
    }
}
