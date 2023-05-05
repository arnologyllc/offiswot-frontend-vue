<template>
  <el-dialog
    v-model="props.dialogVisible"
    width="200px"
    :show-close="false"
    :show-header="false"
    @close="closeModal"
  >
    <div class="dialog-text">
      <span v-html="errorText" :class="textColor"></span>
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
.el-dialog {
  display: flex;
  flex-direction: column;
  width: max-content !important;
  font-size: 12px;
  height: max-content;
  border-radius: 13px !important;
  background: #ffffff;
  margin-top: 220px !important;
  border: 1px solid #4f4cec;
  .el-dialog__header {
    display: none;
  }
  &__footer {
    position: absolute;
    text-align: left;
    width: 100%;
    padding: 0;
    margin: 0;
    bottom: -40px;
  }
  &__header {
    display: block;
  }
  &__body {
    padding: 0 !important;
  }
  .error_info {
    display: block;
    margin-top: 15px;
  }
}

.weak {
  color: #e60022 !important;
}
.done {
  color: #34b53a;
}

.warning {
  color: #ffa26b;
}
.close_btn {
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.el-dialog {
  display: flex;
  flex-direction: column;
  width: max-content !important;
  font-size: 12px;
  height: max-content;
  border-radius: 13px !important;
  background: #ffffff;
  margin-top: 220px !important;
  border: 1px solid #4f4cec;
}
</style>
