<template>
  <button class="delete-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.delete-btn {
  @apply flex flex-col gap-2 items-center duration-150 text-white cursor-pointer hover:text-red-500;
}
</style>
