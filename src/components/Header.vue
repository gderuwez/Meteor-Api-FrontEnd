<template lang="html">
  <div>
    <div class="w3-cell-row w3-indigo w3-border-bottom">
      <div class="w3-container w3-cell" style="width:25%">
        <button class="w3-button w3-xxlarge" v-on:click="toggleSideBar">&#9776;</button>
      </div>
      <h1 class="w3-hide-small w3-container w3-cell w3-cell-middle">Meteorites of the world</h1>
      <h4 class="w3-hide-medium w3-hide-large w3-container w3-cell w3-cell-middle">Meteorites of the world</h4>
    </div>

    <div v-if="isOpen" class="w3-sidebar w3-bar-block w3-indigo w3-animate-left" id="mySidebar">
      <router-link class="w3-bar-item w3-button" :to="{name: 'home'}" :class="{'w3-blue' : isActive === 'home'}">Home</router-link>
      <router-link class="w3-bar-item w3-button" :to="{name: 'best'}" :class="{'w3-blue' : isActive === 'best'}">Top 5</router-link>
      <router-link class="w3-bar-item w3-button" :to="{name: 'search'}" :class="{'w3-blue' : isActive === 'search'}">Search</router-link>
      <router-link class="w3-bar-item w3-button" :to="{name: 'update'}" :class="{'w3-blue' : isActive === 'update'}">Update</router-link>
      <router-link class="w3-bar-item w3-button" :to="{name: 'new'}" :class="{'w3-blue' : isActive === 'new'}">Add Meteor</router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Header',
  props: {
    isActive: String,
  },
  data () {
    return {
      isOpen : false
    }
  },
  methods: {
    toggleSideBar() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>

<style lang="css">
</style>
