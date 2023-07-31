<template>
  <h1 v-if="msg" class="message" @click="log">{{ msg }}</h1>
  <Hello />
</template>

<script>
import Hello from '~/components/Hello';
export default {
  components: {
    Hello,
  },
  data() {
    return {
      msg: 'Hello webpack?',
    };
  },
  methods: {
    log() {
      window.addEventListener();
    },
  },
};
</script>
<style>
h1 {
  color: red;
}
</style>
