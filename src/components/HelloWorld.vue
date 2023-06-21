<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div>
    <input v-model="value" />
    <button @click="clickMe">提交</button>
  </div>
  <!-- <ul v-for="i in items" :key="i">
    <li>{{ i }}</li>
  </ul> -->
  <ul v-for="i in items" :key="i">
    <list-item :msg="i" />
  </ul>
</template>

<script>
import listItem from './ListItem.vue'
export default {
  name: 'HelloWorld',
  components: { listItem },
  data() {
    let items = [1, 2, 3]
    let value = ''
    return {
      items,
      value,
    }
  },
  methods: {
    clickMe() {
      this.items.push(this.value)
      this.value = ''
      console.log(this.items)
    },
  },
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
