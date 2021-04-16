<template>
  <div id="meetUpsPage">
    <v-container>
      <v-row justify="center" align="center" v-if="loading">
        <v-col md="6" offset-md="3">
          <v-progress-circular
            justify="center"
            align="center"
            indeterminate
            color="green">
          </v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
        <v-card class="mx-auto" elevation="8">
          <v-card-title>{{meetup.title}}
            <template v-if="userIsCreator">
            <v-spacer></v-spacer>
            <app-edit-dialog :meetup= "meetup"></app-edit-dialog>
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props:["id"],
  computed :{
    meetup () {
      return this.$store.getters.loadedMeetUp(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if(!this.userIsAuthenticated){
        return false
      }
        return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading() {
      return this.$store.getters.loading;
    },
  }
    
};
</script>

<style scoped>
.meetUpsPage{
  height: 100vh;
}
</style>
