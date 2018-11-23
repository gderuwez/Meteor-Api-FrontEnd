<template>
  <div class="fullsize">
    <Header isActive="home"/>
    <div v-if="loading" class="w3-container w3-text-white w3-center">
      <p><i class="fa fa-spinner w3-spin w3-text-white" style="font-size:64px"></i></p>
    </div>
    <div v-else>
      <div>
        <div class="w3-card opacityTest w3-hide-small" style="width:75%;margin:auto;">
          <header class="w3-container opacityTest2">
            <h2 class="w3-text-white">Metorite of the day</h2>
          </header>
          <div class="w3-container w3-text-white">
            <p>Name: {{data[0].name}} </p>
            <p>Mass: {{data[0].mass}}</p>
            <p>Class: {{data[0].recclass}}</p>
            <p>Fell in: {{datefell(data[0].year)}}</p>
          </div>
        </div>
        <div class="w3-card opacityTest w3-hide-medium w3-hide-large" style="width:90%;margin:auto;">
          <header class="w3-container opacityTest2">
            <h4 class="w3-text-white">Metorite of the day</h4>
          </header>
          <div class="w3-container w3-text-white">
            <p>Name: {{data[0].name}} </p>
            <p>Mass: {{data[0].mass}}</p>
            <p>Class: {{data[0].recclass}}</p>
            <p>Fell in: {{datefell(data[0].year)}}</p>
          </div>
        </div>
      </div>
      <div class="w3-card opacityTest w3-text-white w3-hide-small" style="width:75%;margin:auto;">
        <header class="w3-container opacityTest2">
          <h2>Meteorites this year</h2>
        </header>
        <ul class="w3-ul">
          <li :key="index" v-for="(item, index) in latest">
            <p>Name: {{item.name}} </p>
            <p>Mass: {{item.mass}}</p>
            <p>Class: {{item.recclass}}</p>
          </li>
        </ul>
      </div>
      <div class="w3-card opacityTest w3-text-white w3-hide-medium w3-hide-large" style="width:90%;margin:auto;">
        <header class="w3-container opacityTest2">
          <h4>Meteorites this year</h4>
        </header>
        <ul class="w3-ul">
          <li :key="index" v-for="(item, index) in latest">
            <p>Name: {{item.name}} </p>
            <p>Mass: {{item.mass}}</p>
            <p>Class: {{item.recclass}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Header from './Header.vue';

export default {
  name: 'HelloWorld',
  components: {
    Header
  },
  data() {
    return {
      data: null,
      latest: null,
      loading: true,
      errorring: false
    }
  },
  methods: {
    datefell(input) {
      return moment(input).format('YYYY');
    }
  },
  mounted() {
    const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
    const url = `${API_URL}?random=true`;
    const url2 = `${API_URL}?year=` + moment().format('YYYY');

    axios.get(url)
    .then(response => {
      this.data = JSON.parse(response.data);
    })
    .catch(() => {
      this.errorring = true;
    })
    .finally(() => {
      this.loading = false;
    })

    axios.get(url2)
    .then(response => {
      this.latest = JSON.parse(response.data);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  html, body {
    height: 100%;
  }
  .fullsize {
    min-height: 100%;
    position: relative;
    background-image: url("../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .opacityTest {
    background-color: rgba(124, 124, 124, 0.5);
  }
  .opacityTest2 {
    background-color: rgba(0, 0, 124, 0.5);
  }
</style>
