<template>
  <b-alert :show="show" class="banner" dismissible>
    {{ text }}
  </b-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: () => "",
    },

    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
