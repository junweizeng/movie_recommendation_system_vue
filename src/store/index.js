import {createStore} from 'vuex'
import user from "@/store/user";
import main from "@/store/main";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        main
    }
})
