<template>
  <v-container>
    <h1>RESERVAR</h1>
    <v-row>
      <v-col cols="12" lg="3">
        <v-text-field
          v-model="content"
          :error-messages="contentErrors"
          @input="$v.content.$touch()"
          :counter="30"
          label="Nombre"
          required
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="2">
        <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Fecha"
            @input="$v.date.$touch()"
            prepend-icon="mdi-calendar"
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>

      <v-col cols="12" lg="1">
        <v-dialog
          ref="dialogStart"
          v-model="startOpen"
          :return-value.sync="start"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="start"
              label="Desde"
              prepend-icon="mdi-clock-time-four-outline"
              @input="$v.start.$touch()"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="startOpen" v-model="start" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startOpen = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialogStart.save(start)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>

      <v-col cols="12" lg="1">
        <v-dialog
          ref="dialogEnd"
          v-model="endOpen"
          :return-value.sync="end"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="end"
              label="Hasta"
              @input="$v.end.$touch()"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="endOpen" v-model="end" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endOpen = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialogEnd.save(end)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
      <v-btn elevation="2" id="button" @click="submit">Guardar</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { RepositoryFactory } from "../repositories/RepositoryFactory";

export default {
  name: "AccountsForm",

  mixins: [validationMixin],

  validations: {
    content: { required },
  },

  data: () => ({
    content: "",
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,
    time: null,
    menu2: false,
    startOpen: false,
    endOpen: false,
  }),

  computed: {
    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      !this.$v.content.required && errors.push("Nombre requerido");
      return errors;
    },
  },

  methods: {
    reset() {
      this.content = "";
    },

    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("newAccount", {
          content: this.content,
          start: `${this.date}, ${this.start}:00`,
          end: `${this.date}, ${this.end}:00`,
          id: this.$store.getters.accountsLength+1,
        }); 
        
        console.log(this.$store.getters.accountsLength)

     
      }
    },
  },
};
</script>

<style lang="scss">
h1 {
  font-family: "Montserrat", sans-serif;
  text-align: left;
  color: #006755;
  font-size: 25px;
}

#button {
  margin-left: 15px;
  color: #fff;
  background-color: #00a98f;
  margin-top: 20px;
}
</style>