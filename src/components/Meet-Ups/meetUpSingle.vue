<template>
  <div id="meetUpsPage">
    <v-container>
      <v-row >
        
        <v-card class="mx-auto" elevation="8">
          <v-card-title>{{meetup.title}}
            <template v-if="true">
            <v-spacer></v-spacer>
            <app-edit-dialog></app-edit-dialog>
          </template>
          </v-card-title>
          
          <v-img
            class="white--text align-end"
            height="400px"
            :src="meetup.imageUrl"
          >
          </v-img>
          <v-card-text class="text--primary">
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div> {{meetup.description}}</div>
            
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red"> Register </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props:['id'],
  computed :{
    meetup(){
      return this.$store.getters.loadedMeetUp(this.id)
    },
    userIsAuthenticated(){
      return this.$store.getters.users !== null && this.$store.getters.users !== undefined
    },
    userIsCreator(){
      if(!this.userIsAuthenticated()){
        return false
      }
        return this.$store.getters.user.id === this.meetup.creatorId
    }
  }
    
};
</script>


<style scoped>

</style>