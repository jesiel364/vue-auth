import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)

app.use(router)
app.use(vuetify)

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

app.mount('#app')
