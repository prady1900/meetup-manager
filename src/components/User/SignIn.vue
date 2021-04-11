<template>
  <v-container>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
  <v-row v-if="error">
      <v-col>
      <app-alert xs="12" sm="12" md="3" offset-md="2"
      @dismmised="onDismissed" v-text="error.message">
      </app-alert>
    </v-col>
    </v-row>
  <v-row>
    <v-col xs="12" sm="12" md="6" offset-md="3">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
      ></v-text-field>
    </v-col>

    <v-col xs="12" sm="12" md="6" offset-md="3">
        <v-text-field
          v-model="password"
          label="Password"
          required
      ></v-text-field>
    </v-col>


    <v-col xs="12" sm="12" md="6" offset-md="3">
        <v-btn
      :disabled="loading"
      :loading="loading"
      color="success"
      class="mr-4"
      @click="onSignIn"
    >
      Sign In
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>
    </v-col>
    

  </v-row>
  </v-form>
  </v-container>

</template>

<script>
export default {
  data: ()=>({
    valid: true,
    name:'',
    nameRules:[
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    
    password: '',
  }),

  computed:{
    formisvalid(){
      return this.name !== ' '&&
      this.email !== ' '&&
      this.password !==' '
    },
    user(){
      return this.$store.getters.user
    },
    error(){
      return this.$store.getters.error
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  watch:{
    user(value){
      if(value !== null  && value !== undefined){
        this.$router.push('/')
      }
    }
  },

  methods: {
    onSignIn(){
      this.$refs.form.validate()
      // Vuex
      this.$store.dispatch('signUserIn',{email: this.email, password: this.password})
    },
    onDismissed(){
      console.log("Dismmied Alert")
      this.$store.dispatch('clearError')
    }
  }, 

    
  
}
</script>

<style>

</style>