<template>
  <div id="meetUpsPage" style="background: #f2f2f2">
    <v-container>
      <v-row justify="center" align="center" v-if="loading">
        <v-col md="6" offset-md="3">
          <v-progress-circular
            justify="center"
            align="center"
            indeterminate
            color="green"
          >
          </v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-card class="mx-auto" elevation="8">
            <v-card-title
              >{{ meetup.title }}
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-dialog :meetup="meetup"></app-edit-dialog>
              </template>
            </v-card-title>

            <v-img
              class="white--text align-end"
              height="400px"
              :src="meetup.imageUrl"
            >
            </v-img>
            
            <v-card-text class="text--primary">
              <v-row justify-md="space-between">
                <v-col md="4"><div class="info--text">{{ meetup.date | date }} </div> </v-col>
                <v-col md="2"></v-col>  
              </v-row>
              
              <h3>Location:</h3>
              <div> {{ meetup.location }}</div>
              <h3>Description:</h3>
              <div>{{ meetup.description }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <app-register-meet :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-register-meet>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      console.log("Single",this.$store.getters.loadedMeetUp(this.id))
      return this.$store.getters.loadedMeetUp(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped>
.meetUpsPage {
  height: 100vh;
}
</style>
