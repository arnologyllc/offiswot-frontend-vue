<template>
  <div class="list">
    <div class="list__header">
      <span class="list__header--title">Manage users</span>
      <span class="list__header--subtitle">You can invite, remove users as well as manage your teams.</span>
    </div>
    <div class="list__navbar">
      <div class="list__navbar--buttons">
        <el-button
          :class="{ active: currentComponent === 'invites' }"
          class="list__navbar--buttons__element"
          @click="setCurrentComponent('invites')"
        >
          INVITES ({{ inviteUsersCount }})
          <span class="list__navbar--buttons__element--active-border"></span>
        </el-button>
        <el-button
          :class="{ active: currentComponent === 'users' }"
          class="list__navbar--buttons__element"
          @click="setCurrentComponent('users')"
        >
          USERS ({{ memberUsersCount }})
          <span class="list__navbar--buttons__element--active-border"></span>
        </el-button>
        <el-button
          :class="{ active: currentComponent === 'teams' }"
          class="list__navbar--buttons__element"
          @click="setCurrentComponent('teams')"
        >
          TEAMS ({{ 0 }})
          <span class="list__navbar--buttons__element--active-border"></span>
        </el-button>
      </div>
      <el-button class="list__navbar--inviteUser" @click="isOpenInviteModal = true">INVITE USER</el-button>
    </div>
    <div class="list__body">
      <component :is="getCurrentComponent"></component>
    </div>
    <OvInviteMemberModal
      v-if="isOpenInviteModal"
      :dialog-visible="isOpenInviteModal"
      @close="isOpenInviteModal = false"
    ></OvInviteMemberModal>
  </div>
</template>

<script setup>
import { onMounted, resolveDynamicComponent } from 'vue'
import { storeToRefs } from 'pinia'
import Invites from '~/components/staff/list/Invites.vue'
import Teams from '~/components/staff/list/Teams.vue'
import Users from '~/components/staff/list/Users.vue'
import useWorkspaceStore from '@/stores/workspace'
import OvInviteMemberModal from '@/components/shared/OvInviteMemberModal'

const workspaceStore = useWorkspaceStore()
const { getMembersSuccess } = storeToRefs(workspaceStore)
const currentComponent = ref('invites')

const invites = resolveDynamicComponent(Invites)
const teams = resolveDynamicComponent(Teams)
const users = resolveDynamicComponent(Users)

const inviteUsersCount = ref(0)
const memberUsersCount = ref(0)
const isOpenInviteModal = ref(false)

const setCurrentComponent = (componentName) => {
  currentComponent.value = componentName
}

const getCurrentComponent = computed(() => {
  switch (currentComponent.value) {
    case 'users':
      return users
    case 'teams':
      return teams
    default:
      return invites
  }
})

onMounted(() => {
  if (getMembersSuccess.value) {
    inviteUsersCount.value = getMembersSuccess.value.invites_list.filter((item) => item.status !== 'accepted').length
    memberUsersCount.value = getMembersSuccess.value.members.length
  }
})

watch(getMembersSuccess, (v) => {
  inviteUsersCount.value = v.invites_list.filter((item) => item.status !== 'accepted').length
  memberUsersCount.value = v.members.length
})
</script>

<style scoped lang="scss">
.list {
  padding: 0 0 0 30px;
  &__header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 50px;
    &--title {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #0d1c2e;
    }
    &--subtitle {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #717a7f;
    }
  }
  &__navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--buttons {
      display: flex;
      border-bottom: 3px solid #ece9f1;
      padding: 13px;
      &__element {
        position: relative;
        border: none;
        background-color: inherit;
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        color: #d0c9d6;
        display: flex;
        justify-content: center;
        align-items: center;
        &--active-border {
          display: none;
          position: absolute;
          top: 43px;
          left: 0;
          right: 0;
          margin: 0 auto;
          height: 3px;
          width: 57px;
          background: #6979f8;
          border-radius: 200px 200px 0px 0px;
        }
        &.active {
          color: #1a051d;
          .list__navbar--buttons__element--active-border {
            display: block;
          }
        }
      }
    }

    &--inviteUser {
      width: 124px;
      height: 40px;
      padding: 9px 20px;
      background: #4156f6;
      border-radius: 6px;
      color: #ffffff;
    }
  }
  &__body {
    background: #ffffff;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    width: 100%;
    min-height: 620px;
    max-height: inherit;
    margin-top: 30px;
    padding: 40px;
  }
}
</style>
