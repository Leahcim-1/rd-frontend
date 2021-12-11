import { createStore } from "vuex";
import jwtDecode from "jwt-decode";

export default createStore({
  state: {
    isLogin: false,
    pagination: {
      limit: 5,
      offset: 0,
      totalRecord: 100,
    },
    userInfo: {
      name: "",
      email: "",
      picture: "",
      id: "",
    }
  },
  getters: {
    loginStatus(state) { return state.isLogin },

    page(state) { 
      return (state.pagination.limit + state.pagination.offset) / state.pagination.limit
    },

    pageSize(state) {
      return state.pagination.limit
    },

    pageCount(state) {
      return Math.ceil(state.pagination.totalRecord / state.pagination.limit)
    },

    hasPrevPage(state) {
      return state.pagination.offset >= state.pagination.limit
    }
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },

    logout(state) {
      state.isLogin = false
      state.userInfo = {
        name: "",
        email: "",
        picture: "",
        id: "",
      }
    },

    parseToken(state, jwt) {
      const playload: any = jwtDecode(jwt)
      state.userInfo.email = playload!.email
      state.userInfo.id = playload!.sub
      state.userInfo.name = playload!.name
      state.userInfo.picture = playload!.picture
    },

    nextPage(state) {
      state.pagination.offset += state.pagination.limit 
    },

    prevPage(state) {
      if (state.pagination.offset >= state.pagination.limit)
        state.pagination.offset -= state.pagination.limit  
    },

    changePage(state, page) {
      state.pagination.offset = state.pagination.limit * (page - 1)
    },

    changePageSize(state, pageSize) {
      state.pagination.limit = pageSize
      state.pagination.offset = 0
    }
  },
  actions: {},
  modules: {},
});
