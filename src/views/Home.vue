<template>
  <div class="home">
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
        <v-col md="6" offset-md="3">
          <v-card class="pa-2" outlined tile v-if="!loading">
            <v-carousel hide-delimiters height="300" style="cursor: pointer">
              <v-carousel-item
                v-for="img in featuredMeetUps"
                :key="img.id"
                :src="img.imgUrl"
                v-on:click="loadItem(img.id)"
              >
                <div class="title">{{ img.title }}</div>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col md="3"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    featuredMeetUps() {
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




