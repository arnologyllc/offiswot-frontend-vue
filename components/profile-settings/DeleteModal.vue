<template>
  <el-dialog
    :title="modalStep > 2 ? null : 'Delete account'"
    width="30%"
    align-center
    @close="closeModal"
  >
    <template #footer>
      <span v-if="modalStep === 0">
        <div class="content">
          <div class="content__icon">
            <img src="@/assets/images/icons/delete.svg" alt="delete-profile" />
          </div>
          <div class="content__question question">
            <div>Are you sure you want to</div>
            <div class="warning">permanently delete</div>
            <div>your account?</div>
          </div>
          <div class="content__body">
            <div class="content__body-title">
              This can not be undone. By deleting this account you agree that:
            </div>
            <div class="content__body-subtitle">
              <img src="@/assets/images/icons/active.svg" alt="active" />
              <p>
                No one will be able to use this username ever, including
                yourself.
              </p>
            </div>
            <div class="content__body-subtitle">
              <img src="@/assets/images/icons/active.svg" alt="active" />
              <p>
                All of your workspaces will be permanently deleted, including
                chats, files and other data.
              </p>
            </div>
            <div class="content__body-subtitle">
              <img src="@/assets/images/icons/active.svg" alt="active" />
              <p>
                You will be removed from the workspaces that you have been
                member of. It will be unrecoverable.
              </p>
            </div>
          </div>
          <el-button
            type="danger"
            class="btn content__button"
            plain
            @click="agreeModal"
            >I AGREE</el-button
          >
        </div>
      </span>
      <span v-if="modalStep === 1">
        <div class="content">
          <div class="content__icon">
            <img src="@/assets/images/icons/delete.svg" alt="delete-profile" />
          </div>
          <div class="content__question question">
            Please choose why you want to delete you
          </div>
          <div class="content__body">
            <div class="content__body-checkboxes">
              <el-checkbox
                v-model="checkbox.checked1"
                label="No one will be able to use this username ever, including yourself."
                size="large"
              />
              <el-checkbox
                v-model="checkbox.checked2"
                label="No one will be able to use this username ever, including yourself."
                size="large"
              />
            </div>
          </div>
          <el-button
            type="danger"
            class="btn content__button"
            plain
            @click="agreeModal"
            >I AGREE</el-button
          >
        </div>
      </span>
      <span v-if="modalStep === 2" class="dialog__pin">
        <div class="dialog__pin-icon">
          <img src="@/assets/images/icons/delete.svg" alt="delete-profile" />
        </div>
        <el-form
          class="dialog__form"
          :rules="rules"
          :model="payload"
          @submit.native.prevent="onSubmit"
        >
          <h4>Please Enter your PIN.</h4>
          <el-form-item prop="pin">
            <el-input
              ref="pin"
              v-model="payload.pin"
              class="dialog__form--box__input"
              placeholder="PIN"
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
          <h5>Press OKAY to delete your account.</h5>
          <el-button
            type="danger"
            class="dialog__pin-button btn"
            plain
            native-type="submit"
            >I AGREE</el-button
          >
        </el-form>
      </span>
      <span v-if="modalStep === 3" class="dialog__success">
        <div class="modal__content">
          <img
            src="@/assets/images/icons/confirm-icon.svg"
            alt="confirm-icon"
          />
          <h5>All done!</h5>
        </div>
        <el-button
          type="danger"
          class="modal__content-button"
          plain
          @click="closeModal"
          >OKAY</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ModalDelete',
  props: {
    dialogVisible: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      visible: false,
      modalStep: 0,
      checkbox: {
        checked1: false,
        checked2: false,
      },
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
        ],
      },
      showPassword: false,
    }
  },
  computed: {
    ...mapGetters('profile', ['deleteProfileData', 'deleteFailureData']),
  },
  watch: {
    deleteFailureData(v) {
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
    deleteProfileData(v) {
      if (v) {
        this.$message.success('Success!')
      }
    },
  },
  methods: {
    ...mapActions('profile', ['deleteProfile']),
    onSubmit() {
      this.deleteProfile(this.payload)
    },
    agreeModal() {
      this.modalStep += 1
    },
    closeModal() {
      this.$emit('visible', this.visible)
      setTimeout(() => {
        this.modalStep = 0
      }, 200)
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  &__icon {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  &__body {
    width: 100%;
    max-width: 348px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin: 25px auto;
    color: #6d7075;
    text-align: center;
    &-title {
      margin-bottom: 26px;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #6d7075;
    }
    &-subtitle {
      width: 100%;
      max-width: 348px;
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: top;
      margin: 12px auto;
      font-family: Montserrat;
      font-size: 12px;
      font-weight: 500;
      line-height: 15px;
      letter-spacing: 0px;
      text-align: left;
      color: #b4b4b4 span {
        color: #929eff;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    &-checkboxes {
      margin-bottom: 145px;
      .el-checkbox {
        display: flex;
        flex-direction: row;
        white-space: normal;
        text-align: left;
        margin-bottom: 20px;
        &__inner {
          width: 26px;
          height: 26px;
        }

        &__label {
          font-family: 'Montserrat';
          font-style: normal !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          line-height: 17px !important;
          color: #6d7075 !important;
        }
      }
    }
  }
  &__button {
    margin: 40px auto !important;
  }
}

.btn {
  width: 50%;
  padding: 8px 0;
  margin: 0px auto;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  border: 1px solid #ff4a66;
  background: #ffffff;
  text-align: center;
  text-transform: uppercase;
  border-radius: 6px;
  color: #ff4a66;
}

.question {
  width: 333px;
  margin: 0 auto;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  justify-content: center;
  color: #0d1c2e;
  .warning {
    color: #ff4a66;
  }
}

.dialog__pin {
  &-icon {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
  ::v-deep {
    .el-input__suffix {
      top: 5px !important;
      right: 10px;
    }
  }

  .el-form {
    width: 100%;
    max-width: 333px;
    margin: 22px auto;
    h4 {
      margin-bottom: 28px;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
      text-align: center;
      color: #0d1c2e;
    }
    .el-form-item {
      margin-bottom: 32px;
    }

    h5 {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 15px;
      text-align: center;
      color: #6d7075;
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
  background-color: #000000da;
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #bbbcbd;
    margin-bottom: 22px;
  }
  ::v-deep .el-dialog__footer {
    text-align: center;
  }
  ::v-deep .el-dialog {
    display: flex;
    flex-direction: column;
    width: 453px !important;
    margin: auto;
    border-radius: 20px;
    text-align: center;
    background: #ffffff;
    border: 1px solid #4f4cec;
    border-radius: 20px;
  }
}
</style>
