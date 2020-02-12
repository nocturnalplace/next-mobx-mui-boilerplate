import { observable } from 'mobx'

let store = null;

class Store {

    @observable teemoVisible = false;
    @observable auth = {
        id : "",
        email: "",
        name: "",
        mobile: ""
    }

}

export default function initStore() {
    if (store === null) {
        store = new Store();
        return store;
    }
    return store;
}