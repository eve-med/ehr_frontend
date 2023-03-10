import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/axios'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faGrip, faList, faClipboardList, faLayerGroup, faXmark, faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

library.add(faGrip, faList, faClipboardList, faLayerGroup, faXmark, faCheck, faChevronDown, faChevronUp)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
