<template>
  <v-simple-table fixed-header height="400px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Fecha</th>
          <th class="text-left">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in accounts" :key="item.id">
          <td>{{ item.content }}</td>
          <td>{{ item.start }}</td>
          <td>
            <v-icon
              name="trash-alt"
              small
              color="error"
              @click="() => deleteAccount()">
              Delete
            </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "AccountList",

  methods: {
    deleteAccount() {
      this.$store.commit("deleteAccount", this.index);
    }, 
    
  },
 
  computed: {
    accounts() {
     return this.$store.state.accounts;
    },
  },
};
</script>

<style lang="scss">
</style>
