<template>
  <el-dialog
    v-model="props.dialogVisible"
    class="invite-dialog"
    :width="340"
    show-close
    top="30vh"
    @close="$emit('close')"
  >
    <template v-if="!finalPage">
      <div class="dialog__title">
        {{ showPageTitle() }}
      </div>

      <div class="dialog__body">
        <div class="dialog__body--title">
          <span v-html="inviteTitle"></span>
        </div>

        <div class="dialog__body--submit-box">
          <el-button
            :class="showPage === 'resend' ? 'dialog__body--btn' : 'dialog__body--bttn'"
            :loading="isLoadingSubmit"
            @click="nextPage"
          >
            OKAY
          </el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="dialog__success">
        <img src="@/assets/images/icons/success.svg" alt="success" />
        <span class="dialog__success--title">All done!</span>
        <span class="dialog__success--subtitle">
          <span v-html="finalTitle"></span>
        </span>

        <img
          src="@/assets/images/icons/close-icon.svg"
          alt="success"
          class="dialog__success--close"
          @click="$emit('close')"
        />
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import useWorkspaceStore from '~/stores/workspace'
import useProfileStore from '~/stores/profile'

const workspaceStore = useWorkspaceStore()
const profileStore = useProfileStore()
const {
  isLoadingSubmit,
  inviteUsersSuccess,
  inviteUsersError,
  revokeInviteSuccess,
  revokeInviteError,
  deleteInviteSuccess,
  deleteInviteError,
} = storeToRefs(workspaceStore)

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  dialogType: {
    type: String,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
})

const showPage = ref('accept')
const finalPage = ref(false)
const payload = ref({})
const email = ref(null)
const inviteTitle = ref(null)
const finalTitle = ref(null)
const workspaceID = ref(null)

onMounted(() => {
  showPage.value = props.dialogType

  if (props.userData) {
    email.value = props.userData?.email ? props.userData.email : 'user email'
    workspaceID.value = props.userData?.workspaceID ? props.userData.workspaceID : 'user email'

    payload.value = {
      emails: [email.value],
      workspace_id: workspaceID.value,
      id: props.userData.inviteID,
    }
  }

  switch (showPage.value) {
    case 'resend':
      inviteTitle.value = `<span>You are going to join resend invitation to ${email.value}.</span>`

      finalTitle.value = `<span>The invitation has been resend.</span>`
      break
    case 'revoke':
      inviteTitle.value = `<span>You are going to <span style='color: red'>revoke</span> invitation from ${email.value}.</span>`

      finalTitle.value = `<span>The invitation has been revoked.</span>`
      break
    case 'delete':
      inviteTitle.value = `<span>You are going to <span style='color: red'>revoke</span> and <span style='color: red'>delete</span> invitation from ${email.value}.</span>`
      finalTitle.value = `<span>The invitation has been revoked and deleted.</span>`
      break
  }
})

const showPageTitle = () => {
  switch (showPage.value) {
    case 'resend':
      return 'Resend invitation'
    case 'revoke':
      return 'Revoke invitation'
    case 'delete':
      return 'Delete invitation'
  }
}

const nextPage = () => {
  switch (showPage.value) {
    case 'resend':
      workspaceStore.inviteUsers(payload.value)
      break
    case 'revoke':
      workspaceStore.revokeInvite(payload.value)
      break
    case 'delete':
      workspaceStore.deleteInvite(payload.value)
      break
  }
}

watch(inviteUsersSuccess, async (v) => {
  await workspaceStore.getMembers(workspaceID.value)
  finalPage.value = true
  if (inviteUsersSuccess.value) inviteUsersSuccess.value = null
})

watch(revokeInviteSuccess, async (v) => {
  await workspaceStore.getMembers(workspaceID.value)
  finalPage.value = true
  if (revokeInviteSuccess.value) revokeInviteSuccess.value = null
})

watch(deleteInviteSuccess, async (v) => {
  await workspaceStore.getMembers(workspaceID.value)
  finalPage.value = true
  if (deleteInviteSuccess.value) deleteInviteSuccess.value = null
})
</script>

<style scoped lang="scss">
.dialog-footer {
  &__action {
    color: $ov-text--title;
    font-size: 14px;
    font-weight: 500;
  }
}
.dialog {
  &__title {
    color: $ov-text--title;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #bbbcbd;
  }
  &__body {
    padding: 30px 50px 20px !important;
    &--title {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;

      color: #0d1c2e;
    }
    &--submit-box {
      margin: 30px auto 0;
      width: 78px;
      height: 40px;
    }
    &--btn {
      background: #4156f6;
      border-radius: 6px;
      width: 78px;
      height: 40px;
      font-weight: 500;
      font-size: 13px;
      line-height: 22px;
      text-transform: uppercase;
      color: #ffffff;
    }

    &--bttn {
      border-radius: 6px;
      width: 78px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #4f4cec;
      font-weight: 500;
      font-size: 13px;
      line-height: 22px;
      text-transform: uppercase;
      color: #4156f6;
    }
  }
  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
    padding: 65px 70px 25px;
    &--title {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #0d1c2e;
    }
    &--subtitle {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #0d1c2e;
    }
    &--close {
      position: absolute;
      top: 25px;
      right: 27px;
      font-weight: 900;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>
