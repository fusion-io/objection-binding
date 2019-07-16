export default ({column}) => Base => {

    return class SoftDelete extends Base {

        constructor(...args) {
            super(...args);

            this.applyTrashFilter();
        }

        /**
         * Apply the trash filter.
         */
        applyTrashFilter() {
            this.mergeContext({softDelete: true, trashFilter: true});

            this.onBuild(builder => {
                const {trashFilter} = this.context();

                if (builder.isFind()) {
                    return trashFilter ? builder.whereNull(column) : builder;
                }

                return builder;
            });
        }

        /**
         * Perform soft delete
         *
         * @return {Objection.QueryBuilderYieldingCount<QM, RM> | *}
         */
        delete() {
            return this.patch({[column]: new Date()});
        }

        /**
         * Restore the deleted model
         *
         * @return {Objection.QueryBuilderYieldingCount<QM, RM> | *}
         */
        restore() {
            return this.patch({[column]: null});
        }

        /**
         * Destroy the models (hard delete)
         *
         * @return {Objection.QueryBuilderYieldingCount<QM, RM>|*|Knex.QueryBuilder<TRecord, DeferredIndex.Augment<UnwrapArrayMember<TResult>, TRecord, StrKey<TRecord>>[]>|Knex.QueryBuilder<TRecord, DeferredKeySelection.Augment<UnwrapArrayMember<TResult>, TRecord, StrKey<TRecord>>[]>|Knex.QueryBuilder<TRecord, any>|Knex.QueryBuilder<TRecord, number>|Objection.QueryBuilderYieldingCount<QM, RM>|boolean|Promise<boolean>|void|IDBRequest}
         */
        destroy() {
            return super.delete();
        }

        /**
         * Search for models that is soft deleted
         *
         * @return {Knex.QueryBuilder<TRecord, TResult> | Objection.QueryBuilder<QM, RM, RV>}
         */
        inTrash() {
            this.mergeContext({trashFilter: false});

            return this.whereNotNull(column);
        }

        /**
         * Search for models even it is soft deleted
         *
         * @return {SoftDelete}
         */
        includeTrash() {
            return this.mergeContext({trashFilter: false});
        }
    }
}
