<template>
  <v-form style="background: #f2f2f2" ref="form" v-model="valid" lazy-validation class="mx-6" @submit.prevent='onCreateMeetup'>
    <v-container>
      <v-row justify-md="center">
        <v-col md="4" >
          <h2 class="Black--text mb-2">Create Your MeetUps</h2>
        </v-col>
      </v-row>
      <v-row justify-md="center">
        <v-col  md="6">
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
      </v-row>
      <v-row justify-md="center">
        <v-col  md="6">
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
      </v-row>
      <v-row justify-md="center">
        <v-col md="2">
          <v-btn elevation="8" color="primary" @click="onPickFile">
            Upload
          </v-btn> 
          <input 
          type="file" 
          style="display: none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">
        </v-col>
      </v-row>
      <v-row justify-md="center">
        <v-col md="6">
          <v-img
              :src="imageUrl"
            ></v-img>
        </v-col>
      </v-row>
      <v-row justify-md="center">
        <v-col md="8" >
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
      </v-row>
      <v-row justify-md="center space-between" >
        <v-col md="4" >
          <h2 class="blue darken-3 blue--text text--lighten-5 pl-15"> Choose Date</h2>
        </v-col>
        <v-col md="4">
          <h2 class="blue darken-3 blue--text text--lighten-5 pl-16">Choose Time</h2>
        </v-col>
      </v-row>
      <v-row justify-md="center">
         <v-col md="4">
          <v-date-picker v-model="date"></v-date-picker>
        </v-col>
        <v-col md="4" >
            <v-time-picker
              v-model="time">
            </v-time-picker>
        </v-col>
      </v-row>
      <v-row justify-md="center">
        <v-col md="3" >
          <v-btn color="success" :disabled="!formisValid" type="submit" block elevation="10">
            Create MeetUp
          </v-btn>
        </v-col>
      </v-row>
      </v-container>
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
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),

      
  }),
  
  methods: {
    onCreateMeetup() {
      if(!this.image){
        return null
      }
        const meetUpData ={
          title: this.title,
          location: this.location,
          description: this.description,
          date: this.submittableDateTime,
          image: this.image
        }

        console.log(meetUpData)
        this.$store.dispatch('createMeetUp', meetUpData)
        this.$router.push("/meetups")
        
      },
      onPickFile(){
        this.$refs.fileInput.click();
      },
      onFilePicked(event){
        const files = event.target.files
        let filename = files[0].name
        if(filename.lastIndexOf('.')<=0){
          return alert('Please Add Valid File')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', ()=>{
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image =files[0]
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