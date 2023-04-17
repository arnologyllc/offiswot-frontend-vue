<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    :height="dialogHeight"
    :close-on-click-modal="false"
    text-align="center"
    :show-close="false"
    top="30vh"
    @close="$emit('close')"
  >
    <template slot="title">
      <div class="access-header">
        <h3>Access check</h3>
      </div>
    </template>

    <div class="title__image">
      <img src="@/assets/images/icons/access-check.svg" alt="" />
    </div>
    <span class="title__text">
      Please enter your PIN in order to access account management section.
    </span>
    <el-form
      ref="pinForm"
      class="main__form--box"
      hide-required-asterisk
      :model="payload"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <div v-if="errors.global.value" class="el-form-item__global-error">
        <img src="@/assets/images/icons/error.svg" alt="" />
        <span>{{ errors.global.value }}</span>
      </div>
      <el-form-item prop="pin" class="password-form-item">
        <el-input
          id="pin"
          ref="pin"
          v-model="payload.pin"
          :type="showPIN ? 'text' : 'password'"
          class="main__form--box__input"
          placeholder="Enter PIN"
          @blur="validateField('pin')"
        >
          <div
            v-if="payload.pin"
            slot="suffix"
            style="position: relative"
            @click="focusElement('pin')"
          >
            <span for="pin" class="pin_placeholder"> Enter PIN </span>
          </div>
          <template slot="suffix">
            <img
              :src="
                require(`@/assets/images/icons/eye-${
                  showPIN ? 'close' : 'open'
                }-icon.svg`)
              "
              alt="eye_icon"
              @click="showPIN = !showPIN"
            />
          </template>
        </el-input>
      </el-form-item>
      <div class="forgot-password">
        <el-button
          type="text"
          style="font-size: 14px; font-weight: 400"
          @click="onForgot"
          >Forgot PIN?</el-button
        >
      </div>
      <el-button
        class="submit-button"
        native-type="submit"
        :loading="isLoadingSubmit"
      >
        <span class="submit-button__text">{{
          isLoadingSubmit ? '' : 'NEXT'
        }}</span>
      </el-button>
    </el-form>

    <ConfirmModal
      :email="payload.email"
      :model="isOpenEmailDialog"
      :append-to-body="true"
      @close="isOpenEmailDialog = false"
    ></ConfirmModal>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConfirmModal from '@/components/shared/OvConfirmPINChangeModal.vue'
export default {
  name: 'OvAccessCheckModal',
  components: {
    ConfirmModal,
  },
  props: {
    model: Boolean,
  },
  data() {
    return {
      dialogVisible: true,
      dialogWidth: '450px',
      dialogHeight: '400px',
      payload: {
        pin: null,
      },
      rules: {
        pin: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
          {
            min: 4,
            max: 6,
            message: 'PIN must be between 4 and 6 digits',
            trigger: 'blur',
          },
        ],
      },
      errors: {
        pin: {
          value: '',
          isShow: false,
        },
        global: {
          value: null,
        },
      },
      showPIN: false,
      isOpenEmailDialog: false,
    }
  },
  computed: {
    ...mapGetters('pin', [
      'checkPinData',
      'checkPinFailureData',
      'isLoadingSubmit',
      'forgotFailureData',
    ]),
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
    checkPinData(v) {
      this.$message.success(v)
      this.$emit('close')
    },
    checkPinFailureData(v) {
      this.errors.global.value = v
    },
    forgotPinFailureData(v) {
      for (const i in v) {
        if (typeof v[i] !== 'string') {
          for (const j in v[i]) {
            this.errors.global.value = v[i][j]
          }
        } else {
          this.errors.global.value = v[i]
        }
      }
    },
    forgotPinData(v) {
      if (v) {
        this.isOpenEmailDialog = true
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
      } else this.dialogWidth = '450px'
    })
  },
  methods: {
    ...mapActions('pin', ['checkPin', 'forgotPin']),
    onSubmit() {
      this.checkPin(this.payload)
    },

    focusElement(elem) {
      this.$refs[elem].focus()
    },

    onForgot() {
      this.isOpenEmailDialog = true
      this.forgotPin()
    },
    hideError(fieldName) {
      if (this.isWeb()) {
        this.errors[fieldName].isShow = false
      }
    },
    validateField(fieldName) {
      this.$refs.pinForm.validateField(fieldName, (errorMessage) => {
        this.errors[fieldName].value = errorMessage
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
  height: 100%;
  padding: 100px 0 150px 18%;

  &__form {
    &--title {
      font-size: 20px;
      font-weight: 600;
      color: $ov-text--title;
      margin-bottom: 4px;
    }

    &--subtitle {
      font-size: 14px;
      color: $ov-text--subtitle;
      margin-bottom: 40px;
    }

    &--box {
      width: 320px;
      &__input {
        box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
        ::v-deep {
          .el-input__inner {
            height: 48px;
            padding: 0 15px;
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
.forgot-password {
  text-align: left;
  color: #6979f8;
  text-decoration: underline;
  ::v-deep .el-button {
    font-size: 12px;
    font-weight: 500;
    &:hover {
      color: $ov-primary;
    }
    &--text {
      padding: 0;
      margin-bottom: 40px;
    }
  }
}
.forgot-password {
  font-size: 14px;
}
::v-deep {
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-dialog {
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    &__close {
      color: black !important;
    }
    &__footer {
      display: flex;
      justify-content: center;
    }
    &__body {
      padding: 15px 35px 30px 35px;
      color: $ov-text--title;
      word-break: normal;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__header {
      display: grid;
      justify-content: center;

      width: 100%;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;

      color: #0d1c2e;
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
  display: flex;
  word-break: break-word;

  &__image {
    display: flex;
    justify-content: center;
    margin-top: 33px;
    margin-bottom: 42px;
  }
  &__text {
    display: block;
    padding: 0 60px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 16px;
    text-align: center;

    color: #0d1c2e;
  }
}

.submit-button {
  background: $ov-primary;
  color: white;
  text-transform: uppercase;
  width: 220px;
  height: 48px;
  padding: 0;
  padding-right: 8px;
  border-radius: 6px;
  ::v-deep span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__text {
    width: 100%;
    display: flex;
    font-size: 17px;
    font-weight: 700;
    justify-content: center !important;
  }
  &__box {
    display: flex;
    justify-content: flex-end;
  }
}

.pin_placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPINPlaceholder 0.3s;
  animation-fill-mode: forwards;
}
@media (min-width: 375px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -330px;
    }
  }

  .pin_placeholder {
    left: -310px;
  }
}

@media (max-width: 407px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -241px;
    }
  }

  .pin_placeholder {
    left: -210px;
  }
}
.access-header {
  width: 450px;
  padding-bottom: 15px;
  border-bottom: 1px solid #bbbcbd;
}
</style>
