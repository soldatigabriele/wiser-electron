<template>
  <div class="room" :class="{'inactive': !enabled(this.localRoom)}" v-if="this.localRoom">
    <div class="row mb-2">
      <div class="col">
        <div class="room-name">
          {{ this.localRoom.Name }} 
        </div>
        <div class="d-flex justify-content-center">
          <div class="room-temperature">
            {{calculateTemperature(this.localRoom.CalculatedTemperature)}}
          </div>
          <div class="room-target" v-if="enabled(this.localRoom)">
            <span v-if="this.localRoom.CurrentSetPoint == '-200'"> / OFF</span>
            <span v-else>/ {{this.localRoom.CurrentSetPoint/10}}°</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2" v-if="enabled(this.localRoom)">
      <div class="col">
        <div class="title">
          Temperature
        </div>
        <button class="me-2 btn btn-outline-secondary" @click="setTemperature(-200)">Off</button>
        <button class="me-2 btn btn-outline-secondary" @click="setTemperature(100)">10°</button>
        <button class="me-2 btn btn-outline-secondary" @click="setTemperature(180)">18°</button>
        <button class="me-2 btn btn-outline-secondary" @click="setTemperature(190)">19°</button>
        <button class="me-2 btn btn-outline-secondary" @click="setTemperature(200)">20°</button>
        <button class="me-2 btn btn-outline-secondary" @click="setTemperature(220)">22°</button>
        <button class="me-2 btn btn-outline-secondary" @click="setTemperature(240)">24°</button>
      </div>
    </div>
    <div class="row mb-2" v-if="enabled(this.localRoom)">
      <div class="col">
        <div class="title">
          Boost
        </div>
        <button class="me-2 btn btn-outline-secondary" @click="turnOffBoost()">Off</button>
        <button class="me-2 btn btn-outline-secondary" @click="boostTemperature(30)">30m</button>
        <button class="me-2 btn btn-outline-secondary" @click="boostTemperature(60)">1h</button>
        <button class="me-2 btn btn-outline-secondary" @click="boostTemperature(120)">2h</button>
        <button class="me-2 btn btn-outline-secondary" @click="boostTemperature(180)">3h</button>
      </div>
    </div>
    <div v-for="valveId, key in this.localRoom.SmartValveIds" :key="key">
      <Device class="d-none" :valve-id="valveId" :key="valveId"></Device>
    </div>
  </div>
</template>

<script>
import axios from "./../http.js";
import Toastify from 'toastify-js'
import Device from './Device.vue'
import "toastify-js/src/toastify.css"

export default {
  name: "Room",
  props: ["room"],
  components: {Device},
  data: function () {
    return {
      localRoom: this.room,
    }
  },
  computed(){
    },
  methods: {
    enabled: (room) => {
      return room.SmartValveIds.length > 0
    },
    calculateTemperature(temp){
      if(temp < -100) {
        return ''
      }
      return temp/10 + "°";
    },
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
      this.$emit("updating")
      axios
        .patch("/data/domain/Room/" + this.localRoom.id, patchData)
        .then((response) => {
          // Handle successful response
          console.log("successfully changed room temperature", response.data);
          this.localRoom = response.data

          Toastify({
            text: "Success",
            duration: 1500,
            style: {
              background: "#5bd469",
            },
          }).showToast();
        })
        .catch((error) => {
          // Handle error response
          console.log(error.response.data);

          Toastify({
            text: "Something went wrong",
            duration: 1500,
            style: {
              background: "#d45b5b",
            },
          }).showToast();
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
  color: #333;
  /* border: 1px solid gray; */
  margin-bottom: 16px;
  padding: 24px;
  border-radius: 8px;
  font-size: 1.3em;
  /* min-height: 240px; */
  /* height: 100%; */
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  background: white;
  /* box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

}

.room.inactive {
  background: #eee;
  color: #999;
}
.room-name {
  font-size: 1.4em;
}
.room-temperature {
  font-size: 1.3em;
  font-weight: bold;
}
.room-target {
  padding: 0 8px;
  color: #aaa;
}


.room:hover {
  /* box-shadow: 0 16px 50px rgba(0, 0, 0, 0.2); */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  /* transform: translateY(-1px); */
}

.title{
  padding-bottom: 16px 0 8px 0;
}
</style>
