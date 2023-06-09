<template>
  <div class="main">
    <div class="main__header">
      <div class="main__form--title">
        <img src="@/assets/images/icons/chevron-left.svg" alt="chevron-left" @click="$router.go(-1)" />
        <div class="main__title">Create workspace as {{ email }}</div>
      </div>
      <div class="main__subtitle">Please fill the form to create workspace.</div>
    </div>
    <el-form
      ref="createForm"
      class="main__form"
      hide-required-asterisk
      :rules="rules"
      :model="payload"
      @submit.prevent="onSubmit"
    >
      <div v-if="errors.global.value" class="el-form-item__global-error-container">
        <div class="el-form-item__global-error">
          <img src="@/assets/images/icons/error.svg" alt="" />
          <span>{{ errors.global.value }}</span>
        </div>
        <span class="clear-error" @click="clearError">X</span>
      </div>
      <el-form-item prop="name">
        <el-input
          v-model="payload.name"
          class="main__form--input"
          placeholder="Workspace name"
          @input="validateField('name')"
          @blur="validateField('name')"
        >
          <template #suffix>
            <div v-if="payload.name" style="position: relative" @click="focusElement('name')">
              <span for="name" class="custom_placeholder"> Workspace Name </span>
            </div>
            <img
              v-if="errors.name.value"
              src="@/assets/images/icons/error.svg"
              alt=""
              class="error_icon"
              @mouseover="showError('name', 'mouseover')"
              @mouseout="showError('name', 'mouseout')"
              @click="showError('name', 'click')"
            />
          </template>
        </el-input>
        <template #error>
          <div v-if="errors.name.isShow && isWeb()" class="el-form-item__error">
            <span v-html="errors.name.value"></span>
          </div>
          <div></div>
        </template>
      </el-form-item>
      <el-form-item prop="industry_id">
        <el-select
          v-model="payload.industry_id"
          :loading="isLoadingIndustries"
          class="main__form--input"
          placeholder="Select Industry"
        >
          <el-option
            v-for="(item, index) in industriesList?.industries"
            :key="`option_${index}`"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="main__form--footer">
        <div class="main__form--actions">
          <el-button native-type="submit" :loading="isLoadingSubmit" class="submit-button" :disabled="!payload.name">
            <span>
              <span class="submit-button__text">{{ isLoadingSubmit ? '' : 'Next' }}</span>
              <img src="@/assets/images/icons/chevron-icon.svg" alt="arrow" />
            </span>
          </el-button>
        </div>
      </el-form-item>

      <error-massage
        v-if="errors.name.isShow && !isWeb()"
        :dialog-visible="errors.name.isShow && !isWeb()"
        :error-text="errors.name.value"
        @visible="errors.name.isShow = false"
      ></error-massage>
    </el-form>

    <check-modal
      v-if="isOpenPINDialog"
      :dialog-visible="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import $cookies from 'js-cookie'

import CheckModal from '@/components/auth/AccessCheckModal.vue'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'

import useWorkspacesStore from '~/stores/workspace'
import useProfileStore from '~/stores/profile'
import settingsToken from '~/middleware/settingsToken'
import loginToken from '~/middleware/loginToken'
import auth from '~/middleware/auth'
definePageMeta({ layout: 'default' })

const workspacesStore = useWorkspacesStore()
const profileStore = useProfileStore()
const {
  isLoadingIndustries,
  industriesList,
  industriesError,
  isLoadingSubmit,
  createWorkspaceSuccess,
  createWorkspaceError,
} = storeToRefs(workspacesStore)

const instance = getCurrentInstance()
const $router = useRouter()

const payload = ref({
  name: null,
  industry_id: null,
})

const rules = ref({
  name: {
    required: true,
    message: 'Please input workspace name',
    trigger: 'blur',
  },
})
const errors = ref({
  name: {
    value: '',
    isShow: false,
  },
  global: {
    value: '',
  },
})
const isOpenPINDialog = ref(false)
const email = ref(false)

watch(createWorkspaceSuccess, (v) => {
  profileStore.getWorkSpaces()
  if (v) {
    navigateTo(`/`)
  }
})

watch(createWorkspaceError, (v) => {
  if (v) {
    errors.value.global.value = v
  }
})

watch(industriesError, (v) => {
  if (v) {
    errors.value.global.value = v
  }
})

