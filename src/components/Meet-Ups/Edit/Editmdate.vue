<template>
  <v-dialog transition="dialog-top-transition" max-width="600px" v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-2" color="primary" v-bind="attrs" small v-on="on">
        Edit Date</v-btn
      >
    </template>
    
      <v-card>
        <v-card-title color="primary" dark>Edit Meetup Date</v-card-title>
        <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="editableDate"
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
       
            <v-text-field
            v-model="editableDate"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
    <v-card>
        <v-date-picker
         
        >
        </v-date-picker>
        <v-card-actions>
                    <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="editDialog = false"
                    >Close</v-btn>
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="onSaveChanges"
                    >Save</v-btn>
        </v-card-actions>
    </v-card>
      </v-dialog>
    
          
        
        
        
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableDate: null,
      modal: false,
      date: new Date().toISOString()
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCDate();

      newDate.setUTCDate(newDay);
      newDate.setUTCDate(newMonth);
      newDate.setUTCDate(newYear);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      })
      
    },
  },
  created() {
     let date = new Date(this.meetup.date) //set Date to the date of meetup

      let day = date.getUTCDate() // +1 cuz the days are counted from 0-30
      let month = date.getUTCMonth()+1  // +1 cuz the months are counted from 0 to 11
      let year = date.getUTCFullYear()
        this.editableDate = year+"-"+month+"-"+day
  },
  
  
};
</script>



