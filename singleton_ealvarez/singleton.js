// singleton_EAlvarez/singleton.js
import * as Storage from '../js/storage.js';

class StorageManager {
    constructor() {
        if (StorageManager.instance) {
            return StorageManager.instance;
        }
        StorageManager.instance = this;
    }

    obtenerPrendas() {
        return Storage.obtenerPrendas();
    }

    guardarPrenda(prenda) {
        Storage.guardarPrenda(prenda);
    }

    eliminarPrenda(id) {
        Storage.eliminarPrenda(id);
    }
}

const instance = new StorageManager();
Object.freeze(instance);
export default instance;
