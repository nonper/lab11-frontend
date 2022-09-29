<template>
  <div class="event-card">
    <h4>Type: {{ auction.type }}</h4>
    <span>Description: {{ auction.description }}</span>
    <h5 v-for="bid in auction.bids" :key="bid.id">
      {{ bid.amount }} || Date@ {{ bid.datetime }}
    </h5>
  </div>
</template>
<script>
export default {
  name: 'EventCard',
  props: {
    auction: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
