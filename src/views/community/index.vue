<template>
  <div class="community-mine-wrap">
    <template v-if="notHave">
      <uu-sub-tab
        show-button
        :sub-btn="{text:'创建'}"
        @handle-btn="$router.push('/community/create')"
      ></uu-sub-tab>
      <div class="no-data-community">
        您还没有创建社群。
      </div>
    </template>
    <template v-else>

    </template>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        notHave: true
      }
    },
    methods: {},
    created() {

    }

  }
</script>

<style scoped>

</style>
