<template>
  <div class="main-dash">
    <div class="main-dash__header" :class="{ 'edit-mode': !dragOptions.disabled }">
      <div class="main-dash__header">
        <el-button-group class="main-dash__header--button-group">
          <el-button round :class="{ active: currentComponent === 'desk' }" @click="setCurrentComponent('desk')">
            Map
          </el-button>
          <el-button
            v-if="user === owner"
            round
            :class="{ active: currentComponent === 'list' }"
            @click="setCurrentComponent('list')"
          >
            List
          </el-button>
        </el-button-group>
        <el-button
          v-if="user === owner"
          ref="editButton"
          class="main-dash__header--edit-button"
          circle
          @click="dragOptions.disabled = false"
        >
          <img src="@/assets/images/icons/edit-icon.svg" alt="/" />
        </el-button>
      </div>
    </div>
    <div class="main-dash__content">
      <component
        :is="currentComponent === 'desk' ? desk : list"
        :drag-options="currentComponent === 'desk' ? dragOptions : false"
        @save="dragOptions.disabled = true"
      ></component>
    </div>

    <check-modal
      v-if="isOpenPINDialog"
      :dialog-visible="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script setup>
import { onMounted, resolveDynamicComponent } from 'vue'
import { storeToRefs } from 'pinia'
import $cookies from 'js-cookie'
import Desk from '@/components/staff/Desk.vue'
import List from '@/components/staff/List.vue'
import settingsToken from '~/middleware/settingsToken'
import loginToken from '~/middleware/loginToken'
import CheckModal from '@/components/auth/AccessCheckModal.vue'
import useWorkspaceStore from '@/stores/workspace'
import useProfileStore from '@/stores/profile'

const workspaceStore = useWorkspaceStore()
const { getMembersSuccess } = storeToRefs(workspaceStore)
const profileStore = useProfileStore()
const { profileSuccessData } = storeToRefs(profileStore)

const desk = resolveDynamicComponent(Desk)
const list = resolveDynamicComponent(List)
const currentComponent = ref('desk')
const isOpenPINDialog = ref(false)
const owner = ref(null)
const user = ref(null)
const accounts = ref(false)
const currentAccountID = ref(null)

const dragOptions = ref({
  animation: 1,
  group: 'users',
  disabled: true,
  ghostClass: 'ghost',
})

const setCurrentComponent = (name) => {
  currentComponent.value = name
}
onMounted(() => {
  if (process.client) {
    currentAccountID.value = $cookies.get('currentAccountID')
    accounts.value = JSON.parse(localStorage.getItem('accounts'))
    isOpenPINDialog.value = loginToken()
    isOpenPINDialog.value = settingsToken()
    if (accounts.value[currentAccountID.value]) user.value = accounts.value[currentAccountID.value].email
  }
})

watch(getMembersSuccess, (v) => {
  if (v) owner.value = v.members[0].email
  if (owner.value === user.value && currentComponent.value === 'desk' && v.is_first) dragOptions.value.disabled = false
})

watch(profileSuccessData, (v) => {
  if (v) {
    user.value = v.user.email
    dragOptions.value.disabled = !(owner.value === user.value)
  }
})
</script>

<style scoped lang="scss">
.main-dash {
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 16px 66px 0 21px;
  border-radius: 20px 0 0 0;
  background-color: #f5f7fb;

  &__header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 95%;
    height: 50px;
    gap: 0 26px;

    &.edit-mode {
      opacity: 0.5;
      pointer-events: none;
    }

    &--button-group {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
      border-radius: 18px;
      .el-button {
        background-color: white;
        border: none;
        color: black;
        font-weight: 600;
        font-size: 16px;
        width: 63px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          background: linear-gradient(246.28deg, #4156f6 -13.83%, #0cb1b9 107.63%);
          color: white;
        }
      }
    }
    &--edit-button {
      width: 36px;
      height: 36px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e5e7fa;
      color: $ov-primary;
      img {
        width: 20px;
        height: 20px;
      }
    }
    &--meetings {
      padding: 0 22px;
      width: 249px;
      height: 53px;
      background: linear-gradient(216.33deg, #4456e1 -6.33%, #0cb1b9 118.1%);
      color: white;
      span {
        display: flex;
        justify-content: space-between;
      }
      &__left {
        display: flex;
        align-items: center;
        width: 120px;
        white-space: break-spaces;
        height: 0px;
        font-weight: 600;
        font-size: 14px;
        img {
          margin-top: 13px;
        }
      }
      &__right {
        color: #efefef;
        font-weight: 400;
        font-size: 14px;
      }
    }
    &--create-meeting {
      font-size: 16px;
      font-weight: 600;
      color: $ov-primary;
      border: none;
      background-color: inherit;
    }
  }
}
</style>
