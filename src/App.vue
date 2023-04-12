<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col">
        <img alt="Vue logo" src="./assets/wiser.png" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div v-for="room in rooms" :key="room.id">
          <Room :room="room" @updated="getRooms()" />
        </div>
      </div>
    </div>
  </div>
  <pre>
    {{rooms}}
  </pre>

  <h2>System:</h2>
  <ul>
    <li>Temperature: {{ system.temperature }}</li>
    <li>Mode: {{ system.SystemMode }}</li>
  </ul>
  <pre>
  {{systemResponse}}
  </pre>

  <h2>Smart Plug</h2>
  <ul>
    <li v-for="plug in system.SmartPlugs" :key="plug.id">{{plug.Name}} {{plug.State}}</li>
  </ul>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";

import Room from "./components/Room.vue";
import axios from "./http.js";

export default {
  name: "App",
  data() {
    return {
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
    getRooms() {
      console.log("get rooms");
      axios.get("/data/domain/Room").then((res) => {
        this.rooms = res.data;
      });
    },
    getSystem() {
      axios
        .get("/data/domain/System")
        .then((response) => {
          this.systemResponse = response.data;
          this.system = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
