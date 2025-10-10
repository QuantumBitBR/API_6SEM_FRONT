import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'; // CORREÇÃO: import correto
import Aura from '@primeuix/themes/aura';
import './main.css';
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'

// Importar componentes do PrimeVue
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
});

app.use(router)
app.use(ToastService)

// Registrar componentes globalmente
app.component('Button', Button)
app.component('Calendar', Calendar)

app.mount('#app')
