<template>
  <el-dialog
    v-model="props.dialogVisible"
    class="invite-dialog"
    :width="430"
    show-close
    top="30vh"
    @close="$emit('close')"
  >
    <template v-if="!finalPage">
      <div class="dialog__title">
        {{ showPage === 'accept' ? 'Accept invitation' : 'Decline invitation' }}
      </div>

      <div class="dialog__body">
        <div class="dialog__body--title">
          <span v-html="inviteTitle"></span>
        </div>

        <div class="dialog__body--workspace">
          <img :src="workspaceAvatar" alt="Avatar" class="dialog__body--workspace__avatar" />
          <div class="dialog__body--workspace__name">{{ workspaceName }}</div>
        </div>
        <div class="dialog__body--submit-box">
          <el-button class="dialog__body--btn" :loading="isLoadingSubmit" @click="nextPage"> NEXT </el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="dialog__success">
        <img src="@/assets/images/icons/success.svg" alt="success" />
        <span class="dialog__success--title">All done!</span>
        <span class="dialog__success--subtitle">
          {{
            showPage === 'accept'
              ? 'You have joined to the workspace, enjoy your collaboration!'
              : 'We have emailed all invitations. You can now enjoy your new workspace!'
          }}
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
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import $cookies from 'js-cookie'
import defaultAvatar from '@/assets/images/icons/default-user-icon.jpg'
import useWorkspaceStore from '~/stores/workspace'
import useProfileStore from '~/stores/profile'

const workspaceStore = useWorkspaceStore()
const profileStore = useProfileStore()
const { inviteAcceptSuccess, inviteAcceptError, inviteDeclineSuccess, inviteDeclineError, isLoadingSubmit } =
  storeToRefs(workspaceStore)

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  dialogType: {
    type: String,
    required: true,
  },
  workspaceData: {
    type: Object,
    required: true,
  },
})

const showPage = ref('accept')
const inviteTitle = ref('You are going to join')
const workspaceAvatar = ref(null)
const workspaceName = ref(null)
const finalPage = ref(false)
const payload = ref({})

onMounted(() => {
  showPage.value = props.dialogType
  inviteTitle.value =
    showPage.value === 'accept'
      ? '<span>You are going to join</span>'
      : `<span>You are going to <span style='color: red'>decline</span> the inviation to join</span>`
  if (props.workspaceData) {
    workspaceName.value = props.workspaceData?.name ? props.workspaceData.name : 'Workspace name'
    workspaceAvatar.value = defaultAvatar
    if (process.client) {
      const userID = +$cookies.get('currentAccountID')
      const email = JSON.parse(localStorage.getItem('accounts')).find((item) => item.ID === userID).email
      payload.value = {
        email,
        token: props.workspaceData.token,
      }
    }
  }
})

const nextPage = () => {
  switch (showPage.value) {
    case 'accept':
      workspaceStore.acceptInvite(payload.value)
      break
    case 'decline':
      workspaceStore.declineInvite(payload.value)
      break
  }
}

watch(inviteAcceptSuccess, async (v) => {
  await profileStore.getWorkSpaces()
  finalPage.value = true
})

watch(inviteDeclineSuccess, async (v) => {
  await profileStore.getWorkSpaces()
  finalPage.value = true
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
    padding: 30px 0 35px 0 !important;
    &--title {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;

      color: #0d1c2e;
    }
    &--workspace {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      margin: 20px 0 35px 0;
      background: rgba(178, 186, 249, 0.2);
      height: 76px;
      &__avatar {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        object-fit: cover;
      }
      &__name {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #0d1c2e;
      }
    }
    &--submit-box {
      margin: 0 auto;
      width: 177px;
      height: 40px;
    }
    &--btn {
      background: #4156f6;
      border-radius: 6px;
      width: 177px;
      height: 40px;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      text-transform: uppercase;
      color: #ffffff;
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
