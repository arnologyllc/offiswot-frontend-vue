<template>
  <div>
    <!-- reset password -->
    <div class="container_account">
      <div class="account">
        <div class="main">
          <div class="main__form">
            <div class="main__form--title">
              <img
                src="@/assets/images/icons/chevron-left.svg"
                alt="chevron-left"
                @click="$router.go(-1)"
              />
              <span>Reset password</span>
            </div>
            <el-form
              ref="registerForm"
              class="main__form--box"
              hide-required-asterisk
              :model="payload"
              :rules="rules"
              @submit.native.prevent="onSubmit"
            >
              <el-form-item prop="oldpassword">
                <el-input
                  ref="oldpassword"
                  v-model="payload.oldPassword"
                  class="main__form--box__input"
                  placeholder="Old password"
                  :type="showOldPassword ? 'text' : 'password'"
                >
                  <template slot="suffix">
                    <img
                      :src="
                        require(`@/assets/images/icons/eye-${
                          showOldPassword ? 'close' : 'open'
                        }-icon.svg`)
                      "
                      alt="eye_icon"
                      @click="showOldPassword = !showOldPassword"
                    />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password" class="form-item">
                <el-input
                  ref="password"
                  v-model="payload.password"
                  class="main__form--box__input"
                  placeholder="New password"
                  :type="showPassword ? 'text' : 'password'"
                >
                  <template slot="suffix">
                    <img
                      :src="
                        require(`@/assets/images/icons/eye-${
                          !showPassword ? 'close' : 'open'
                        }-icon.svg`)
                      "
                      alt="eye_icon"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password_confirmation" class="form-item">
                <el-input
                  ref="password_confirmation"
                  v-model="payload.password_confirmation"
                  class="main__form--box__input"
                  placeholder="Confirm password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                >
                  <template slot="suffix">
                    <img
                      :src="
                        require(`@/assets/images/icons/eye-${
                          !showConfirmPassword ? 'close' : 'open'
                        }-icon.svg`)
                      "
                      alt="eye_icon"
                      @click="showConfirmPassword = !showConfirmPassword"
                    />
                  </template>
                </el-input>
              </el-form-item>
              <el-button
                type="text"
                class="forgot"
                @click="$router.push('/password/forgot')"
                >Forgot Password?</el-button
              >
              <el-button type="primary" class="submit" submit>Save</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResetPassword',

  data() {
    //  Custom Validations
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.payload.password_confirmation !== '') {
          this.$refs.registerForm.validateField('password_confirmation')
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
    const validatePassSymbols = (rule, value, callback) => {
      const regex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
      if (regex.test(value)) {
        callback(
          new Error(
            'Password must include at least 1 lowercase, uppercase, 1 number and 1 special character'
          )
        )
      } else {
        callback()
      }
    }
    return {
      //  Request Body
      payload: {
        oldPassword: null,
        password: null,
        password_confirmation: null,
      },

      //  Show Password/Not Show Password
      showOldPassword: false,
      showPassword: false,
      showConfirmPassword: false,

      //  Validation Rules
      rules: {
        email: [
          {
            required: true,
            message: 'Please enter Email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input a valid email address',
            trigger: 'blur',
          },
        ],
        username: [
          { required: true, message: 'Please enter username', trigger: 'blur' },
          {
            min: 3,
            max: 25,
            message:
              'Username must include minimum 3 and maximum 25 characters',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 8,
            message: 'Password length should me more than 8 chars',
            trigger: 'blur',
          },
          { validator: validatePass, trigger: 'blur' },
          { validator: validatePassSymbols, trigger: 'blur' },
        ],
        password_confirmation: [
          {
            required: true,
            message: 'Please enter the password again',
            trigger: 'blur',
          },
          {
            min: 8,
            message: 'Password length should me more than 8 characters',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },

      isOpenEmailDialog: false,
    }
  },
}
</script>

<style lang="scss">
.main {
  width: 100%;
  position: relative;
  display: flex;

  &__form {
    width: 390px;
    margin-left: 60px;
    &--title {
      margin: 0 0 50px 0;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      color: #0d1c2e;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
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
            top: 6px !important;
            right: 10px;

            &:focus,
            &:hover {
              border-color: $ov-primary;
            }
            &::placeholder {
              color: $ov-placeholder;
            }
          }
          .el-input__suffix {
            display: grid;
            align-items: center;
            right: 10px !important;
          }
          .el-input__suffix {
            padding-right: 8px;
            cursor: pointer;
            right: 10px !important;
            &-inner {
              display: grid;
            }
          }
        }
        .el-input__suffix {
          top: 5px !important;
          right: 10px;
        }
      }
    }
    .form-item {
      position: relative;
      margin-bottom: 30px;

      .el-form-item__content {
        background: #ffffff;
        border: 1px solid #ecebed;
        box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
      }
      ::v-deep input {
        &::placeholder {
          transition: 0.25s;
        }
        &:focus {
          &::placeholder {
            opacity: 0;
          }
        }
      }
    }
    .forgot.el-button {
      color: #4156f6;
    }
    .submit.el-button {
      background-color: #4156f6;
      display: block;
      border-radius: 6px;
      padding: 16px 92px;
      margin: 55px 0 0 0;
    }
  }
}
.container_account {
  width: 100%;
  margin: 0 auto;
}
.account {
  width: 80%;
  margin: 60px auto;
  height: 500px;
  border-left: 1px solid #d0c9d6;
}
@media (max-width: 340px) {
  .submit.el-button {
    padding: 16px 76px !important;
  }
}
</style>
