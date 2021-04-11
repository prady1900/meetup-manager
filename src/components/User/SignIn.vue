<template>
  
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
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
      :disabled="!formisvalid"
      color="success"
      class="mr-4"
      @click="onSignIn"
    >
      Sign In
    </v-btn>
    </v-col>
    

  </v-row>
  </v-form>

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
    }
  }, 

    
  
}
</script>

<style>

</style>