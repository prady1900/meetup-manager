<template>
  <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab class="mx-2" color="primary" v-bind="attrs" small v-on="on">
        <v-icon>mdi-pencil</v-icon></v-btn
      >
    </template>
    <template>
      <v-card>
        <v-toolbar color="primary" dark>Edit Your Meetup</v-toolbar>
        <v-container>
          <v-divider></v-divider>
          <v-row>
            <v-col xs="12">
              <v-text-field
                rows="1"
                class="mx-2"
                label="MeetUp Name"
                v-model="editedTitle"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-textarea
                rows="1"
                class="mx-2"
                required
                label="MeetUp Description"
                v-model="editedDescription"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-container>
            <v-row>
              <v-col md="1" class="mr-2">
                <v-btn text @click="dialog = false">Close</v-btn>
              </v-col>
              <v-col md="1">
                <v-btn text color="green" @click="onSaveChanges">Save</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      console.log("from onchange", this.editedTitle, this.editedDescription);
      this.dialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
    },
  },
};
</script>