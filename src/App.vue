<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>


<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
}
</style>