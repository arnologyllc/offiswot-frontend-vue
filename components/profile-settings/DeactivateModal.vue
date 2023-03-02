<template>
  <el-dialog
    :visible.sync="visible"
    :title="modalStep > 2 ? null : 'Deactivate account'"
    width="30%"
    align-center
    @close="closeModal"
    class="dialog"
  >
    <template #footer>
      <span v-if="modalStep === 0">
        <div class="dialog-footer">
          <div class="dialog-footer-icon">
            <img
              src="@/assets/images/icons/remove.svg"
              alt="deactivate-profile"
            />
          </div>
          <div class="dialog-footer-question">
            <div>Are you sure you want to</div>
            <div class="warning">deactivate</div>
            <div>your account?</div>
          </div>
          <div class="dialog-footer-title">
            <h4>
              Deactivating your account will disable your profile and will
              remove your name and photo from all workspaces.
            </h4>
            <div class="dialog-footer-subtitle">
              <p>
                You can reactivate your profile in login page by trying to login
                with your current email or username within 3 months after
                deactivation. After that the account will be permanently
                deleted. Check account
                <span> deactivation and account deletion policy.</span>
              </p>
            </div>
          </div>
          <el-button
            type="danger"
            class="dialog-footer-button"
            plain
            @click="agreeModal"
            >I AGREE</el-button
          >
        </div>
      </span>
      <span v-if="modalStep === 1" class="dialog__pin">
        <div class="dialog__pin-icon">
          <img src="@/assets/images/icons/delete.svg" alt="delete-profile" />
        </div>
        <el-form class="dialog__form">
          <h4>Please Enter your PIN.</h4>
          <el-form-item prop="pass">
            <el-input
              ref="pass"
              v-model="payload.pass"
              class="dialog__form--box__input"
              placeholder="PIN"
              :type="showPassword ? 'text' : 'password'"
            >
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
          <h5>Press OKAY to delete your account.</h5>
          <el-button
            type="danger"
            class="dialog__pin-button"
            plain
            @click="closeModal"
            >I AGREE</el-button
          >
        </el-form>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'DeleteSettings',
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
        pass: null,
      },
      showPassword: false,
    }
  },
  methods: {
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
.dialog__pin {
  &-icon {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
  &-button {
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

.dialog-footer {
  &-icon {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
  &-question {
    width: 100%;
    text-align: center;
    max-width: 333px;
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
  &-title {
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

    h4 {
      margin-bottom: 26px;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #6d7075;
    }
  }
  &-subtitle {
    width: 100%;
    max-width: 348px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: top;
    text-align: center;
    margin: 12px auto;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: 0px;
    text-align: center;
    color: #b4b4b4;
    span {
      color: #929eff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &-button {
    width: 50%;
    padding: 8px 0;
    margin: 38px auto;
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
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #bbbcbd;
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
</style>
