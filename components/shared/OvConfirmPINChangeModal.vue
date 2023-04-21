<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    :append-to-body="appendToBody"
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
      >In order to reset your PIN check your email and follow the
      instructions.</span
    >
    <span v-if="error" class="error">
      {{ error }}
    </span>
    <span slot="footer" class="dialog-footer">
      <span v-if="timer && !error"
        >0:{{ timer > 9 ? timer : `0${timer}` }}</span
      >
      <a
        v-if="!error && !timer"
        href=""
        class="dialog-footer__action"
        @click.prevent="forgotPin({ email: email })"
        >Resend Email</a
      >
      <span v-if="error" class="later"> Please try again later. </span>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'OvConfirmPINChangeModal',
  props: {
    model: Boolean,
    email: {
      type: String,
      default: '',
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogWidth: '560px',
      timer: 59,
      error: null,
    }
  },
  computed: {
    ...mapGetters('pin', ['changePinData', 'changePinFailureData']),
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
    changePinData(v) {
      this.$message.success(v)
      if (this.timer === 0) {
        this.timer = 59
        const ID = setInterval(() => {
          if (this.timer) this.timer--
        }, 1000)
        setTimeout(() => {
          clearInterval(ID)
        }, 60000)
      }
    },
    changePinFailureData(v) {
      if (!v) {
        this.error = `You have exceeded the maximum number of reset password requests.`
      }
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
    this.timer = 59
    const ID = setInterval(() => {
      if (this.timer) this.timer--
    }, 1000)
    setTimeout(() => {
      clearInterval(ID)
    }, 60000)
  },
  methods: {
    ...mapActions('pin', ['forgotPin']),
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
      padding: 15px 35px 15px 35px;
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
  justify-content: center;
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

.error {
  font-size: 13px;
  color: #e60022;
  margin-top: 15px;
  word-wrap: break-word;
  display: block;
  text-align: center;
}
.later {
  font-size: 13px;
}
</style>
