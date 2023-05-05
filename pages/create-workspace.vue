<template>
  <div class="main">
    <el-form
      ref="createForm"
      class="main__form"
      hide-required-asterisk
      :rules="rules"
      :model="payload"
      @submit.prevent="onSubmit"
    >
      <div class="main__title">Create workspace</div>
      <div class="main__subtitle">Please fill the forms to register</div>
      <div
        v-if="errors.global.value"
        class="el-form-item__global-error-container"
      >
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
          @blur="validateField('name')"
        >
          <template #suffix>
            <div
              v-if="payload.name"
              style="position: relative"
              @click="focusElement('name')"
            >
              <span for="name" class="name_placeholder"> Workspace Name </span>
            </div>
            <img
              v-if="errors.name.value"
              src="@/assets/images/icons/error.svg"
              alt=""
              class="error_icon"
              @mouseover="showError('name')"
              @mouseout="hideError('name')"
              @click="showErrorClick('name')"
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
          <el-button
            class="main__form--actions__text-btn"
            @click="$router.push('/profile')"
            >Cancel</el-button
          >
          <el-button
            native-type="submit"
            :loading="isLoadingSubmit"
            class="submit-button"
          >
            <span>
              <span class="submit-button__text">{{
                isLoadingSubmit ? '' : 'Next'
              }}</span>
              <img src="@/assets/images/icons/chevron-icon.svg" alt="arrow" />
            </span>
          </el-button>
        </div>
      </el-form-item>

      <error-massage
        v-if="errors.name.isShow && !isWeb()"
        :dialogVisible="errors.name.isShow && !isWeb()"
        :error-text="errors.name.value"
        @visible="errors.name.isShow = false"
      ></error-massage>
    </el-form>

    <check-modal
      v-if="isOpenPINDialog"
      :dialogVisible="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
import CheckModal from '@/components/auth/AccessCheckModal.vue'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'

import useWorkspacesStore from '~/stores/workspace'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import settingsToken from '~/middleware/settingsToken'
import auth from '~/middleware/auth'

const workspacesStore = useWorkspacesStore()
const {
  isLoadingIndustries,
  industriesList,
  industriesError,
  isLoadingSubmit,
  createWorkspaceSuccess,
  createWorkspaceError,
} = storeToRefs(workspacesStore)

const instance = getCurrentInstance()
const $route = useRoute()
const $router = useRouter()
const config = useRuntimeConfig()

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

watch(createWorkspaceSuccess, (v) => {
  if (v) {
    navigateTo('/profile')
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
  isOpenPINDialog.value = settingsToken()
  window.addEventListener('resize', handleResize)
  await workspacesStore.getIndustries()
})

const onSubmit = () => {
  instance.refs.createForm.validate((valid) => {
    if (valid) {
      workspacesStore.createWorkspace(payload.value)
    } else {
      errors.value.global.value = 'Please fill empty areas'
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

const showErrorClick = (fieldName) => {
  errors.value[fieldName].isShow = true
}

const showError = (fieldName) => {
  if (isWeb()) {
    errors.value[fieldName].isShow = true
  }
}

const hideError = (fieldName) => {
  if (isWeb()) {
    errors.value[fieldName].isShow = false
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
  height: 100%;
  padding: 100px 0 150px 170px;

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $ov-text--title;
    margin-bottom: 4px;
  }
  &__subtitle {
    font-size: 14px;
    color: $ov-text--subtitle;
    margin-bottom: 47px;
  }

  &__form {
    min-height: calc(100vh - 514px);
    display: flex;
    flex-direction: column;
    padding: 21px 45px;

    &--input {
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

      &__text-btn {
        font-size: 17px;
        font-weight: 600;
        text-transform: uppercase;
        color: $ov-primary--light;
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
      margin-top: auto;
      margin-bottom: 0;
    }
  }

  .el-form-item__global-error-container {
    width: 100%;
    border-color: #e60022;
    background: #fbe4e8;
    box-shadow: 0px 7px 64px rgb(0 0 0 / 7%);
    border-radius: 6px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    padding: 7px 12px;
    align-items: center;
    color: #e60022;
    gap: 16px;
    margin-bottom: 27px;
  }
  .el-form-item__global-error {
    font-family: 'Montserrat';
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }

  .clear-error {
    cursor: pointer;
  }
  .el-form-item.is-error {
    .el-input__inner {
      border-color: red !important;
    }
  }
  .el-form-item__error {
    z-index: 1000;
  }
}

.name_placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showNamePlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@media (min-width: 490px) {
  .main {
    justify-content: flex-start;
    margin: 100px 0 150px 170px;
    &__form {
      padding-left: 65px;
      border-left: 1px solid #d0c9d6;
      width: 480px;
      &--input {
        width: 390px;
      }
      &--footer {
        margin-top: 250px;
      }
    }
  }
  @keyframes showNamePlaceholder {
    to {
      top: -34px;
      left: -270px;
    }
  }
  .name_placeholder {
    left: -255px;
  }
}

@media (max-width: 490px) {
  @keyframes showNamePlaceholder {
    to {
      top: -34px;
      left: -180px;
    }
  }
  .name_placeholder {
    left: -165px;
  }
  .main {
    margin: 100px auto 150px;
    padding: 0;
    width: 300px;
    justify-content: center;
    &__form {
      border: none;
      padding: 0 auto;
      &--input {
        width: 300px;
      }
      &--actions {
        display: flex;
        flex-direction: column-reverse;
      }

      &--footer {
        margin-top: 80px;
      }
    }
  }
}

.el-form-item.is-error {
  .el-input__inner {
    border-color: #e60022 !important;
  }
}
.el-form-item__error {
  position: absolute;
  font-family: 'Montserrat';
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  top: 0;
  left: 110%;
  padding: 14px;
  color: #e60022;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  max-width: 212px;
  height: max-content;
  min-height: 48px;
  border-radius: 13px;
  background-color: white;
  box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
}
.error_info {
  color: #717a7f;
  font-style: italic;
  font-weight: 400;
}

.error_info > li {
  margin-left: 15px;
}

.error_info > li::marker {
  font-size: 0.5em;
}
.el-form-item__error:after,
.el-form-item__error:before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  top: 25px;
}
.el-form-item__error:before {
  left: -8px;
  margin-top: -8px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #fff;
}
.el-form-item__error:after {
  left: -7px;
  margin-top: -7px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 7px solid #fff;
}
.error_icon {
  position: absolute;
  top: 12px;
  right: 7px;
}

.weak {
  color: #e60022;
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

@media (max-width: 990px) {
  .main {
    margin: 100px auto 150px;
    padding: 0;
    justify-content: center;
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
