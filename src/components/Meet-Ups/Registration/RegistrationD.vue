<template>
  <v-dialog transition="dialog-top-transition" max-width="600px" v-model="regDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-2" color="primary" v-bind="attrs" small v-on="on">
        {{userIsRegisterd ? 'Unregister' : 'Register'}}</v-btn
      >
    </template>
    
      <v-card>
        <v-card-title color="primary" v-if="userIsRegisterd">Unregister From Meetup</v-card-title>
        <v-card-title color="primary" v-else>Register For MeetUP?</v-card-title>
        
    
        <v-card-actions>
                    <v-btn
                    class="red--text darken-1"
                    text
                    @click="regDialog=false"
                    >Cancel</v-btn>
                  <v-btn
                    class="green--text darken-1"
                    text
                    @click="OnAgree"
                    >Confirm</v-btn>
        </v-card-actions>
    
      
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    data(){
        return {
            regDialog :false,
                }
    },
    props: ['meetupId'],
  computed:{
      userIsRegisterd (){
          return this.$store.getters.user.registeredMeetups.findIndex(meetupId =>{
              return meetupId === this.meetupId
          }) >=0
      }
  },
  methods:{
      OnAgree(){
          this.regDialog = false
          if(this.userIsRegisterd){
            this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
          }
          else{
            this.$store.dispatch('registerUserForMeetup', this.meetupId)
          }
      }
  }
 
};
</script>



