import { action, computed, toJS } from 'mobx'
import authRepository from '../repositories/authRepository'

let store = null;

class Store {

    constructor(obstore) {
        this.obstore = obstore
    }

    jwt = () => localStorage.getItem('@yourapp_jwt')

    @action
    toggleTeemo = async () => {
        this.obstore.teemoVisible = !this.obstore.teemoVisible
    }

    @action
    checkAuthState = async () => {

        try{
            const jwt = this.jwt();
            if(!jwt){ return }
            const { data } = await authRepository.checkAuthState(jwt)
            this.obstore.auth = data;

        }catch({ response }){
            console.log(response)
        }

    }


    @computed
    get teemoVisible(){
        return this.obstore.teemoVisible
    }
    @computed
    get id(){
        return this.obstore.auth.id
    }
    @computed
    get name(){
        return this.obstore.auth.name
    }


}

export default function initStore(sharedStore) {
    if (store === null) {
        store = new Store(sharedStore);
        return store;
    }
    return store;
}