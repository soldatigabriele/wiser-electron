<template>
   <div class="device-info" v-if="device">
    <!-- <h2>Device Info: {{ device.ProductModel }} (ID: {{ device.id }})</h2> -->
    <ul>
      <!-- <li><strong>Node ID:</strong> {{ device.NodeId }}</li> -->
      <!-- <li><strong>Product Type:</strong> {{ device.ProductType }}</li> -->
      <!-- <li><strong>Firmware Version:</strong> {{ device.ActiveFirmwareVersion }}</li> -->
      <!-- <li><strong>Serial Number:</strong> {{ device.SerialNumber }}</li> -->
      <li><strong>Signal:</strong> {{ device.DisplayedSignalStrength }}</li>
      <!-- <li><strong>Battery Voltage:</strong> {{ device.BatteryVoltage / 10 }} V</li> -->
      <li><strong>Battery:</strong> {{ device.BatteryLevel }}</li>
      <!-- <li><strong>RSSI (Controller):</strong> {{ device.ReceptionOfController.Rssi }} dBm</li> -->
      <!-- <li><strong>LQI (Controller):</strong> {{ device.ReceptionOfController.Lqi }}</li> -->
      <!-- <li><strong>RSSI (Device):</strong> {{ device.ReceptionOfDevice.Rssi }} dBm</li> -->
      <!-- <li><strong>LQI (Device):</strong> {{ device.ReceptionOfDevice.Lqi }}</li> -->
      <!-- <li><strong>Device Lock Enabled:</strong> {{ device.DeviceLockEnabled ? 'Yes' : 'No' }}</li> -->
      <li>
        <Signal :rssi="device.ReceptionOfDevice.Rssi"/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "../http.js";
import Signal from "./Signal.vue";

export default {
    props: ["valveId"],
    components: {Signal},
    data: function(){
        return {
            device: null,
        }
    },
     computed: {
        // Calculate the number of active bars based on the RSSI value
        signalBars() {
        const barCount = 5;
        const activeBars = Math.max(0, Math.min(barCount, Math.floor((this.rssi + 100) / 20)));

        return Array.from({ length: barCount }, (_, i) => ({
            id: i,
            active: i < activeBars,
            height: (i + 1) * 20
        }));
        },
    },
    mounted() {
        this.getDevice();
    },
    methods: {
        getDevice() {
            axios.get("/data/domain/Device/"+this.valveId).then((res) => {
                this.device = res.data;
            });



        }
    }
}
</script>



<style scoped>
.device-info {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
}

.device-info h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.device-info ul {
  list-style-type: none;
  padding: 0;
}

.device-info li {
  margin-bottom: 10px;
}

</style>

