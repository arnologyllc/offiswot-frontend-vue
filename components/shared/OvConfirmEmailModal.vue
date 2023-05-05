<template>
  <el-dialog
    v-model="props.dialogVisible"
    :max-width="dialogWidth"
    show-close
    top="30vh"
    @close="$emit('close')"
  >
    <template #header>
      <div>
        <div class="title__image">
          <img src="@/assets/images/icons/email-primary-icon.svg" alt="" />
        </div>
        <div class="title__text">Check your email</div>
      </div>
    </template>
    <span class="title"
      >We have emailed you a verification link on your registered email. Please
      click on the link sent for verifying your email.</span
    >
    <span v-if="error" class="error">
      {{ error }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <span v-if="timer && !error"
          >0:{{ timer > 9 ? timer : `0${timer}` }}</span
        >
        <a
          v-if="!error && !timer"
          href=""
          class="dialog-footer__action"
          @click.prevent="authStore.resendEmail(email)"
          >Resend Verification Email</a
        >
        <span v-if="error" class="later"> Please try again later. </span>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
const authStore = useAuthStore()
const { resendSuccessData, resendFailureData } = storeToRefs(authStore)
const instance = getCurrentInstance()

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  email: {
    type: String,
    default: '',
  },
})

const dialogWidth = ref('560px')
const timer = ref(59)
const error = ref(null)

watch(resendSuccessData, (v) => {
  if (v) {
    timer.value = 59
    const ID = setInterval(() => {
      if (timer.value) timer.value--
    }, 1000)
    setTimeout(() => {
      clearInterval(ID)
    }, 60000)
  }
})

watch(resendFailureData, (v) => {
  if (!v) {
    error.value = `You have exceeded the maximum number of reset password requests.`
  }
})

onMounted(() => {
  if (document.documentElement.clientWidth <= 425) {
    dialogWidth.value = '315px'
  }
  window.addEventListener('resize', (e) => {
    if (e.target.innerWidth <= 425) {
      dialogWidth.value = '315px'
    } else dialogWidth.value = '560px'
  })
  timer.value = 59
  const ID = setInterval(() => {
    if (timer.value) timer.value--
  }, 1000)
  setTimeout(() => {
    clearInterval(ID)
  }, 60000)
})
</script>

<style scoped lang="scss">
.el-dialog {
  max-width: 560px;
  border-radius: 13px !important;
}
.el-dialog__close {
  color: black !important;
}
.el-dialog__footer {
  display: flex;
  justify-content: center;
}
.el-dialog__body {
  padding: 15px 35px 15px 35px !important;
  color: $ov-text--title;
}
.el-dialog__header {
  display: grid;
  justify-content: center;
  padding-top: 40px;
}
.dialog-footer__action {
  color: $ov-text--title;
  font-size: 14px;
  font-weight: 500;
}
.title {
  text-align: center;
  justify-content: center;
  display: flex;
  word-break: break-word;
}
.title__image {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
}
.title__text {
  font-weight: 600;
  font-size: 18px;
  color: $ov-text--title;
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

@media (max-width: 375px) {
  .el-dialog {
    width: 80%;
  }
}
</style>
