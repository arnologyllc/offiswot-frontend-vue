<template>
  <div>
    <div>
      <div class="container_account">
        <div class="account">
          <div>
            <div class="account__title">
              <img
                src="@/assets/images/icons/chevron-left.svg"
                alt="chevron-left"
                @click="$router.go(-1)"
              />
              <span>Security</span>
            </div>
            <div class="account__body">
              <div
                class="account__body-block"
                @click="$router.push('/profile-settings/reset')"
              >
                <div class="">
                  <div class="reset">Reset password</div>
                  <div class="reset_text">
                    You can change your password here.
                  </div>
                </div>
                <div>
                  <img
                    src="@/assets/images/icons/chevron-right.svg"
                    alt="chevron-right"
                  />
                </div>
              </div>
              <div class="account__body-block">
                <div >
                  <div class="reset">Reset PIN</div>
                  <div class="reset_text">You can change your PIN here.</div>
                </div>
                <div >
                  <img
                    src="@/assets/images/icons/chevron-right.svg"
                    alt="chevron-right"
                  />
                </div>
              </div>
              <div class="account__body-block">
                <div >
                  <div class="deactivate" @click="dialogVisible = true">
                    Deactivate my account
                  </div>
                  <div class="reset_text">
                    You can deactivate your account up to 3 months.
                  </div>
                </div>
              </div>
              <div class="account__body-block" @click="showModal = true">
                <div class="">
                  <div class="delete">Delete my account</div>
                  <div class="reset_text">
                    You can permanently delete you account.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <deactivate-modal v-show="dialogVisible" @visible="dialogVisible = false">
    </deactivate-modal>
    <delete-modal
      v-show="showModal"
      class="dialog"
      @visible="showModal = false"
    ></delete-modal>
  </div>
</template>

<script>
import DeactivateModal from '@/components/profile-settings/DeactivateModal.vue'
import DeleteModal from '@/components/profile-settings/DeleteModal.vue'

export default {
  name: 'ProfileSettings',
  components: {
    DeleteModal,
    DeactivateModal,
  },
  data() {
    return {
      showModal: false,
      dialogVisible: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.container_account {
  width: 100%;
  margin: 0 auto;
}
.account {
  width: 80%;
  margin: 60px auto;
  height: 500px;
  border-left: 1px solid #d0c9d6;

  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin: 0 0 50px 30px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    cursor: pointer;
    color: #0d1c2e;
  }

  &__body {
    max-width: 520px;
    width: 100%;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 15px;
    cursor: pointer;
    &-block {
      width: 520px;
      height: 73px;
      background: #ffffff;
      border: 1px solid #d5d7da;
      border-radius: 12px;
      padding: 22px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.reset,
.delete,
.deactivate {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  margin-bottom: 5px;
}
.reset {
  color: #4f4cec;
}
.deactivate {
  color: #ffcf5c;
}
.delete {
  color: #ff4a66;
}
.reset-text {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #6d7075;
}
@media (max-width: 630px) {
  .account__body-block {
    max-width: 400px;
  }
}
@media (max-width: 500px) {
  .account__body-block {
    max-width: 300px;
  }
}
@media (max-width: 385px) {
  .account__body-block {
    max-width: 230px;
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
}
</style>
