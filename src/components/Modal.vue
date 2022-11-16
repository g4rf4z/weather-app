<template>
  <transition name="modal-outer">
    <div id="container" v-show="modalActive">
      <transition name="modal-inner">
        <div id="content" v-if="modalActive">
          <slot></slot>
          <button @click="$emit('close-modal')">Close</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  modalActive: { type: Boolean, default: false },
});

defineEmits(["close-modal"]);
</script>

<style lang="scss" scoped>
#container {
  @apply h-screen w-full px-8 flex justify-center absolute top-0 right-0 bottom-0 left-0 text-black bg-black bg-opacity-30;
}

#content {
  @apply max-w-screen-md mt-36 p-4 self-start bg-white;
}

button {
  @apply mt-8 py-2 px-6 text-white bg-weather-primary;
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
