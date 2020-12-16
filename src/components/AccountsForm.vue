<template>
  <v-container>
    <h1>RESERVAR</h1>
    <v-row>
      <v-col cols="12" lg="3">
        <v-text-field
          v-model="firstName"
          :error-messages="firstNameErrors"
          @input="$v.firstName.$touch()"
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
          ref="dialogStartTime"
          v-model="startTimeOpen"
          :return-value.sync="startTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startTime"
              label="Desde"
              prepend-icon="mdi-clock-time-four-outline"
              @input="$v.startTime.$touch()"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="startTimeOpen" v-model="startTime" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startTimeOpen = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialogStartTime.save(startTime)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>

      <v-col cols="12" lg="1">
        <v-dialog
          ref="dialogEndTime"
          v-model="endTimeOpen"
          :return-value.sync="endTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endTime"
              label="Hasta"
              @input="$v.endTime.$touch()"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="endTimeOpen" v-model="endTime" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endTimeOpen = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialogEndTime.save(endTime)">
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
    firstName: { required },
  },

  data: () => ({
    firstName: "",
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,
    time: null,
    menu2: false,
    startTimeOpen: false,
    endTimeOpen: false,
  }),

  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("Nombre requerido");
      return errors;
    },
  },

  methods: {
    reset() {
      this.firstName = "";
    },

    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("newAccount", {
          firstName: this.firstName,
          date: this.date,
          startTime: this.startTime,
          endTime: this.endTime,
        });

        this.firstName = "";
        this.date = "";
        this.startTime = "";
        this.endTime = "";
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