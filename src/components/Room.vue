<template>
  <div class="d-flex justify-content-end">
    {{ this.room.Name }} {{this.room.CalculatedTemperature/10}}° :
    <span v-if="this.room.CurrentSetPoint == '-200'">OFF</span>
    <span v-else>{{this.room.CurrentSetPoint/10}}°</span>
    <button @click="setTemperature(-200)">Off</button>
    <button @click="setTemperature(100)">10°</button>
    <button @click="setTemperature(150)">15°</button>
    <button @click="setTemperature(180)">18°</button>
    <button @click="boostTemperature(30)">Boost 30m</button>
    <button @click="boostTemperature(60)">Boost 1h</button>
    <button @click="boostTemperature(120)">Boost 2h</button>
    <button @click="turnOffBoost()">Boost Off</button>
  </div>
</template>

<script>
import axios from "./../http.js";

export default {
  name: "Room",
  props: ["room"],
  methods: {
    turnOffBoost() {
      this.makeRequest({
        RequestOverride: {
          Type: "None",
          SetPoint: -200, // TODO check if we can use 0 instead
          Originator: "App",
        },
      });
    },
    boostTemperature(time) {
      let currentTemperature = this.room.CalculatedTemperature;
      let boostTemperature = Math.min(currentTemperature + 20, 290);
      this.setTemperature(boostTemperature, time);
    },
    setTemperature(temperature, time = null) {
      let patchData = {
        RequestOverride: {
          Type: "Manual",
          SetPoint: temperature,
          Originator: "App",
        },
      };

      if (time !== null) {
        patchData.RequestOverride.DurationMinutes = time;
      }

      this.makeRequest(patchData);
    },
    makeRequest(patchData) {
      console.log("patchData", patchData);
      axios
        .patch("/data/domain/Room/" + this.room.id, patchData)
        .then((response) => {
          // Handle successful response
          console.log("successfully changed room temperature", response.data);
        })
        .catch((error) => {
          // Handle error response
          console.log(error.response.data);
        })
        .finally(() => {
          this.$emit("updated");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.room {
}
</style>
