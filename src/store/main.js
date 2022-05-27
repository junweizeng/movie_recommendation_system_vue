export default {
    state: {
        isLogin: false,
        searchWord: '',
    },
    getters: {
        isLogin: state => state.isLogin,
        searchWord: state => state.searchWord,
    },
    mutations: {
        SET_IS_LOGIN: (state, isLogin) => {
            state.isLogin = isLogin
        },
        SET_SEARCH_WORD: (state, searchWord) => {
            state.searchWord = searchWord
        }
    }
}