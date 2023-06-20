<template>
  <div>
    <div>
      <div class="container_account">
        <div class="account">
          <div>
            <div class="account__title">
              <img src="@/assets/images/icons/chevron-left.svg" alt="chevron-left" @click="$router.go(-1)" />
              <span>Security</span>
            </div>
            <div class="account__body">
              <div class="account__body-block" @click="navigateTo('/profile-settings/reset')">
                <div class="">
                  <div class="reset">Reset password</div>
                  <div class="reset_text">You can change your password here.</div>
                </div>
                <div>
                  <img src="@/assets/images/icons/chevron-right.svg" alt="chevron-right" />
                </div>
              </div>
              <div class="account__body-block" @click="navigateTo('/profile-settings/update-pin')">
                <div>
                  <div class="reset">Reset PIN</div>
                  <div class="reset_text">You can change your PIN here.</div>
                </div>
                <div>
                  <img src="@/assets/images/icons/chevron-right.svg" alt="chevron-right" />
                </div>
              </div>
              <div class="account__body-block" @click="dialogVisible = true">
                <div>
                  <div class="deactivate">Deactivate my account</div>
                  <div class="reset_text">You can deactivate your account up to 3 months.</div>
                </div>
              </div>
              <div class="account__body-block" @click="showModal = true">
                <div class="">
                  <div class="delete">Delete my account</div>
                  <div class="reset_text">You can permanently delete you account.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <deactivate-modal v-if="dialogVisible" :dialog-visible="dialogVisible" @visible="dialogVisible = false">
    </deactivate-modal>
    <delete-modal v-if="showModal" :dialog-visible="showModal" @visible="showModal = false"></delete-modal>
    <check-modal
      v-if="isOpenPINDialog"
      :dialog-visible="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DeactivateModal from '@/components/profile-settings/DeactivateModal.vue'
import DeleteModal from '@/components/profile-settings/DeleteModal.vue'
import CheckModal from '@/components/auth/AccessCheckModal.vue'
import loginToken from '~/middleware/loginToken'
import settingsToken from '~/middleware/settingsToken'
import auth from '~/middleware/auth'
definePageMeta({ layout: 'default' })

const $router = useRouter()
const showModal = ref(false)
const dialogVisible = ref(false)
const isOpenPINDialog = ref(false)

isOpenPINDialog.value = loginToken()
isOpenPINDialog.value = settingsToken()

onMounted(() => {
  auth()
})
</script>

<style lang="scss" scoped>
.container_account {
  width: 100%;
  background-color: $ov-background;
  padding-bottom: 186px;
  border-radius: 20px 0 0 0;
  padding: 37px 0 82px 0;
  height: 100vh;
}
.account {
  margin: 0 auto 60px;
  height: 500px;
  border-left: 1px solid #d0c9d6;
  padding-right: 20px;

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
