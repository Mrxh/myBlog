import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'

let loadingInstance = null;

let service = axios.create({
    baseURL:`http://${process.env.HOST||'localhost'}:${process.env.POST||3000}`,
    timeout: 5000
})

//@请求拦截器
service.interceptors.request.use(
    config => {
        loadingInstance = Loading.service({
          target: '.el-container',
          fullscreen: false,
          background: 'rgba(0, 0, 0, 0.7)'
        })
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

//@相应拦截器
service.interceptors.response.use(
    async response => {
        //应用层只需要数据data
          let {data} = response
          loadingInstance.close()
          return data
    }
)

Vue.prototype.$http = service

export const http = service
