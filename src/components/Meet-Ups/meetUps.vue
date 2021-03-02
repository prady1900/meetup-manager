<template>
  <v-container>
    <v-row wrap class="mb-2" v-for="meet in meetups" :key="meet.id">
      <v-col md="3"></v-col>
      <v-col md="6">
        <v-lazy
          :options="{
            threshold: 1.0,
          }"
          transition="fade-transition"
        >
          <v-card>
            <v-img
              class="black--text align-end"
              height="200px"
              :src="meet.imageUrl"
            >
              <v-card-title color="black">
                <div>
                  <h2>{{ meet.title }}</h2>
                  <div>{{ meet.date }}</div>
                </div>
              </v-card-title>
            </v-img>
            <v-card-text class="text--primary">
              <div>
                {{meet.desc}}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" router :to="'/meetup/'+ meet.id"> View MeetUp </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      console.log(this.$store.getters.loadedMeetUps)
      return this.$store.getters.loadedMeetUps
    },
  },
};
</script>

<style>
</style>