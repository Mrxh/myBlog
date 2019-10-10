import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_LOADING = 'SET_LOADING'

const store = ()=>new Vuex.Store({
  //全局文章数据管理
  state:{
    loading:true
  },
  mutations:{
    [SET_LOADING](state){
      state.loading = false
    }
  },
  actions:{
    setloading:({commit,state})=>{
      commit('SET_LOADING')
    }
  }
})

export default store
