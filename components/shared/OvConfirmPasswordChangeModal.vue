<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    show-close
    top="30vh"
    @close="$emit('close')"
  >
    <div slot="title">
      <div class="title__image">
        <img src="@/assets/images/icons/email-primary-icon.svg" alt="" />
      </div>
      <div class="title__text">Check your email</div>
    </div>
    <span class="title"
      >In order to reset your password check your email and follow the
      instructions.</span
    >
    <span slot="footer" class="dialog-footer">
      <a
        href=""
        class="dialog-footer__action"
        @click.prevent="forgotPassword({ email: email })"
        >Resend Verification Email</a
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'OvConfirmPasswordChangeModal',
  props: {
    model: Boolean,
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogWidth: '560px',
    }
  },
  computed: {
    ...mapGetters('auth', ['resendSuccessData', 'resendFailureData']),
  },
  watch: {
    model() {
      this.dialogVisible = this.model
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$emit('close')
      }
    },
    resendSuccessData(v) {
      this.$message.success(v)
    },
    resendFailureData(v) {
      this.$notify.error({
        title: 'Error',
        dangerouslyUseHTMLString: true,
        message: v,
      })
    },
  },
  mounted() {
    if (document.documentElement.clientWidth <= 425) {
      this.dialogWidth = '315px'
    }
    window.addEventListener('resize', (e) => {
      if (e.target.innerWidth <= 425) {
        this.dialogWidth = '315px'
      } else this.dialogWidth = '560px'
    })
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
  },
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-dialog {
    border-radius: 20px;

    &__close {
      color: black !important;
    }
    &__footer {
      display: flex;
      justify-content: center;
    }
    &__body {
      padding: 15px 35px 30px 35px;
      color: $ov-text--title;
    }
    &__header {
      display: grid;
      justify-content: center;
      padding-top: 40px;
    }
  }
}
.dialog-footer {
  &__action {
    color: $ov-text--title;
    font-size: 14px;
    font-weight: 500;
  }
}
.title {
  text-align: center;
  display: flex;
  word-break: break-word;

  &__image {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  &__text {
    font-weight: 600;
    font-size: 18px;
    color: $ov-text--title;
  }
}
</style>
