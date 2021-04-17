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
        <v-date-picker v-model="date1">
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
      editableDate: this.meetup.date.toISOString().substr(0, 10),
      modal: false,
      date1: this.meetup.date
    };
  },
  methods: {
    onSaveChanges() {
        
        
        const rnewDate = this.meetup.date
        const newDate = new Date(this.date1)
        console.log(newDate)
        const newDay = newDate.getDay()
        const newMonth = newDate.getMonth()+1
        const newYear = newDate.getFullYear()

        var tempdate = newYear+"-"+newMonth+"-"+newDay
        this.editableDate = tempdate+''+rnewDate.substr(10)

        console.log("0",this.editableDate)
        console.log("1",this.date1)

            this.editDialog= false;
      console.log("2",newDate)
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: this.editableDate.toISOString(),
      })
      
    },
  },
  created() {
        let date = this.date1 //set Date to the date of meetup
        let day = date.getDay() // +1 cuz the days are counted from 0-30
        let month = date.getMonth()  // +1 cuz the months are counted from 0 to 11
        let year = date.getFullYear()

        var tempdate = year+"-"+month+"-"+day
        this.editableDate  = (tempdate + '' + this.date1.substr(10))
        console.log("3",this.editableDate)
  }
 
};
</script>



