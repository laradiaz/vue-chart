<template>
    <form>
        <v-alert type="error" :value="this.loginError !== ''" outlined>
            {{this.loginError}}
        </v-alert>

        <v-text-field v-model="username"
                      :error-messages="usernameErrors"
                      label="Correo Electrónico"
                      required
                      @input="$v.username.$touch()"
                      @blur="$v.username.$touch()"
        />

        <v-text-field v-model="password"
                      :error-messages="passwordErrors"
                      label="Contraseña"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ?'text' : 'password'"
                      required
                      @input="$v.password.$touch()"
                      @blur="$v.password.$touch()"
                      @click:append="showPassword = !showPassword"
        />
        <v-checkbox v-model="checkbox" label="Recordar Contraseña"></v-checkbox>

        <v-btn rounded color="primary" dark @click="submit">Siguiente</v-btn>

    </form>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, email} from 'vuelidate/lib/validators'
    import {RepositoryFactory} from "../repositories/RepositoryFactory";

    export default {
        name: "LoginForm",

        mixins: [validationMixin],

        validations: {
            username: {required, email},
            password: {required}
        },

        data: () => ({
            username: '',
            password: '',
            showPassword: false,
            checkbox: false,
            loginError: ''
        }),

        computed: {
            usernameErrors() {
                const errors = [];
                if (!this.$v.username.$dirty) return errors;
                !this.$v.username.email && errors.push('No es un correo valido');
                !this.$v.username.required && errors.push('Correo Electrónico requerido');
                return errors
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Contraseña requerida');
                return errors
            }
        },

        methods: {
            async submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const LoginRepository = RepositoryFactory.get('login');
                    try {
                        const response = await LoginRepository.post({
                            email: this.username,
                            password: this.password
                        });
                        this.loginError = '';
                        const { data: { token } } = response;
                        localStorage.setItem('user-token', token);
                        this.$router.go('/accounts')
                    } catch (e) {
                        this.loginError = 'Correo Electrónico/Contraseña incorrecto';
                        this.password = '';
                        localStorage.removeItem('user-token');

                    }
                }
            }
        }

    }
</script>

<style lang="scss">

    form {
        width: 400px;
    }

</style>