<template>
  <div class="login-form">
    <h2>Login</h2>
    <InputGroup class="inputs">
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText v-model="username" placeholder="Username" size="small" @keyup.enter="login" />
    </InputGroup>

    <InputGroup class="inputs">
      <InputGroupAddon>
        <i class="pi pi-key"></i>
      </InputGroupAddon>
      <InputText v-model="password" placeholder="Password" type="password" size="small" @keyup.enter="login" />
    </InputGroup>
    <Button id="login-button" label="Entrar" raised aria-label="undefined" icon="pi pi-sign-in" @click="login()"
      :loading="isloading" />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import { LoginDataService } from '@/services/LoginDataService';
import { useRouter } from 'vue-router';
import router from '@/router';
import { showToast } from '@/eventBus';

export default defineComponent({
  name: 'LoginForm',
  components: {
    Button,
    InputText,
    InputGroup,
    InputGroupAddon
  },
  data() {
    return {
      username: '',
      password: '',
      router: useRouter(),
      isloading: false
    };
  },
  methods: {
    async login() {
      this.isloading = true;
      const loginDataService = new LoginDataService();
      try {
        const response = await loginDataService.login(this.username, this.password)
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', String(response.user_id));
          localStorage.setItem('termoExpirado', String(response.policy_expired));
          localStorage.setItem('TextoTermoAtual', String(response.current_policy.text_policy));
          localStorage.setItem('DataVigenciaTermo', String(response.current_policy.policy_date));
          localStorage.setItem('idPolicy', String(response.current_policy.id_policy));
          localStorage.setItem('is_mandatory', String(response.current_policy.is_mandatory))

          this.router.push('/dashboard');
        }
        else {
          console.error('Login failed with status:');
        }
      }
      catch (error: any) {
        console.error(error.message)
        showToast({
          severity: 'error',
          summary: 'Erro ao fazer login',
          detail: error.message,
          life: 3000
        });
      }
      this.isloading = false;
    },
  }
});
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 50vh;
  /* border: 1px solid rgb(0, 0, 0); */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 30px;
  background-color: white;
  margin-right: -50px;
}

.inputs {
  margin: 5px 0px;
  width: 100%;
}

#login-button {
  margin-top: 10px;
  /* width: 30%; */
  background-color: rgb(0, 26, 175);
  border: none
}

#login-button:hover {
  background-color: #0c0079;
}

#login-button:active {
  background-color: #000000;
}
</style>
