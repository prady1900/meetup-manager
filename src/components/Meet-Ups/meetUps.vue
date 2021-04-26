<template>
<div style="background: #f2f2f2">
  <div >
    <v-container>
      <v-row  justify="center" align="center">
        <v-col md="6" offset-md="3">
          <v-progress-circular
            justify="center"
            align="center"
            indeterminate
            color="green"
            v-if="loading"
          >
          </v-progress-circular>
        </v-col>
      </v-row>
    <v-row  wrap class="mb-2" v-for="meet in meetups" :key="meet.id">
      <v-col md="3"></v-col>
      <v-col md="6">
        <v-lazy
          :options="{
            threshold: 1.0,
          }"
          transition="fade-transition"
        >
          <v-card v-if="!loading">
            <v-img
              class="black--text align-end"
              height="200px"
              :src="meet.imageUrl"
            >
              <v-card-title color="black">
                <div>
                  <h2>{{ meet.title }}</h2>
                  <div>{{ meet.date | date }}</div>
                </div>
              </v-card-title>
            </v-img>
            <v-card-text class="text--primary">
              <div>
                {{ meet.description }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" router :to="'/meetup/' + meet.id">
                View MeetUp
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
  </div>
  
  
  </div>
</template>

<script>
export default {
  props: [],
  data(){
    return{
    }
  },
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetUps;
    },
    loading() {
      return this.$store.getters.loading;
    },
    
  },
};
</script>

<style>
</style>