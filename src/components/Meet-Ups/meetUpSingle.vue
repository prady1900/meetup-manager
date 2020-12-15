<template>
  <div id="meetUpsPage">
    <v-container>
      <v-row>
        <v-card-title>My 1st MeetUp</v-card-title>
        <v-card class="mx-auto" max-width="">
          <v-img
            class="white--text align-end"
            height="400px"
            :src="meetup.imgUrl"
          >
          </v-img>
          <v-card-text class="text--primary">

            <div>
              
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              laboriosam blanditiis sunt magnam dolor modi tenetur in sed, quo
              ducimus, architecto unde nulla repudiandae pariatur ipsam facere,
              soluta beatae. Delectus!
            
            </div>
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
  computed:{
    meetup(){
      return this.$store.getters.loadMeetUp(this.id)
    }
  }
};
</script>

<style scoped>
.meetUpsPage {
  height: 100vh;
}
</style>