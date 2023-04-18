<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Forgot password</div>
      <div class="main__form--subtitle">
        Please fill the forms to get a reset password email.
      </div>
      <el-form
        ref="forgotForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.native.prevent="onSubmit"
      >
        <el-form-item prop="email">
          <el-input
            v-model="payload.email"
            class="main__form--box__input"
            placeholder="E-mail"
            @blur="validateField('email')"
          >
            <template slot="prefix">
              <img src="@/assets/images/icons/email-icon.svg" alt="user_icon" />
            </template>
            <div
              v-if="payload.email"
              slot="suffix"
              style="position: relative"
              @click="focusElement('email')"
            >
              <span for="email" class="placeholder"> Email</span>
            </div>
            <template v-if="errors.email.value" slot="suffix">
              <img
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('email')"
                @mouseout="hideError('email')"
              />
            </template>
          </el-input>
          <template slot="error">
            <div v-if="errors.email.isShow" class="el-form-item__error">
              <span>{{ errors.email.value }}</span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <login-buttons
          login-title="Next"
          :login-loading="forgotLoading"
          :show-social="false"
        ></login-buttons>
      </el-form>
    </div>
    <ConfirmModal
      :email="payload.email"
      :model="isOpenEmailDialog"
      @close="isOpenEmailDialog = false"
    ></ConfirmModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoginButtons from '@/components/auth/LoginButtons.vue'
import ConfirmModal from '@/components/shared/OvConfirmPasswordChangeModal.vue'

export default {
  name: 'PasswordForgot',
  components: {
    LoginButtons,
    ConfirmModal,
  },
  layout: 'auth',
  data() {
    return {
      //  Request Body
      payload: {
        email: null,
      },

      //  Validation Rules
      rules: {
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: 'blur',
          },
        ],
      },
      errors: {
        email: {
          value: '',
          isShow: false,
        },
      },
      isOpenEmailDialog: false,
    }
  },
  head() {
    return {
      title: 'Forgot Password',
    }
  },
  computed: {
    ...mapGetters('auth', [
      'forgotSuccessData',
      'forgotErrorData',
      'forgotLoading',
    ]),
  },
  watch: {
    forgotSuccessData(v) {
      if (v) {
        this.$message.success(v.message)
        this.isOpenEmailDialog = true
      }
    },
    forgotErrorData(v) {
      for (const i in v) {
        if (typeof v[i] !== 'string') {
          for (const j in v[i]) {
            this.$notify.error({
              title: 'Error',
              dangerouslyUseHTMLString: true,
              message: `${i}: ${v[i][j]}`,
            })
          }
        } else {
          this.$notify.error({
            title: 'Error',
            message: v[i],
          })
        }
      }
    },
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    onSubmit() {
      this.$refs.forgotForm.validate((valid) => {
        if (valid) {
          this.forgotPassword(this.payload)
        } else {
          this.$message.error('Wrong!')
          return false
        }
      })
    },

    validateField(fieldName) {
      this.$refs.forgotForm.validateField(fieldName, (errorMessage) => {
        this.errors[fieldName].value = errorMessage
      })
    },
    showError(fieldName) {
      this.errors[fieldName].isShow = true
    },
    hideError(fieldName) {
      this.errors[fieldName].isShow = false
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  position: relative;

  &__form {
    width: 390px;
    &--title {
      font-size: 20px;
      font-weight: 600;
      color: $ov-text--title;
      margin-bottom: 4px;
    }

    &--subtitle {
      font-size: 14px;
      color: $ov-text--subtitle;
      margin-bottom: 47px;
    }

    &--box {
      &__input {
        ::v-deep {
          .el-input__inner {
            height: 48px;
            padding: 0 45px;
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
          .el-input__prefix,
          .el-input__suffix {
            display: grid;
            align-items: center;
          }
          .el-input__prefix {
            padding-left: 8px;
          }
          .el-input__suffix {
            padding-right: 8px;
            cursor: pointer;
            &-inner {
              display: grid;
            }
          }
        }
      }
    }
    .forgot-password {
      display: flex;
      justify-content: flex-end;
      ::v-deep .el-button {
        font-size: 12px;
        font-weight: 500;
        color: $ov-primary--light;
        &:hover {
          color: $ov-primary;
        }
      }
    }
  }
}

.placeholder {
  position: relative;
  top: 0;
  left: -750%;
  animation: showPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@keyframes showPlaceholder {
  to {
    top: -80%;
    left: -820%;
  }
}
::v-deep {
  .el-form-item.is-error {
    .el-input__inner {
      border-color: #e60022 !important;
    }
  }
  .el-form-item__error {
    position: absolute;
    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: 400;
    top: 0;
    left: 105%;
    padding: 10px;
    color: #e60022;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: max-content;
    height: 45px;
    border-radius: 13px;
    background-color: white;
    box-shadow: 0 0 10px gray;
  }
  .el-form-item__error:after,
  .el-form-item__error:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 50%;
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

  .el-input__suffix {
    display: flex !important;
  }
  .el-input__suffix-inner {
    display: flex !important;
  }
}
</style>
