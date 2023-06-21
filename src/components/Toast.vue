<template>
  <div class="toast">{{ toastMessage }}</div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Toast",
  props: ["toastMessage"],
};
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: "",
  });
  const showToast = (msg) => {
    toastData.toastMessage = msg;
    toastData.showToast = true;
    setTimeout(() => {
      toastData.showToast = false;
    }, 1000);
  };
  return { toastData, showToast };
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style/variables.scss";
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 5rem;
  color: $bgColor;
}
</style>
