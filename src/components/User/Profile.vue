<template>
  <v-container>
    <v-row justify-md="center" justify-sm="center" justify-xs="center" justify-lg="center">
      <v-col xs="12" md="3">
        <h1>Profile Page</h1>
      </v-col>
    </v-row>
    <v-row justify-md="center" justify-sm="center" justify-xs="center" justify-lg="center">
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
      <v-col xs="12" md="3" align-self="center">
        <div>Name:</div>
        <div class="font-weight-medium">Pradnyesh</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>