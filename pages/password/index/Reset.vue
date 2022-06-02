<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Reset password</div>
      <div class="main__form--subtitle">
        Please fill the forms to reset password
      </div>
      <el-form
        ref="resetForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.native.prevent="onSubmit"
      >
        <el-form-item prop="password" class="password-form-item">
          <el-input
            v-model="payload.password"
            :type="showPassword ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Password"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>
            <template slot="suffix">
              <img
                :src="
                  require(`@/assets/images/icons/eye-${
                    showPassword ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPassword = !showPassword"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_confirmation">
          <el-input
            v-model="payload.password_confirmation"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Confirm password"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>
            <template slot="suffix">
              <img
                :src="
                  require(`@/assets/images/icons/eye-${
                    showConfirmPassword ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </el-input>
        </el-form-item>
        <login-buttons
          login-title="Next"
          :show-social="false"
          :login-loading="resetLoading"
        ></login-buttons>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginButtons from '@/components/auth/LoginButtons.vue'
export default {
  name: 'PasswordReset',
  components: {
    LoginButtons,
  },
  layout: 'auth',
  data() {
    //  Custom Validations
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.payload.password_confirmation !== '') {
          this.$refs.resetForm.validateField('password_confirmation')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.payload.password) {
        callback(new Error("Password and password confirmation doesn't match!"))
      } else {
        callback()
      }
    }
    return {
      //  Request Body
      payload: {
        password: null,
        password_confirmation: null,
        passwordToken: 'test',
        email: 'test@test.test',
      },

      //  Show Password/Not Show Password
      showPassword: false,
      showConfirmPassword: false,

      //  Validation Rules
      rules: {
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 8,
            message: 'Password length should me more than 8 chars',
            trigger: 'blur',
          },
          { validator: validatePass, trigger: 'blur' },
        ],
        password_confirmation: [
          { required: true, message: 'Confirm your password', trigger: 'blur' },
          {
            min: 8,
            message: 'Password length should me more than 8 chars',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('auth', [
      'resetSuccessData',
      'resetErrorData',
      'resetLoading',
    ]),
  },
  watch: {
    resetSuccessData(v) {
      if (v) {
        this.$message.success(v.message)
      }
    },
    resetErrorData(v) {
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
    onSubmit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('auth/resetPassword', this.payload)
        } else {
          this.$message.error('Wrong!')
          return false
        }
      })
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
        box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
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
  }
}
::v-deep {
  .el-form-item.is-error {
    .el-input__inner {
      border-color: red !important;
    }
  }
}
</style>
