<template>
  <v-container>
    <v-row wrap class="mb-2" v-for="img in loadMeetUps" :key="img.id">
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
              class="white--text align-end"
              height="200px"
              :src="img.imgUrl"
            >
              <v-card-title color="black">
                <div>
                  <h2>{{ img.title }}</h2>
                  <div>{{ img.date }}</div>
                </div>
              </v-card-title>
            </v-img>
            <v-card-text class="text--primary">
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
                repudiandae excepturi enim a dicta harum, minima accusantium,
                amet possimus alias illo quae expedita beatae est ipsa,
                similique voluptate facilis numquam!
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" router :to="'/meetup/'+ img.id"> View MeetUp </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
    >
  </v-container>
</template>

<script>
export default {
  computed: {
    loadMeetUps() {
      return this.$store.state.loadMeetUps
    },
  },
};
</script>

<style>
</style>