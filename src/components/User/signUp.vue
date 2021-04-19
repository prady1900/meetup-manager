<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
  <v-container>
  
    <v-row v-if="error">
      <v-col xs="12" sm="12" md="6" offset-md="3">
      <app-alert 
      @dismissed="onDismissed" v-text="error.message">
      </app-alert>
    </v-col>
    </v-row>
    <v-row>
    <v-col xs="12" sm="12" md="6" offset-md="3">
        <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"  
        required
      ></v-text-field>
    </v-col>
    
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
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
      ></v-text-field>
    </v-col>

    <v-col xs="12" sm="12" md="6" offset-md="3">
        <v-text-field
          v-model="confirmPassword"
          :rules="[comparePass]"
          label="Confirm Password"
          required
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
      ></v-text-field>
    </v-col>


    <v-col xs="12" sm="12" md="6" offset-md="3">
        <v-btn
      :disabled="loading"
      :loading="loading"
      color="success"
      class="mr-4"
      @click="onSignUp"
    >
      SignUp
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>
    </v-col>
    

  </v-row>
  </v-container>
  </v-form>

</template>

<script>
export default {
  data: ()=>({
    show1: false,
    show2: false,
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
    confirmPassword:''
  }),

  computed:{
    comparePass(){
      return this.password !== this.confirmPassword ? 'Password Do not Match' : ''
    },
    formisvalid(){
      return this.name !== ' '&&
      this.email !== ' '&&
      this.password !==' '&&
      this.confirmPassword !== ''
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
    onSignUp(){
      this.$refs.form.validate()
      // Vuex
      this.$store.dispatch('signUserUp',{email: this.email, password: this.password, name: this.name})
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