<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mx-6">
      <v-row >
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <h2 class="grey--text mb-2">Create Your MeetUps</h2>
        </v-col>
        <v-col xs="12" md="6" offset-md="3">
          <v-text-field
            v-model="title"
            label="Title"
            ref="name"
            :rules="titleRules"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-text-field
            v-model="location"
            label="Location"
            :rules="locRules"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-text-field
            v-model="img_url"
            label="Image Url"
            :rules="imgRules"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <img :src="img_url"/>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-textarea
            counter
            v-model="desc"
            label="Description"
            :rules="descRules"
            outlined
          ></v-textarea>
        </v-col>
        <v-col xs="12" sm="12" md="6" offset-md="3">
          <v-btn color="success" :disabled="!valid" v-on:click="validattion()">
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

      img_url: '',
      imgRules: [(v) => !!v || "Image Url is required"],

      desc: '',
      descRules: [(v) => !!v || "Description is required"],
  }),
  methods: {
    validattion() {
      console.log("validated")
      console.log(this.$refs.form)
      this.$refs.form.validate()
      
        const meetUpData ={
          title: this.title,
          location: this.loc,
          img_url: this.img_url,
          desc: this.desc,
          date: '2018-05-12'
        }
        this.$store.dispatch('createMeetUps', meetUpData)
      }
      
    },
  computed: {},
};
</script>

<style>
</style>