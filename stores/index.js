import { useStaticRendering } from 'mobx-react';
import initObservableStore from './obstore';
import initAuthStore from './authstore';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

class Store {

    constructor() {

        // this approach is for avoiding circular structure error when applying Mobx rootstore pattern in SSR. 
        // all observable variables live in the observableStore, other stores providing only the view layers of the observable data.
        const obstore = initObservableStore();
        this.AuthStore = initAuthStore(obstore);
    }

}

export default function initStore() {
    if (store === null) {
        store = new Store();
        return store;
    }
    return store;
}