<template>

  <div class="loading-container d-flex align-items-center justify-content-center"  v-if="loading">
      <div class="spinner-border" role="status"></div>
  </div>

  <div class="container-fluid">
    <div class="row py-5 justify-content-center">
      <div class="col-auto">
        <img alt="logo" width="180" src="./assets/wiser.png" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-xl-6" v-for="room in rooms" :key="room.id">
        <Room :room="room" @updating="loading=true" @updated="loading=false;" />
      </div>
    </div>
  </div>
 
  <div class="reload">
    <a href="" :disabled="loading" @click.prevent="reload">
      <img src="./assets/reload.svg" width="20">
    </a>
  </div>

  <pre>
    <!-- {{rooms}} -->
  </pre>


<!-- 
  <h2>System:</h2>
  <ul>
    <li>T emperature: {{ system.temperature }}</li>
    <li>Mode: {{ system.SystemMode }}</li>
  </ul>

  <pre>
  {{system}}
  </pre>
  <h2>Smart Plug</h2>
  <ul>
    <li v-for="plug in system.SmartPlugs" :key="plug.id">{{plug.Name}} {{plug.State}}</li>
  </ul> -->
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";

import Room from "./components/Room.vue";
import axios from "./http.js";
import Toastify from 'toastify-js'

import "toastify-js/src/toastify.css"

export default {
  name: "App",
  data() {
    return {
     loading: false,
      rooms: [],
      system: {},
      systemResponse: null,
    };
  },
  components: {
    Room,
  },
  mounted() {
    this.getRooms();
    this.getSystem();
  },
  methods: {
    reload(){
      this.loading = true

      Promise.all([this.getRooms(), this.getSystem()]).then(() => {
          Toastify({
            text: "Data Reloaded",
            duration: 1500,
            style: {
              // background: "#5bd469",
            },
          }).showToast();
          this.loading = false
        }).catch(()=>{
          Toastify({
            text: "Could not reload the data",
            duration: 1500,
            style: {
              background: "#d45b5b",
            },
          }).showToast();
          this.loading = false
        })
    },
    getRooms() {
      return new Promise((resolve, reject)=>{
        axios.get("/data/domain/Room").then((res) => {
          this.rooms = res.data;
          resolve()
        }).catch((error) => {
          console.log(error);
          Toastify({
            text: "Something went wrong",
            duration: 1500,
            style: {
              background: "#d45b5b",
            },
          }).showToast();
          reject()
        });
      })
    },
    getSystem() {
      return new Promise((resolve, reject)=>{
        axios
          .get("/data/domain/System")
          .then((response) => {
            this.systemResponse = response.data;
            this.system = response.data;
            resolve()
          })
          .catch((error) => {
            console.log(error);
            Toastify({
              text: "Something went wrong",
              duration: 1500,
              style: {
                background: "#d45b5b",
              },
            }).showToast();
            reject()
          })
      });
    },
  },
};
</script>

<style>
#app {
  height: 100vh;
  background: #3fcc59;
}

.loading-container {
  width: 100vw;
  height: 100vh;
  background: black;
  color:white;
  color:green;
  opacity: 0.5;
  position: absolute;
  z-index: 1;
}

.reload{
  position: absolute;
  bottom: 8px;
  right: 8px;
}
</style>