onMounted(async () => {
  auth()
  if (process.client) {
    email.value = JSON.parse(localStorage.getItem('accounts'))[$cookies.get('currentAccountID')].email
  }
  isOpenPINDialog.value = loginToken()
  isOpenPINDialog.value = settingsToken()
  window.addEventListener('resize', handleResize)
  await workspacesStore.getIndustries()
})

const onSubmit = () => {
  instance.refs.createForm.validate((valid) => {
    if (valid) {
      workspacesStore.createWorkspace(payload.value)
    } else {
      errors.value.global.value = 'Please fill workspace name'
      return false
    }
  })
}

const focusElement = (elem) => {
  instance.refs[elem].focus()
}

const validateField = (fieldName) => {
  instance.refs.createForm.validateField(fieldName, (isValid, catchedError) => {
    if (!isValid) {
      errors.value[fieldName].value = catchedError[fieldName][0].message
    } else {
      errors.value[fieldName].value = ''
    }
  })
}

const showError = (fieldName, event) => {
  const webApp = isWeb()
  if (webApp) {
    errors.value[fieldName].isShow = event === 'mouseover'
  } else if (event === 'click') {
    errors.value[fieldName].isShow = true
  }
}

const handleResize = () => {
  instance.update()
}

const isWeb = () => {
  return window.innerWidth > 990
}

const clearError = () => {
  errors.value.global.value = ''
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: calc(100vh - 170px);
  background-color: $ov-background;
  border-radius: 20px 0 0 20px;
  padding: 37px 0 82px 50px;
  height: 100vh;
  &__form--title {
    font-style: normal;
    margin-left: -41px;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 16px;
    color: #0d1c2e;
  }
  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $ov-text--title;
    cursor: auto;
  }
  &__subtitle {
    font-size: 14px;
    color: $ov-text--subtitle;
    margin-bottom: 47px;
  }
  &__header {
    display: flex;
    flex-direction: column;
    padding: 21px 45px;
  }
  &__form {
    min-height: calc(100vh - 170px);
    display: flex;
    flex-direction: column;
    width: 480px;
    padding: 21px 45px;
    .el-form-item {
      min-width: 220px;
      max-width: 390px;
      width: 100%;
    }
    &--input {
      min-width: 220px;
      max-width: 390px;
      width: 100%;
      .el-input__inner {
        height: 48px;
        border-radius: 6px;
        border-color: $ov-border--light;

        &:focus,
        &:hover {
          border-color: $ov-primary;
        }
        &::placeholder {
          color: $ov-placeholder;
        }
      }
      .el-input__suffix {
        padding-right: 8px;
        cursor: pointer;
        i {
          color: black;
          &::before {
            content: '\e78f';
          }
        }
      }
    }

    &--actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 50px;
      &__text-btn {
        font-size: 17px;
        font-weight: 600;
        text-transform: uppercase;
        color: $ov-primary--light;
        border: none;
        background-color: inherit;
        &:hover {
          color: $ov-primary;
        }
      }
      .submit-button {
        background: linear-gradient(90.32deg, #0cb1b9 0.28%, #4156f6 99.75%);
        color: white;
        text-transform: uppercase;
        width: 220px;
        height: 48px;
        padding: 0;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        span {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        &__text {
          width: 100%;
          display: flex;
          font-size: 17px;
          font-weight: 700;
          justify-content: center !important;
        }
        img {
          position: absolute;
          right: 0px;
        }
      }
    }
    &--footer {
      margin-top: 278px;
      margin-bottom: 0;
    }
  }
}

.el-input__suffix {
  display: flex !important;
}
.el-input__suffix-inner {
  display: flex !important;
}
.el-form-item {
  margin-bottom: 27px;
}

@media (max-width: 600px) {
  .main {
    padding-left: 0;
    &__form--title {
      margin-left: 0;
    }

    &__title {
      width: min-content;
      font-size: 20px;
      text-align: center;
    }
    &__subtitle {
      font-size: 12px;
      margin-left: 39px;
    }
    &__form {
      padding: 0 10px;
      margin: 0 auto;
      &--box {
        text-align: center;
      }
      &--subtitle {
        text-align: center;
      }
    }
  }
}

@media (max-width: 485px) {
  .main {
    padding-left: 0;
    &__title {
      width: min-content;
      font-size: 14px;
      text-align: left;
      line-height: 20px;
    }
    &__form {
      padding: 0 10px;
      margin: 0 auto;
      .el-form-item {
        max-width: 220px;
        width: 220px;
      }
      &--box {
        text-align: center;
      }
      &--subtitle {
        text-align: center;
      }
    }
  }
}

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
