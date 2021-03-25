<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mx-6" @submit.prevent='onCreateMeetup'>
      <v-row >
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <h2 class="grey--text mb-2">Create Your MeetUps</h2>
        </v-col>
        <v-col xs="12" md="6" offset-md="3">
          <v-text-field
            v-model="title"
            name="title"
            id="title"
            label="Title"
            :rules="titleRules"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-text-field
            name="location"
            id="location"
            v-model="location"
            label="Location"
            :rules="locRules"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-text-field
            name="imageUrl"
            id="imageUrl"
            v-model="imageUrl"
            label="Image Url"
            :rules="imgRules"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-img
              height="200px"
              :src="imageUrl"
            ></v-img>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-textarea
            counter
            v-model="description"
            name="description"
            id="description"
            label="Description"
            :rules="descRules"
            outlined
          ></v-textarea>
        </v-col>
        <v-row>
          <v-date-picker v-model="time"></v-date-picker>
        </v-row>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-date-picker
            v-model="date"
            class="mb-4"
            min="2020-12-01"
            max="2030-12-31">
          </v-date-picker>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
            <v-time-picker
              v-model="time"
              format="24hr">
            </v-time-picker>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-btn color="success" :disabled="!formisValid" type="submit">
            Create MeetUp
          </v-btn>
        </v-col>
      </v-row>
  </v-form>
</template>
<script>

export default {
  
  data: ()=> ({
      valid:true,
      title: '',
      titleRules: [(v) => !!v || "Name is required"],

      location: '',
      locRules: [(v) => !!v || "Location is required"],

      imageUrl: '',
      imgRules: [(v) => !!v || "Image Url is required"],

      description: '',
      descRules: [(v) => !!v || "Description is required"],
      date: new Date(),
      time: new Date()
  }),
  
  methods: {
    onCreateMeetup() {
        const meetUpData ={
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }

        console.log(meetUpData)
        this.$store.dispatch('createMeetUp', meetUpData)
        
      }
      
    },
  computed: {
    formisValid() {
      return this.title !== '' && 
      this.location !== '' &&
      this.description !== '' &&
      this.imageurl !== ''
    },
    submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        console.log(date)
        return date
      }
  },
};
</script>

<style>
</style>