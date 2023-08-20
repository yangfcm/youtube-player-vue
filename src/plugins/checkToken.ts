import type { App } from 'vue'

const checkToken = {
  install: (app: App) => {
    app.provide('token', localStorage.getItem('token'))
  },
}

export default checkToken
