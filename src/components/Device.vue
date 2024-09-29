<template>
  <!-- <h2>Device Info: {{ device.ProductModel }} (ID: {{ device.id }})</h2> -->
   <div class="device-info" v-if="device" :class="{'hovered': hovered}">
      <div class="row">
        <div class="col-auto">
          <img v-if="device.DisplayedSignalStrength == 'Poor'" class="icon" width="24" src="./../assets/signal-1.svg" /> 
          <img v-if="device.DisplayedSignalStrength == 'Medium'" class="icon" width="24" src="./../assets/signal-2.svg" /> 
          <img v-if="device.DisplayedSignalStrength == 'Good'" class="icon" width="24" src="./../assets/signal-3.svg" /> 
        </div>
        <div class="col-auto">
          <!-- Low, OneThird, TwoThirds, ThreeThirds ? , Full ? -->
          <img v-if="device.BatteryLevel == 'Low'" class="icon rotated" width="30" src="./../assets/battery-0.svg" /> 
          <img v-if="device.BatteryLevel == 'OneThird'" class="icon rotated" width="30" src="./../assets/battery-1.svg" /> 
          <img v-if="device.BatteryLevel == 'TwoThirds'" class="icon rotated" width="30" src="./../assets/battery-2.svg" /> 
          <img v-if="device.BatteryLevel == 'ThreeThirds' || device.BatteryLevel == 'Full' || device.BatteryLevel == 'High'" class="icon rotated" width="30" src="./../assets/battery-3.svg" /> 
        </div>
      </div>

  <!-- <strong>Node ID:</strong> {{ device.NodeId }} -->
  <!-- <strong>Product Type:</strong> {{ device.ProductType }} -->
  <!-- <strong>Firmware Version:</strong> {{ device.ActiveFirmwareVersion }} -->
  <!-- <strong>Serial Number:</strong> {{ device.SerialNumber }} -->
  <!-- Poor, Medium, Good -->
  <!-- <strong>Battery Voltage:</strong> {{ device.BatteryVoltage / 10 }} V -->
  <!-- <strong>RSSI (Controller):</strong> {{ device.ReceptionOfController.Rssi }} dBm -->
  <!-- <strong>LQI (Controller):</strong> {{ device.ReceptionOfController.Lqi }} -->
  <!-- <strong>RSSI (Device):</strong> {{ device.ReceptionOfDevice.Rssi }} dBm -->
  <!-- <strong>LQI (Device):</strong> {{ device.ReceptionOfDevice.Lqi }} -->
  <!-- <strong>Device Lock Enabled:</strong> {{ device.DeviceLockEnabled ? 'Yes' : 'No' }} -->
  <!-- <Signal :rssi="device.ReceptionOfDevice.Rssi"/> -->
  </div>
</template>

<script>
import axios from "../http.js";

export default {
    props: ["valveId", "hovered"],
    components: {
    },
    data: function(){
        return {
            device: null,
        }
    },
    mounted() {
      axios.get("/data/domain/Device/"+this.valveId).then((res) => {
        this.device = res.data;
      });
    },
}
</script>



<style scoped>
.device-info {
  transition: all 0.3s ease-in-out;
  padding: 14px 28px;
  transform: translateY(-100%);
}
.device-info.hovered{
  transform: translateY(0%);
}
.rotated {
  transform: rotate(90deg);
}
</style>

