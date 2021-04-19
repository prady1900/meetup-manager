<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-row v-if="error">
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <app-alert
            xs="12"
            sm="12"
            md="3"
            offset-md="2"
            
            @dismmised="onDismissed"
            :text="error.message"
          >
          <v-btn fab>
            <v-icon right>mdi-cancel</v-icon>
          </v-btn>
          </app-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-text-field
            pa
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-text-field
            v-model="password"
            label="Password"
            required
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col xs="12" sm="12" md="3" >
          <v-btn
            :disabled="loading"
            :loading="loading"
            color="success"
            
            @click="onSignIn"
          >
            Sign In
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </v-col>
        <v-col md="3">
          <v-btn
            text
            color="error"
            
            @click="onForgotPass"
          >
            Forgot Password
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    password: "",
  }),

  computed: {
    formisvalid() {
      return this.name !== " " && this.email !== " " && this.password !== " ";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    msg() {
      return "email sent Sucessfully";
    },
    loading() {
      return this.$store.getters.loading;
    },

  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },

  methods: {
    onSignIn() {
      this.$refs.form.validate();
      // Vuex
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      console.log("Dismmied Alert");
      this.$store.dispatch("clearError");
    },
    onForgotPass()
    {
      
      this.$store.dispatch("forgotPass", {
        email: this.email
       
    })
     
    }
  }
};
</script>

<style>
</style>