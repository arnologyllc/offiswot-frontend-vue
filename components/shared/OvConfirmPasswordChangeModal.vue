<template>
  <el-dialog
    v-model="props.dialogVisible"
    :width="dialogWidth"
    show-close
    top="30vh"
    class="customModal"
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
    <span class="title">
      <span> In order to reset your password check your email and follow the instructions. </span>
    </span>
    <span v-if="error" class="error">
      {{ error }}
    </span>
    <template #footer
      ><span class="dialog-footer">
        <span v-if="timer && !error">0:{{ timer > 9 ? timer : `0${timer}` }}</span>
        <button v-if="!error && !timer" class="dialog-footer__action" @click="onSubmit">Resend Email</button>
        <span v-if="error" class="later"> Please try again later. </span>
      </span></template
    >
  </el-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import useAuthStore from '@/stores/auth'
const authStore = useAuthStore()
const { forgotSuccessData, forgotErrorData } = storeToRefs(authStore)

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
const timer = ref(0)
const error = ref(null)

watch(forgotSuccessData, (v) => {})

watch(forgotErrorData, (v) => {
  if (v) {
    error.value = `You have exceeded the maximum number of reset password requests.`
  }
})

const onSubmit = () => {
  timer._value = 59
  authStore.forgotPassword({ email: props.email })
}

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
  setInterval(() => {
    if (timer.value) timer.value--
  }, 1000)
})
</script>

<style scoped lang="scss"></style>
