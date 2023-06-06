<template>
  <div class="users">
    <table class="users__container">
      <thead class="users__container--header">
        <tr>
          <td class="users__container--header__element">User</td>
          <td class="users__container--header__element">Specialty</td>
          <td class="users__container--header__element">Team</td>
          <td class="users__container--header__element">Project</td>
          <td class="users__container--header__element">Actions</td>
        </tr>
      </thead>
      <tbody class="users__container--body">
        <tr v-for="user in paginatedElements" :key="user" class="users__container--element">
          <td class="users__container--element__info">
            <img
              :src="user.avatar ? getAvatar(user.avatar) : defaultAvatar"
              alt="Avatar"
              class="users__container--element__info--avatar"
            />
            <div class="users__container--element__info--span">
              <div class="users__container--element__info--name">
                {{ user.full_name ? `${user.full_name} (${user.email})` : user.email }}
              </div>
            </div>
          </td>
          <td class="users__container--element__speciality">
            {{ user.specialty ? user.speciality : 'PHP BE developer' }}
          </td>
          <td class="users__container--element__team">{{ user.team ? user.team : 'Development' }}</td>
          <td class="users__container--element__project">{{ user.project ? user.project : 'ERC, DVS, TS' }}</td>
          <td class="users__container--element__actions">
            <el-button class="users__container--element__actions--edit-button">
              <img src="@/assets/images/icons/edit-icon-blue.svg" alt="/" />
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="users__pagination">
      <ul class="users__pagination--list">
        <li
          v-for="(pageNumber, index) in visiblePages"
          :key="`${pageNumber} ${index}`"
          class="users__pagination--page"
          :class="{ currentPage: pageNumber === currentPage, notPage: pageNumber === '...' }"
          @click="goToPage(pageNumber)"
        >
          {{ pageNumber }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useWorkspaceStore from '@/stores/workspace'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'

const workspaceStore = useWorkspaceStore()
const { getMembersSuccess } = storeToRefs(workspaceStore)

const memberUsersList = ref([])
const currentPage = ref(1)
const elementsPerPage = ref(7)
const totalPages = ref(null)
const config = useRuntimeConfig()

onMounted(() => {
  if (getMembersSuccess.value) {
    memberUsersList.value = getMembersSuccess.value.members ? getMembersSuccess.value.members : []
    totalPages.value = Math.ceil(memberUsersList.value.length / elementsPerPage.value)
  }
})

const paginatedElements = computed(() => {
  const startIndex = (currentPage.value - 1) * elementsPerPage.value
  const endIndex = startIndex + elementsPerPage.value
  return memberUsersList.value.slice(startIndex, endIndex)
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

const getAvatar = (url) => {
  return `${config.public.env.serverUrl}/storage/images/users/${url}`
}
</script>

<style scoped lang="scss">
.users {
  &__container {
    width: 100%;
    border-collapse: collapse;
    &--header {
      &__element {
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        height: 50px;
        color: #1d1d1d;
        &:last-child {
          text-align: right;
        }
      }
    }
    &--element {
      border-bottom: 1px dashed #b9b9b9;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #1d1d1d;
      &__info {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 70px;
        &--avatar {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          object-fit: cover;
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

      &__project {
        text-decoration-line: underline;
      }
      &__actions {
        text-align: right;
        &--edit-button {
          width: 30px;
          height: 30px;
          background: #d5e9fa;
          border-radius: 6px;
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
