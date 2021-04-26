<template>
<div style="background: #f2f2f2">
  <v-container>
    <v-row justify-md="center" justify-sm="center" justify-xs="center" justify-lg="center">
      <v-col xs="12" md="3">
        <h1>Profile Page</h1>
      </v-col>
    </v-row>
    <v-divider > </v-divider>
    <v-row justify-md="center" justify-sm="center" justify-xs="center" justify-lg="center"
    >
      <v-col xs="12" md="3" align-self="center">
        <v-avatar 
        color="primary"
        size="72"
      >
      <v-img
          src="https://picsum.photos/510/300?random"
          aspect-ratio="1.7"
        ></v-img>
      </v-avatar>
      </v-col>
      <v-col :bind="nameExt" xs="12" md="2" align-self="center">
        <div>Name:</div>
        <div class="font-weight-medium">{{nameExt.name[0]}}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row   justify-md="center" justify-sm="center" justify-xs="center" justify-lg="center">
      <v-col xs="12" md="3">
        <h2>Created MeetUp</h2>
      </v-col>
    </v-row>
    
    <v-row  class="mb-2" v-for="meet in meetups" :key="meet.id">
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
              <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
          @click="onViewAttendde(meet.id)"
        >
          Check Attendee List
        </v-btn>
      </template>
      <v-sheet
        class="text-center"
        height="350px"
      >
        
        <v-list>
        
        <v-list-item
          v-for="tile in regUsers"
          :key="tile"
          @click="sheet = !sheet"
        >
          <v-list-item-title>{{ tile }}</v-list-item-title>
        </v-list-item>
      </v-list>
       
      <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >
          close
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  data(){
    return{
      sheet: false,
      
      myStyle:{
             
            backgroundColor:"#ebebeb" 
            }
    }
  },
  methods:{
    onViewAttendde(meetid){
       this.$store.dispatch("getUserName",meetid)
    },
  },
  computed: {
    meetups() {
      console.log("I am profile",this.$store.getters.myMeetup);
      return this.$store.getters.myMeetup;
    },
    nameExt() {
      console.log("I am profile 2",this.$store.getters.myMeetup[0]);
        
      return this.$store.getters.myMeetup[0];
    },
    meetId(){
      console.log(this.$store.getters.myMeetup[0].id)
      return this.$store.getters.myMeetup[0].id;
    },
    regUsers(){
      return this.$store.getters.regUserNamesGetter
    },



  },
}
</script>

<style scoped>

</style>