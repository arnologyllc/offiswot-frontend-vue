<template>
  <div class="main">
    <confirm-email
      :model="isOpenEmailDialog"
      @close="isOpenEmailDialog = false"
    ></confirm-email>
  </div>
</template>

<script>
import ConfirmEmail from '@/components/auth/AccessCheckModal.vue'

export default {
  name: 'TestPopUp',
  components: {
    ConfirmEmail,
  },
  layout: 'auth',
  data() {
    return {
      //  Request Body

      isOpenEmailDialog: true,
    }
  },
}
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.66);
}
</style>
