<template>
  <div class="invites">
    <div class="invites__container">
      <div class="invites__container--header">
        <div class="invites__container--header__info">USER</div>
        <div class="invites__container--header__buttons">Actions</div>
      </div>
      <div v-for="user in paginatedElements" :key="user" class="invites__container--element">
        <div class="invites__container--element__info">
          <img
            :src="user.avatarUrl ? user.avatarUrl : defaultAvatar"
            alt="Avatar"
            class="invites__container--element__info--avatar"
          />
          <div class="invites__container--element__info--span">
            <div class="invites__container--element__info--name">
              {{ user.name ? `${user.name} (${user.email})` : user.email }}
              <div class="invites__container--element__info--status" :style="{ color: getColor(user.status) }">
                {{ user.status }}
              </div>
            </div>
            <div class="invites__container--element__info--expires">Active until {{ user.expired }}.</div>
          </div>
        </div>
        <div class="invites__container--element__buttons">
          <el-button
            class="invites__container--element__buttons--resend"
            @click="openInviteDialog('resend', user.email, user.id)"
            >Resend</el-button
          >
          <el-button
            v-if="user.status === 'pending'"
            class="invites__container--element__buttons--revoke"
            @click="openInviteDialog('revoke', user.email, user.id)"
          >
            Revoke
          </el-button>
          <el-button
            class="invites__container--element__buttons--delete"
            @click="openInviteDialog('delete', user.email, user.id)"
          >
            <img src="~/assets/images/icons/delete-invite-user.svg" alt="delete" />
          </el-button>
        </div>
      </div>
    </div>
    <div class="invites__pagination">
      <ul class="invites__pagination--list">
        <li
          v-for="(pageNumber, index) in visiblePages"
          :key="`${pageNumber} ${index}`"
          class="invites__pagination--page"
          :class="{ currentPage: pageNumber === currentPage, notPage: pageNumber === '...' }"
          @click="goToPage(pageNumber)"
        >
          {{ pageNumber }}
        </li>
      </ul>
    </div>
    <admin-invite-dialog
      v-if="isOpenInviteDialog"
      :dialog-visible="isOpenInviteDialog"
      :dialog-type="inviteDialogType"
      :user-data="userInformation"
      @close="isOpenInviteDialog = false"
    ></admin-invite-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useWorkspaceStore from '@/stores/workspace'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'
import adminInviteDialog from '@/components/invite/admin-invite-dialog.vue'

const workspaceStore = useWorkspaceStore()
const { getMembersSuccess } = storeToRefs(workspaceStore)

const inviteUsersList = ref([])
const currentPage = ref(1)
const elementsPerPage = ref(7)
const totalPages = ref(null)

const isOpenInviteDialog = ref(null)
const inviteDialogType = ref('resend')
const userInformation = ref({})
const workspaceID = ref(null)

const getColor = (status) => {
  switch (status) {
    case 'pending':
      return '#FFCF5C'
    case 'declined':
    case 'expired':
    case 'revoked':
      return '#FF647C'
  }
}

onMounted(() => {
  if (getMembersSuccess.value) {
    inviteUsersList.value = getMembersSuccess.value.invites_list.filter((item) => item.status !== 'accepted')
    totalPages.value = Math.ceil(inviteUsersList.value.length / elementsPerPage.value)
  }
  if (process.client) {
    const path = window.location.pathname.split('/')
    if (!isNaN(+path[path.length - 1])) {
      workspaceID.value = path[path.length - 1]
    }
  }
})

watch(getMembersSuccess, (v) => {
  inviteUsersList.value = v.invites_list.filter((item) => item.status !== 'accepted')
  totalPages.value = Math.ceil(inviteUsersList.value.length / elementsPerPage.value)
})

const paginatedElements = computed(() => {
  const startIndex = (currentPage.value - 1) * elementsPerPage.value
  const endIndex = startIndex + elementsPerPage.value
  return inviteUsersList.value.slice(startIndex, endIndex)
})

const visiblePages = computed(() => {
  const visiblePageLinks = 5
  const pages = []

  if (totalPages.value <= visiblePageLinks) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }

  if (currentPage.value < 3) {
    // If current page is within range to display the first set of page links
    pages.push(...Array.from({ length: 3 }, (_, i) => i + 1))
    pages.push('...')
    pages.push(...Array.from({ length: visiblePageLinks - 3 }, (_, i) => totalPages.value - (visiblePageLinks - 4) + i))
  } else if (currentPage.value >= totalPages.value - (visiblePageLinks - 3)) {
    // If current page is within range to display the last set of page links
    pages.push(1)
    pages.push('...')
    pages.push(...Array.from({ length: visiblePageLinks - 1 }, (_, i) => totalPages.value - (visiblePageLinks - 2) + i))
  } else {
    // If current page is in the middle range of page links
    pages.push(1)
    pages.push('...')
    pages.push(currentPage.value - 1, currentPage.value, currentPage.value + 1)
    pages.push('...')
    pages.push(totalPages.value)
  }
  return pages
})

const goToPage = (page) => {
  if (!isNaN(page)) currentPage.value = page
}

const openInviteDialog = (type, email, inviteID) => {
  inviteDialogType.value = type
  isOpenInviteDialog.value = true
  userInformation.value = {
    email,
    workspaceID: workspaceID.value,
    inviteID,
  }
}
</script>

<style scoped lang="scss">
.invites {
  &__container {
    display: flex;
    flex-direction: column;
    &--header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #1d1d1d;
    }
    &--element {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 70px;
      border-bottom: 1px dashed #b9b9b9;
      &__info {
        display: flex;
        align-items: center;
        gap: 10px;
        &--avatar {
          width: 45px;
          height: 45px;
          border-radius: 12px;
        }
        &--span {
          display: flex;
          flex-direction: column;
          gap: 6.5px;
        }
        &--name {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #1d1d1d;
        }
        &--status {
          text-transform: uppercase;
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;
        }
        &--expires {
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: #717a7f;
        }
      }
      &__buttons {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 13px;
        line-height: 22px;
        &--resend {
          width: 97px;
          height: 30px;
          background: #e5e7fa;
          border: none;
          border-radius: 6px;
          text-transform: uppercase;
          color: #4156f6;
          &:hover {
            opacity: 0.7;
          }
        }
        &--revoke {
          width: 96px;
          height: 30px;
          background: #fbe4e8;
          border-radius: 6px;
          border: none;
          text-transform: uppercase;
          color: #ff647c;
          &:hover {
            opacity: 0.7;
          }
        }
        &--delete {
          width: 30px;
          height: 30px;
          background: #fbe4e8;
          border-radius: 6px;
          border: none;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
  &__pagination {
    position: absolute;
    bottom: 65px;
    right: 130px;
    width: max-content;
    &--list {
      display: flex;
      gap: 12px;
    }
    &--page {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #ffffff;
      box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
      text-align: center;
      color: #6979f8;
      &:hover {
        background: #6979f8;
        color: #ffffff;
        opacity: 0.5;
      }
      &.currentPage {
        cursor: not-allowed;
        &:hover {
          opacity: 1;
        }
        background: #6979f8;
        color: #ffffff;
        border-radius: 8px;
      }
      &.notPage {
        cursor: default;
        &:hover {
          background: #ffffff;
          color: #6979f8;
          opacity: 1;
        }
      }
    }
  }
}
</style>
