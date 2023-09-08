import { createPinia } from 'pinia'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.$onAction(({ name, args }) => {
    if (name === 'fetchUserByToken') {
      localStorage.setItem('token', args[0])
    }
    if (name === 'signout') {
      localStorage.removeItem('token')
    }
  })
})

export default pinia
