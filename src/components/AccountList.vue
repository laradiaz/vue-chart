<template>
  <v-simple-table fixed-header height="400px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Hora</th>
          <th class="text-left">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in accounts" :key="item.email">
          <td>{{ item.firstName }}</td>
          <td>{{ item.startTime }} - {{item.endTime}}</td>
          <td>
            <v-icon
              name="trash-alt"
              small
              color="error"
              @click="() => removeItem(index)">
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
    removeItem() {
      this.$store.accounts("removeAppointment", this.index);
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
