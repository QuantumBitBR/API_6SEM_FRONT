<template>
  <div class="login-container">
    <Login class="login"/>
    <SignUp class="signup"/>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';

export default defineComponent({
  name: 'LoginView',
  components: {
    Login,
    SignUp
  },
});
</script>
<style>
.login{
  z-index: 1;
}

.signup{
  z-index: 0;
}
.login-container{
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background-image: url('/background1.svg');
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

}
</style>
