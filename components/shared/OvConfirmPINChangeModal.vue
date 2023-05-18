<template>
  <el-dialog
    v-model="props.dialogVisible"
    :width="dialogWidth"
    :append-to-body="appendToBody"
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
    <span class="title">In order to reset your PIN check your email and follow the instructions.</span>
    <span v-if="error" class="error">
      {{ error }}
    </span>
    <template #footer>
      <span class="dialog-footer">
        <span v-if="timer && !error">0:{{ timer > 9 ? timer : `0${timer}` }}</span>
        <a v-if="!error && !timer" href="" class="dialog-footer__action" @click.prevent="onSubmit">Resend Email</a>
        <span v-if="error" class="later"> Please try again later. </span>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import usePINStore from '@/stores/pin'
const pinStore = usePINStore()
const { forgotPinData, forgotPinFailureData } = storeToRefs(pinStore)

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  email: {
    type: String,
    default: '',
  },

  appendToBody: {
    type: Boolean,
    default: false,
  },
})

const dialogWidth = ref('560px')
const timer = ref(59)
const error = ref(null)

watch(forgotPinData, (v) => {})

const onSubmit = () => {
  timer._value = 59
  pinStore.forgotPin({ email: props.email })
}

watch(forgotPinFailureData, (v) => {
  if (v) {
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
  setInterval(() => {
    if (timer.value) timer.value--
  }, 1000)
})
</script>

<style scoped lang="scss"></style>
