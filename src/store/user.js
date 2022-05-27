export default {
    state: {
        userInfo: window.localStorage.getItem('userInfo'),
        id: '',
        nickname: '',
        avatar: '',
    },
    getters: {
        id: state => state.id,
        nickname: state => state.nickname,
        avatar: state => state.avatar,
    },
    mutations: {
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        }
    }
}