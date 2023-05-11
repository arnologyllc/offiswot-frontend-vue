<template>
  <el-dialog
    v-model="props.dialogVisible"
    width="200px"
    class="errorDialog"
    :show-close="false"
    :show-header="false"
    @close="closeModal"
  >
    <div class="dialog-text">
      <span :class="textColor" v-html="errorText"></span>
    </div>
    <template #footer>
      <img
        class="close_btn"
        src="@/assets/images/icons/modal-close-icon.svg"
        @click="closeModal"
      />
    </template>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  errorText: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    default: 'weak',
  },
})

const closeModal = () => {
  instance.emit('visible')
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
.dialog-text {
  padding: 12px 16px !important;
}

.close_btn {
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>
