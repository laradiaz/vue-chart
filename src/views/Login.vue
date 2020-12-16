<template>
  <div class="background">
    <v-container class="login-container">
      <h1>Iniciar Sesión</h1>
      <p>Ingresa tu Correo Electrónico y Contraseña</p>
      <login-form></login-form>
    </v-container>
  </div>
</template>
<script>
import LoginForm from "../components/LoginForm";
export default {
  components: { LoginForm },
};
</script>

<style lang="scss">
.login-container {
  padding-top: 200px;
  padding-bottom: 63px;
}

h1 {
  font-family: "Roboto", sans-serif;
  text-align: left;
  color: darkblue;
  font-size: 40px;
}

p {
  text-align: left;
  color: #666666;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
}
.background {
  background-image: url("../assets/login-bg.svg");
  background-size: cover;
  background-position: center right;
  height: 100vh;
}
</style>