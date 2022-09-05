<template>
  <transition name="modal-outer">
    <div class="container" v-show="modalActive">
      <transition name="modal-inner">
        <div class="content" v-if="modalActive">
          <slot />
          <button @click="$emit('close-modal')">Close</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close-modal"]);
</script>

<style lang="scss" scoped>
.container {
  @apply absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8;
}

.content {
  @apply p-4 bg-white self-start mt-32 max-w-screen-md;
}

button {
  @apply text-white mt-8 bg-weather-primary py-2 px-6;
}

.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
1
