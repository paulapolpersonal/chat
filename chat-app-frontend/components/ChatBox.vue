<template>
  <div class="container">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      <div
        class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
      >
        <input class="fs-5 fw-semibold" v-model="username" />
      </div>
      <div class="list-group list-group-flush border-bottom scrollarea">
        <div
          class="list-group-item list-group-item-action py-3 lh-tight"
          v-for="message in messages"
          :key="message"
        >
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{ message.username }}</strong>
          </div>
          <div class="col-10 mb-1 small">{{ message.message }}</div>
        </div>
      </div>
    </div>
    <form @submit.prevent="submit">
      <input
        class="form-control"
        placeholder="Write a message"
        v-model="message"
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "username",
      message: "",
      messages: [],
    };
  },
};
</script>

<style>
.scrollarea {
  min-height: 500px;
}
</style>