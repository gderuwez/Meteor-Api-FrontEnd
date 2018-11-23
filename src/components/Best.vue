<template lang="html">
  <div class="fullsize">
    <Header isActive="best" />
    <div v-if="loading" class="w3-container w3-text-white w3-center">
      <p><i class="fa fa-spinner w3-spin w3-text-white" style="font-size:64px"></i></p>
    </div>
    <div v-else class="w3-container">
      <div class="w3-card opacityTest w3-half">
        <header class="w3-container opacityTest2">
          <h2 class="w3-text-white w3-hide-small">Top 5 according to captain random</h2>
          <h4 class="w3-text-white w3-hide-large w3-hide-medium">Top 5 according to captain random</h4>
        </header>
        <div class="w3-ul w3-text-white">
          <li v-for="(item, index) in data" :key="index">
            <p>Name: {{item.name}}</p>
            <p>Class: {{item.recclass}}</p>
            <p>Mass: {{item.mass}} kg</p>
            <p>Year: {{datefell(item.year)}}</p>
          </li>
        </div>
      </div>
      <div class="w3-margin-top w3-card opacityTest w3-half">
        <header class="w3-container opacityTest2">
          <h2 class="w3-text-white w3-hide-small">Top 5 perso</h2>
          <h4 class="w3-text-white w3-hide-large w3-hide-medium">Top 5 perso</h4>
        </header>
        <div class="w3-ul w3-text-white">
          <li v-for="(item, index) in data2" :key="index">
            <p>Name: {{item.name}}</p>
            <p>Class: {{item.recclass}}</p>
            <p>Mass: {{item.mass}} kg</p>
            <p>Year: {{datefell(item.year)}}</p>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: "Best",
  components: {
    Header
  },
  data () {
    return {
      data : [],
      data2: [],
      loading: true,
      erroring: false
    }
  },
  methods: {
    random() {
      const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
      let url = `${API_URL}?random=true`;

      return axios.get(url);
    },
    notRandom(input) {
      const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
      let url = `${API_URL}`+ input;

      return axios.get(url);
    },
    datefell(input) {
      return moment(input).format('YYYY');
    }
  },
  mounted() {
    axios.all([this.random(), this.random(), this.random(), this.random(), this.random(), this.notRandom('10'), this.notRandom('1'), this.notRandom('5032'), this.notRandom('4910'), this.notRandom('11875')])
    .then(axios.spread( (first, second, third, fourth, fifth, sixth, seventh, eight, ninth, tenth) => {
      this.data.push(JSON.parse(first.data)[0]);
      this.data.push(JSON.parse(second.data)[0]);
      this.data.push(JSON.parse(third.data)[0]);
      this.data.push(JSON.parse(fourth.data)[0]);
      this.data.push(JSON.parse(fifth.data)[0]);

      let nSixth = JSON.parse(sixth.data);
      let nSeventh = JSON.parse(seventh.data);
      let nEight = JSON.parse(eight.data);
      let nNinth = JSON.parse(ninth.data);
      let nTenth = JSON.parse(tenth.data);

      this.data2.push(nSixth[Object.keys(nSixth)]);
      this.data2.push(nSeventh[Object.keys(nSeventh)]);
      this.data2.push(nEight[Object.keys(nEight)]);
      this.data2.push(nNinth[Object.keys(nNinth)]);
      this.data2.push(nTenth[Object.keys(nTenth)]);

    }))
    .catch(() => {
      this.erroring = true;
    })
    .finally(() => {
      this.loading = false;
    })
  }
}
</script>

<style scoped>
</style>
