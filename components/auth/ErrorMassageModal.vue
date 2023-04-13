<template>
  <el-dialog
    :visible.sync="visible"
    :class="textColor"
    width="200px"
    class="dialog"
    :show-close="false"
    :show-header="false"
    @close="closeModal"
  >
    <template #footer>
      <div class="dialog-text">
        <span v-html="errorText"></span>
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
      default: 'weak',
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
  font-size: 12px;
  height: max-content;
  padding: 12px 16px;
  border-radius: 13px;
  background: #ffffff;
  margin-top: 220px !important;
  border: 1px solid #4f4cec;
  &__header {
    display: none;
  }
  &__footer {
    text-align: left;
    width: max-content;
    padding: 0;
    margin: 0;
  }
  .error_info {
    display: block;
    margin-top: 15px;
  }
  @media (max-width: 420px) {
    .el-dialog__footer {
      max-width: 200px !important;
    }
  }
  @media (min-width: 420px) {
    .el-dialog__footer {
      max-width: 406px !important;
    }
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
