<template>
  <div class="login-form">
    <h2>Login please</h2>
    <InputGroup class="inputs">
        <InputGroupAddon>
            <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="username" placeholder="Username" size="small"/>
    </InputGroup>

    <InputGroup class="inputs">
        <InputGroupAddon>
            <i class="pi pi-key"></i>
        </InputGroupAddon>
        <InputText v-model="password" placeholder="Password" type="password" size="small"/>
    </InputGroup>
  <Button id="login-button" label="Sign in" raised  aria-label="undefined" icon="pi pi-sign-in" @click="login()"/>
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
      router: useRouter()
    };
  },
  methods: {
    async login() {
      const loginDataService = new LoginDataService();
      try {
        const response = await loginDataService.login(this.username, this.password)
        if ( response ){
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', String(response.user_id));
          localStorage.setItem('termoExpirado', String(response.policy_expired));
          localStorage.setItem('TextoTermoAtual', String(response.current_policy.text_policy));
          localStorage.setItem('DataVigenciaTermo', String(response.current_policy.policy_date));

          this.router.push('/dashboard');
          console.log('Login successful:', response);
        }
        else {
          console.error('Login failed with status:');
        }
    }
    catch (error) {
      console.error('Login failed:', error);
    }
  },
  }
});
</script>

<style scoped>
.login-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 50vh;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  padding: 10px 30px;
  background-color: white;
  margin-right: -50px;
}
.inputs{
  margin: 5px 0px;
  width: 100%;
}

#login-button{
  margin-top: 10px;
  width: 30%;
  background-color: rgb(0, 26, 175);
}

#login-button:hover{
  background-color: #0c0079;
}

#login-button:active{
  background-color: #000000;
}

</style>
