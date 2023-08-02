<template>
  <div class="order">
    <Order></Order>
    <Sales></Sales>
  </div>
</template>

<script>
import Order from './components/Order.vue'
import Sales from './components/Sales.vue'
export default {
  components: {
    Order,
    Sales
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>