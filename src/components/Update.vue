<template lang="html">
  <div class="fullsize">
    <Header isActive="update" />
    <div class="w3-card opacityTest w3-hide-small" style="width:75%;margin:auto;">
      <header class="w3-container opacityTest2 w3-text-white">
        <h2>Update or Delete a meteor</h2>
      </header>
      <form action="" method="get" class="w3-container w3-text-white" v-on:submit.prevent="search">
        <div v-if="loading">
          <label for="">ID</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="id">

          <label for="">Name</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="name">
        </div>
        <div v-else v-for="(item, index) in data" :key="index">
          <label for="">ID</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="id">

          <label for="">Name</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="newName" :placeholder="item.name">

          <label for="">Mass</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="mass" :placeholder="item.mass">

          <label for="">Class</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="recclass" :placeholder="item.recclass">

          <label for="">Longitude</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="long" :placeholder="item.reclong">

          <label for="">Latitude</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="lat" :placeholder="item.reclat">

          <label for="">Year</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="date" :placeholder="dateFell(item.year)">
        </div>
        <div v-if="waiting" class="w3-container w3-center">
          <p><i class="fa fa-spinner w3-spin w3-text-white" style="font-size:64px"></i></p>
        </div>

        <input v-if="loading" type="submit" class="w3-btn w3-blue-gray" name="" value="Search">

        <div v-if="!loading">
          <button class="w3-btn w3-blue-gray" type="button" name="button" v-on:click="updating">Update</button>
          <button class="w3-btn w3-blue-gray" type="button" name="button" v-on:click="deleting">Delete</button>
          <button class="w3-btn w3-blue-gray" type="button" name="button" v-on:click="searching">New Search</button>
          <div v-if="waiting2" class="w3-container w3-center">
          <i class="fa fa-spinner w3-spin w3-text-white" style="font-size:16px"></i>
          </div>
        </div>
      </form>
    </div>
    <div class="w3-card opacityTest w3-hide-medium w3-hide-large" style="width:90%;margin:auto;">
      <header class="w3-container opacityTest2 w3-text-white">
        <h4>Update or Delete a meteor</h4>
      </header>
      <form action="" method="get" class="w3-container w3-text-white" v-on:submit.prevent="search">
        <div v-if="loading">
          <label for="">ID</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="id">

          <label for="">Name</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="name">
        </div>
        <div v-else v-for="(item, index) in data" :key="index">
          <label for="">ID</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="id">

          <label for="">Name</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="newName" :placeholder="item.name">

          <label for="">Mass</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="mass" :placeholder="item.mass">

          <label for="">Class</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="recclass" :placeholder="item.recclass">

          <label for="">Longitude</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="long" :placeholder="item.reclong">

          <label for="">Latitude</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="lat" :placeholder="item.reclat">

          <label for="">Year</label>
          <input type="text" class="w3-input opacity w3-text-white" name="" value="" v-model="date" :placeholder="dateFell(item.year)">
        </div>
        <div v-if="waiting" class="w3-container w3-center">
          <p><i class="fa fa-spinner w3-spin w3-text-white" style="font-size:64px"></i></p>
        </div>

        <input v-if="loading" type="submit" class="w3-btn w3-blue-gray" name="" value="Search">

        <div v-if="!loading">
          <button class="w3-btn w3-blue-gray" type="button" name="button" v-on:click="updating">Update</button>
          <button class="w3-btn w3-blue-gray" type="button" name="button" v-on:click="deleting">Delete</button>
          <button class="w3-btn w3-blue-gray" type="button" name="button" v-on:click="searching">New Search</button>
          <div v-if="waiting2" class="w3-container w3-center">
          <i class="fa fa-spinner w3-spin w3-text-white" style="font-size:16px"></i>
          </div>
        </div>
      </form>
    </div>
    <div v-if="message" class="w3-text-white">
      {{message}}
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Update',
  components: {
    Header
  },
  data() {
    return {
      id: '',
      name: '',
      newName: '',
      mass: '',
      recclass: '',
      lat: '',
      long: '',
      date: '',
      data: null,
      loading: true,
      erroring: false,
      waiting: false,
      waiting2: false,
      message: ''
    }
  },
  methods: {
    dateFell(input) {
      return moment(input).format("YYYY");
    },
    reseting() {
      this.id = '';
      this.name = '';
      this.newName = '';
      this.recclass = '';
      this.lat = '';
      this.long = '';
      this.date = '';
      this.data = null;
    },
    searching() {
      this.reseting();
      this.waiting = false;
      this.loading = true;
    },
    search() {
      this.waiting = true;
      const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
      let url;
      this.id ? url = `${API_URL}`+this.id : url = `${API_URL}?name=`+this.name;

      axios.get(url)
      .then(response => {
        this.data = JSON.parse(response.data);
      })
      .catch(() => {
        this.erroring = true;
      })
      .finally(() => {
        this.loading = false;
        this.waiting = false;
      })
    },
    updating() {
      this.waiting2 = true;
      this.message = '';
      const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
      let url = `${API_URL}?id=`+this.id+'&name='+this.name+'&newName='+this.newName+'&mass='+this.mass+'&classMeteor='+this.recclass+'&lat='+this.lat+'&long='+this.long+'&date='+this.date;
      if(moment(this.date).isSameOrAfter("2048-01-01", 'year')) {
        this.message = "You FOOL! The earth will be gone by then !";
        this.waiting2 = false;
      }
      else {
        axios.put(url)
        .then(() => {
          this.message = 'meteor was updated';
        })
        .catch(() => {
          this.erroring = true;
        })
        .finally(() => {
          this.waiting2 = false;
        })
      }
    },
    deleting() {
      this.message = '';
      this.waiting2 = true;
      const API_URL = 'https://limitless-peak-14538.herokuapp.com/meteor/';
      let url;
      this.id ? url = `${API_URL}`+this.id : `${API_URL}?name=`+this.name+'&mass='+this.mass+'&date='+this.date;

      axios.delete(url)
      .then(() => {
        this.message = 'Galactus is pleased';
        this.waiting = false;
        this.loading = true;
      })
      .catch(() => {
        this.erroring = true;
      })
      .finally(() => {
        this.reseting();
        this.waiting2 = false;
      })
    }
  }
}
</script>

<style scoped>
.opacity {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
