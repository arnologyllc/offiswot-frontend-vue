<template>
  <el-dialog
    :visible.sync="visible"
    width="200px"
    align-center
    class="dialog"
    :show-close="false"
    :show-header="false"
    @close="closeModal"
  >
    <template #footer>
      <div class="dialog-text">
        <span :style="{ color: textColor }" v-html="errorText"></span>
      </div>
      <img
        class="close_btn"
        src="@/assets/images/icons/modal-close-icon.svg"
        @click="closeModal"
      />
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'ErrorMassage',
  props: {
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
      default: '#e60022',
    },
  },
  data() {
    return {
      visible: false,
      massage: '',
    }
  },

  methods: {
    closeModal() {
      this.$emit('visible', this.visible)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  width: max-content !important;
  max-width: 184px;
  font-size: 12px;
  height: max-content;
  padding: 12px 25px;
  border-radius: 13px;
  text-align: center;
  background: #ffffff;
  margin-top: 220px !important;
  border: 1px solid #4f4cec;
  &__header {
    display: none;
  }
  &__footer {
    text-align: center;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .error_info {
    display: block;
    margin-top: 15px;
  }
}

.close_btn {
  color: white;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>
