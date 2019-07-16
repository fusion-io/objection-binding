export default ({column}) => Base => {
    return class SoftDelete extends Base {
        delete() {
            this.mergeContext({softDelete: column});

            return this.patch({[column]: new Date()});
        }

        restore() {
            this.mergeContext({softDeleteRestore: column});

            return this.patch({[column]: null});
        }

        destroy() {
            return super.delete();
        }

        inTrash() {
            return this.whereNotNull(`${this.modelClass().tableName}.${column}`);
        }

        includeTrash() {

        }
    }
}
