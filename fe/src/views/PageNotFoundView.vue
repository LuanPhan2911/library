<script>
export default {
  name: "PageNotFound",
  setup(props) {},
};
</script>
<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="text-center">
      <h1 class="display-1 fw-bold">404</h1>
      <p class="fs-3"><span class="text-danger">Opps!</span> Page not found.</p>
      <p class="lead">The page you’re looking for doesn’t exist.</p>
      <router-link :to="{ name: 'home' }" class="btn btn-primary"
        >Go Home</router-link
      >
    </div>
  </div>
</template>
