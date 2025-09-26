<template>
  <div class="signup">
    <h2 class="sign-up-text-title">Welcome!</h2>
    <h3 class="sign-up-text">Enter your details and start jorney with us</h3>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SignUp',
  components: {
  },
  data() {
    return {
    };
  },
});
</script>
<style scoped>
.signup{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vh;
  height: 60vh;
  padding: 0px 100px;
  background-image: url('/background2.svg');
  border-radius: 10px;
  text-align: center;
}
.sign-up-text{
  color: white;
  font-weight: normal;
  font-size: 1em;
}
.sign-up-text-title{
  color: white;
  font-weight: bold;
  font-size: 2em;
  margin: 0
}
</style>

