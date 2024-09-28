<template>
  <div class="signal-widget">
    <h3>Signal Strength</h3>
    <div class="bars">
      <div
        v-for="bar in signalBars"
        :key="bar.id"
        :class="[signalQuality, 'bar', bar.active ? 'active' : '']"
        :style="{ height: bar.height + '%' }"
      >&nbsp;</div>
    </div>
    <!-- <p>RSSI: {{ rssi }} dBm</p> -->
    <p>{{ signalQuality }}</p>
  </div>
</template>

<script>
export default {
  name: 'SignalStrengthWidget',
  props: {
    rssi: {
      type: Number,
      default: -84 // Default RSSI value, you can adjust this
    }
  },
  computed: {
  signalBars() {
    const barCount = 5;
    const rssiNormalized = Math.max(-100, Math.min(-30, this.rssi)); // Ensure RSSI stays in bounds
    // Calculate the number of active bars based on defined ranges
    const activeBars = Math.floor((barCount * (rssiNormalized + 100)) / 70); // Scale to 5 bars

    // Make sure that we handle edge cases correctly
    return Array.from({ length: barCount }, (_, i) => ({
      id: i,
      active: i < activeBars,
      height: (i + 1) * 20
    }));
  },
  // Convert the RSSI into a qualitative description
  signalQuality() {
    if (this.rssi > -50) return 'Excellent';
    if (this.rssi > -60) return 'Good';
    if (this.rssi > -70) return 'Fair';
    if (this.rssi > -80) return 'Weak';
    return 'Very Poor';
  }
}


};
</script>

<style scoped>
.signal-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 150px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

h3 {
  margin: 0;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.bars {
  display: flex;
  justify-content: space-between;
  width: 50px;
  margin-bottom: 10px;
}

.bar {
  width: 8px;
  background-color: #ccc;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}

.bar.active {
  background-color: #4caf50; /* Green color for active bars */
}

.bar.active.Fair{
    background-color: rgb(200, 240, 19);
}
.bar.active.Weak{
    background-color: orange;
}
.bar.active.Poor{
    background-color: red;
}

p {
  margin: 5px 0;
  font-size: 0.9em;
}
</style>
