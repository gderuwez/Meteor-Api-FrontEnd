<template lang="html">
  <div class="fullsize">
    <Header isActive="search"/>
    <div class="w3-card w3-text-white opacityTest w3-hide-small" style="width:75%;margin:auto;">
      <header class="w3-container opacityTest2">
        <h2>Search for meteorites</h2>
      </header>
      <div class="w3-container">
        <h4>Fill one or more field to refine your search</h4>
      </div>
      <form class="w3-container" action="" method="get" v-on:submit.prevent="search">
        <label for="">Name</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="name">

        <label for="">ID</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="id">

        <label for="">Class</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="recclass">

        <label for="">mass</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="mass">

        <label for="">min</label>
        <input class="w3-input opacity w3-text-white" type="text" name="min" value="" v-model="min">

        <label for="">max</label>
        <input class="w3-input opacity w3-text-white" type="text" name="min" value="" v-model="max">

        <label for="">Year</label>
        <input class="w3-check w3-margin-left opacity" type="checkbox" name="" value="before" v-model="before"> before
        <input class="w3-check w3-margin-left opacity" type="checkbox" name="" value="after" v-model="after"> after
        <input class="w3-input opacity w3-text-white" type="text" name="" value="">

        <input class="w3-btn w3-blue-gray" type="submit" name="" value="Search">
      </form>
    </div>
    <div class="w3-card w3-text-white opacityTest w3-hide-medium w3-hide-large" style="width:90%;margin:auto;">
      <header class="w3-container opacityTest2">
        <h4 class="w3-hide-medium w3-hide-large">Search for meteorites</h4>
      </header>
      <div class="w3-container">
        <h6 class="w3-hide-medium w3-hide-large">Fill one or more field to refine your search</h6>
      </div>
      <form class="w3-container" action="" method="get" v-on:submit.prevent="search">
        <label for="">ID</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="id">

        <label for="">mass</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="mass">

        <label for="">min</label>
        <input class="w3-input opacity w3-text-white" type="text" name="min" value="" v-model="min">

        <label for="">max</label>
        <input class="w3-input opacity w3-text-white" type="text" name="min" value="" v-model="max">

        <label for="">Name</label>
        <input class="w3-input opacity w3-text-white" type="text" name="" value="" v-model="name">

        <label for="">Year</label>
        <input class="w3-check w3-margin-left opacity" type="checkbox" name="" value="before" v-model="before"> before
        <input class="w3-check w3-margin-left opacity" type="checkbox" name="" value="after" v-model="after"> after
        <input class="w3-input opacity w3-text-white" type="text" name="" value="">

        <div class="w3-display-container" style="height:50px;">
          <input class="w3-btn w3-blue-gray w3-display-middle" type="submit" name="" value="Search">
        </div>

      </form>
    </div>
    <div v-if="waiting" class="w3-container w3-text-white w3-center">
      <p><i class="fa fa-spinner w3-spin w3-text-white" style="font-size:64px"></i></p>
    </div>
    <div v-if="!loading" class="w3-card opacityTest w3-text-white w3-margin-top w3-hide-small" style="width:75%;margin:auto;">
      <header class="w3-container opacityTest2">
        <h2>Your search results</h2>
      </header>
      <ul class="w3-ul">
        <li :key="index" v-for="(item, index) in data" class="w3-border">
          <p>Name: {{item.name}} </p>
          <p>Mass: {{item.mass}}</p>
          <p>Class: {{item.recclass}}</p>
          <p>Fell in: {{datefell(item.year)}}</p>
        </li>
      </ul>
    </div>
    <div v-if="!loading" class="w3-card opacityTest w3-text-white w3-margin-top w3-hide-medium w3-hide-large" style="width:90%;margin:auto;">
      <header class="w3-container opacityTest2">
        <h4>Your search results</h4>
      </header>
      <ul class="w3-ul">
        <li :key="index" v-for="(item, index) in data" class="w3-border">
          <p>Name: {{item.name}} </p>
          <p>Mass: {{item.mass}}</p>
          <p>Class: {{item.recclass}}</p>
          <p>Fell in: {{datefell(item.year)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Search',
  components: {
    Header
  },
  data() {
    return {
      data: null,
      loading: true,
      errorring: false,
      waiting: false,
      id: '',
      mass: '',
      recclass: '',
      min: '',
      max: '',
      name: '',
      year: '',
      before: false,
      after: false
    }
  },
  watch: {
    before() {
      if(this.after) {
        if(this.before) {this.after = false;}
      }
    },
    after() {
      if(this.before) {
        if(this.after) {this.before = false;}
      }
    }
  },
  methods: {
    datefell(input) {
      return moment(input).format('YYYY');
    },
    search() {
      this.data = null;
      this.waiting = true;
      const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
      let url;
      this.id ? url = `${API_URL}`+this.id : url = `${API_URL}?mass=`+this.mass+'&recclass='+this.recclass+'&min='+this.min+'&max='+this.max+'&name='+this.name+'&year='+this.year+'&before='+this.before+'&after='+this.after ;

      axios.get(url)
      .then(response => {
        this.data = JSON.parse(response.data);
      })
      .catch(() => {
        this.errorring = true;
      })
      .finally(() => {
        this.loading = false;
        this.waiting = false;
      })
    }
  }
}
</script>

<style scoped>
  h2, h4, li {
    padding-left: 16px;
  }
  .opacity {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
