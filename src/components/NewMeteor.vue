<template lang="html">
  <div class="fullsize">
    <Header isActive="new" />
    <div class="w3-card w3-hide-small opacityTest" style="width:75%;margin:auto;">
      <header class="w3-container opacityTest2">
        <h2 class="w3-text-white">Add a new meteor</h2>
      </header>
      <form class="w3-text-white" action="" method="post" v-on:submit.prevent="posting">
        <label for="">Name</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="name" :class="{'w3-border-red' : !name}">

        <label for="">Class</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="recclass" :class="{'w3-border-red' : !recclass}">

        <label for="">Mass</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="mass" :class="{'w3-border-red' : !mass}">

        <label for="">Latitude</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="lat" :class="{'w3-border-red' : !lat}">

        <label for="">Longitude</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="long" :class="{'w3-border-red' : !long}">

        <label for="">Date</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="date" :class="{'w3-border-red' : !date}">
        <input class="w3-btn w3-blue-gray" type="submit" name="" value="Post">
      </form>
      <div v-if="waiting" class="w3-container w3-text-white w3-center">
        <p><i class="fa fa-spinner w3-spin w3-text-white" style="font-size:64px"></i></p>
      </div>
      <div class="w3-text-white w3-center">
        {{message}}
        <img v-if="message2" src="../assets/boom.gif" alt="Nostradamus dies" class="w3-image">
      </div>
    </div>
    <div class="w3-card w3-hide-medium w3-hide-large" style="width:90%;margin:auto;">
      <header class="w3-container opacityTest2">
        <h4 class="w3-text-white">Add a new meteor</h4>
      </header>
      <form class="w3-text-white" action="" method="post" v-on:submit.prevent="posting">
        <label for="">Name</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="name" :class="{'w3-border-red' : !name}">

        <label for="">Class</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="recclass" :class="{'w3-border-red' : !recclass}">

        <label for="">Mass</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="mass" :class="{'w3-border-red' : !mass}">

        <label for="">Latitude</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="lat" :class="{'w3-border-red' : !lat}">

        <label for="">Longitude</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="long" :class="{'w3-border-red' : !long}">

        <label for="">Date</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="date" :class="{'w3-border-red' : !date}">
        <input class="w3-btn w3-blue-gray" type="submit" name="" value="Post">
      </form>
      <div v-if="waiting" class="w3-container w3-text-white w3-center">
        <p><i class="fa fa-spinner w3-spin w3-text-white" style="font-size:64px"></i></p>
      </div>
      <div class="w3-text-white w3-center">
        {{message}}
        <img v-if="message2" src="../assets/boom.gif" alt="Nostradamus dies" class="w3-image">
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import Header from './Header.vue'

export default {
  name: "NewMeteor",
  components: {
    Header
  },
  data() {
    return {
      name: '',
      recclass : '',
      mass: '',
      lat: '',
      long: '',
      date: '',
      waiting: false,
      erroring: false,
      message: null,
      message2: false
    }
  },
  methods: {
    reseting() {
      this.name = '';
      this.recclass = '';
      this.mass = '';
      this.lat = '';
      this.long = '';
      this.date = '';
      this.message = null;
      this.message2 = false;
    },
    posting() {
      this.message = '';
      this.waiting = true;
      const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
      let url = `${API_URL}?name=`+this.name+'&mass='+this.mass+'&classMeteor='+this.recclass+'&lat='+this.lat+'&long='+this.long+'&date='+this.date;

      if(this.name && this.recclass && this.mass && this.lat && this.long && this.date) {
        if(moment(this.date).isSameOrAfter("2048-01-01", 'year')) {
          this.message = "You FOOL! The earth will be gone by then !";
          this.message2 = true;
          this.waiting = false;
        }
        else {
          axios.post(url)
          .then(() => {
            this.message = "A new meteor was added";
          })
          .catch(() => {
            this.erroring = true;
          })
          .finally(() => {
            this.waiting = false;
            setTimeout(this.reseting, 2000);
          })
        }
      }
      else {
        this.waiting = false;
        this.message = 'Fill the form !'
      }
    }
  }
}
</script>

<style scoped>
.opacity {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
