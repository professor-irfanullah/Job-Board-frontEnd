// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
// import router from './router/router'
import './style.css'

// rotuer
import router from './router/router'
// Import FontAwesome library and icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faCoffee, faSearch, faCheckCircle, faTimesCircle, faEdit, faPlus, faMagnifyingGlass, faBars, faXmark, faBell, faCode } from '@fortawesome/free-solid-svg-icons'

// Import the FontAwesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(faUser, faCoffee, faSearch, faCheckCircle, faTimesCircle, faEdit, faPlus, faMagnifyingGlass, faBars, faXmark, faBell, faCode)

const app = createApp(App)

app.use(router)
// Register FontAwesome globally
app.component('f-a-c', FontAwesomeIcon)

app.mount('#app')
