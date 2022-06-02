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
          >
            <template slot="prefix">
              <img src="@/assets/images/icons/email-icon.svg" alt="user_icon" />
            </template>
          </el-input>
        </el-form-item>
        <login-buttons
          login-title="Next"
          :login-loading="forgotLoading"
          :show-social="false"
        ></login-buttons>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginButtons from '@/components/auth/LoginButtons.vue'
export default {
  name: 'PasswordForgot',
  components: {
    LoginButtons,
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
        this.$router.push('/password/reset')
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
    onSubmit() {
      this.$refs.forgotForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('auth/forgotPassword', this.payload)
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
::v-deep {
  .el-form-item.is-error {
    .el-input__inner {
      border-color: red !important;
    }
  }
}
</style>
