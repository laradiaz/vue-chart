<template>
  <div>
    <v-app-bar color="teal accent-4" dense dark>
      <v-toolbar-title>Reservas</v-toolbar-title>

      <v-spacer />
      <v-btn>{{ userEmail }}</v-btn>
      <v-btn
        depressed
        color="error"
       @click="logout" id="logout">
        Salir
      </v-btn>
    </v-app-bar>

    <v-container class="accounts">
      <accounts-form />
      <timeline/>
      <account-list/>
    </v-container>
  </div>
</template>

<script>
import AccountsForm from "../components/AccountsForm";
import AccountList from "../components/AccountList";
import Timeline from '../components/timeline/timeline';

export default {
  name: "Accounts",
  components: { AccountList, AccountsForm, Timeline },

  computed: {
    userEmail() {
      return localStorage.getItem("user-username");
    },
  },

  methods: {
    logout() {
      localStorage.removeItem("user-token");
      this.$router.go("/");
    },
  },
};
</script>

<style lang="scss">
.accounts {
  padding-top: 100px;
  margin-left: 5em;
}

button {
  margin-left: 15px;
}
</style>
