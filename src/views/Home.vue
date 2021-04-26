<template>
  <div class="home">
    <div>
      <v-container>
      <v-row justify="center" align="center">
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
      <v-row>
        <v-col md="8" offset-md="2">
          <v-card class="pa-2" outlined tile v-if="!loading">
            <v-carousel hide-delimiters  height="400" style="cursor: pointer">
              <v-carousel-item
                v-for="img in featuredMeetUps"
                :key="img.id"
                :src="img.imageUrl" 
                v-on:click="loadItem(img.id)"
              >
                <div class="title">{{ img.title }}</div>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col md="3"> </v-col>
      </v-row>
      <v-row>
        <v-col md="2">

        </v-col>
        <v-col md="8">
          <h2>Create Your Own Meetup Now!</h2>
        </v-col>
        <v-col md="2">

        </v-col>
      </v-row>
    </v-container>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      imageVal: ['https://images.everydayhealth.com/images/healthy-living/fitness/all-about-yoga-mega-722x406.jpg?sfvrsn=c26482ac_0',
      'https://dvyvvujm9h0uq.cloudfront.net/com/articles/1543483387-reinhart-julian-1145947-unsplash.jpg',
      'https://miro.medium.com/max/8000/1*JrHDbEdqGsVfnBYtxOitcw.jpeg']
    }
  },
  computed: {
    featuredMeetUps() {
      console.log(this.$store.getters.featuredMeetups);
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    loadItem(id) {
      this.$router.push("/meetup/" + id);
    },
  },
};
</script>

<style scoped>
.title {
  position: relative;
  margin-top: 250px;
  background-color: rgba(0, 0, 0, 0.5);
  color: yellow;
  font-size: 2em;
  padding: 10px;
}
</style>




