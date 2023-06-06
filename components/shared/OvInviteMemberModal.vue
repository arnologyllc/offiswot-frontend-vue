<template>
  <el-dialog
    v-model="props.dialogVisible"
    class="invite-dialog"
    :width="dialogWidth"
    show-close
    top="30vh"
    @close="$emit('close')"
  >
    <div class="dialog__title" :style="showPage === 3 ? { display: 'none' } : { display: 'block' }">
      {{ showPage === 1 ? 'Workspace Rules' : 'Invite member' }}
    </div>

    <div v-if="showPage === 1" class="dialog__first-page">
      <div class="dialog__first-page--title">What info must your workspace members provide to join?</div>
      <div class="dialog__first-page--checkobox-container">
        <el-checkbox-group v-model="checkList">
          <div class="dialog__first-page--checkbox">
            <div v-for="(item, index) in checkboxItems" :key="`checkbox_${index}`">
              <el-checkbox :label="item.value"> {{ item.name }}</el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <div class="dialog__first-page--small-text">
        You will be able to edit requried information abour memebers of the workspace in settings (click
        <a href="">here</a>).
      </div>
      <div class="dialog__first-page--submit-box">
        <el-button class="dialog__invite--btn" @click="goNextPage"> NEXT </el-button>
        <el-button class="dialog__invite--skip-btn" @click="goNextPage"> SKIP </el-button>
      </div>
    </div>
    <div v-if="showPage === 2" class="dialog__body">
      <el-form ref="inviteForm">
        <div class="dialog__input--label">Enter email</div>
        <div v-if="error.global" class="el-form-item__global-error-container">
          <div class="el-form-item__global-error">
            <img src="@/assets/images/icons/error.svg" alt="" />
            <span>{{ error.global }}</span>
          </div>
          <span class="clear-error" @click="clearError">X</span>
        </div>
        <el-autocomplete
          ref="email"
          v-model="userEmail"
          popper-class="custom-style-popup"
          class="invite-dialog__input"
          :class="error.value ? 'is-error' : ''"
          :fetch-suggestions="querySearch"
          placeholder="Enter email"
          @select="handleSelect"
          @input="validateEmail"
          @keydown.enter="addEmail"
        >
          <template v-if="!error.value" #default="{ item }">
            <span v-html="showingEmail(item, userEmail.length)"></span>
            <span v-if="item.status === 'accepted'" class="list_item_isMember">Member</span>
          </template>

          <template v-else #suffix>
            <img
              src="@/assets/images/icons/error.svg"
              alt=""
              class="error_icon"
              @mouseover="showError()"
              @mouseout="hideError()"
            />
            <div v-if="error.isShow" class="el-form-item__error">
              <span v-html="error.value"></span>
            </div>
          </template>
        </el-autocomplete>
        <div class="dialog__chips-box">
          <div v-for="(item, index) in selectedEmails" :key="`email_${index}`" class="dialog__chip">
            <div class="dialog__chip--text">{{ item.email }}</div>
            <div class="dialog__chip--icon" @click="removeChip(item)">
              <i class="el-icon-close">X</i>
            </div>
          </div>
        </div>
        <div class="dialog__invite">
          <el-button class="dialog__invite--btn" :loading="isLoadingSubmit" @click="inviteUsers"> INVITE </el-button>
          <el-button class="dialog__invite--skip-btn" @click="$emit('close')"> SKIP </el-button>
        </div>
      </el-form>
    </div>
    <div v-if="showPage === 3" class="invite-dialog__success">
      <img src="@/assets/images/icons/success.svg" alt="success" />
      <span class="invite-dialog__success--title">Invites are sent!</span>
      <span class="invite-dialog__success--subtitle">
        We have emailed all invitations.<br />You can now enjoy your new workspace!
      </span>

      <img
        src="@/assets/images/icons/close-icon.svg"
        alt="success"
        class="invite-dialog__success--close"
        @click="$emit('close')"
      />
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useWorkspaceStore from '@/stores/workspace'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
})

const workspaceStore = useWorkspaceStore()
const { getUsersListSuccess, inviteUsersSuccess, inviteUsersError, isLoadingSubmit } = storeToRefs(workspaceStore)

const error = ref({
  value: null,
  global: null,
  isShow: null,
})

const emails = ref([])
const workspaceID = ref(null)
const typing = ref(Date.now())

const checkboxItems = ref([
  { name: 'Display Name', value: 'displayName' },
  { name: 'Picture', value: 'picture' },
  { name: 'Full Name', value: 'fullName' },
  { name: 'Languages', value: 'languages' },
  { name: 'Phone number', value: 'phoneNumber' },
  { name: 'Years of experience', value: 'experience' },
  { name: 'Date of birth', value: 'birthday' },
  { name: 'Specialty', value: 'specialty' },
  { name: 'Upload CV', value: 'cv' },
])

const userEmail = ref('')
const selectedEmails = ref([])
const showPage = ref(1)
const checkList = ref([])

const dialogWidth = computed(() => (showPage.value === 1 ? '918px' : '432px'))

const goNextPage = () => {
  showPage.value = 2
}

const handleSelect = (item) => {
  if (!item.status) {
    if (!selectedEmails.value.includes(item)) {
      selectedEmails.value.push(item)
      userEmail.value = ''
    }
    emails.value = emails.value.filter((el) => el.email !== item.email)
  }
}

const querySearch = (queryString, cb) => {
  if (queryString) {
    const saving = setTimeout(async () => {
      await workspaceStore.getUsersList(workspaceID.value, queryString)

      if (getUsersListSuccess.value) {
        emails.value = getUsersListSuccess.value
        const allEmails = emails.value
        const results = queryString && !error.value.value && allEmails ? allEmails : []
        if (!results[0] && queryString.includes('@')) {
          validateEmail(queryString)
          if (!error.value.value) {
            results.push({ email: queryString, status: null })
          }
        }

        cb(results)
      } else {
        cb()
      }
    }, 3000)

    if (Date.now() - typing.value < 2000) clearTimeout(saving)
    typing.value = Date.now()
  } else {
    cb()
  }
}

const removeChip = (item) => {
  selectedEmails.value = selectedEmails.value.filter((el) => el.email !== item.email)
  emails.value.push(item)
}

const validateEmail = (value) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  if (value?.includes('@') && !emailRegex.test(value)) {
    error.value.value = 'Email is not valid.'
  } else {
    error.value.value = ''
  }
}

const showError = () => {
  error.value.isShow = true
}

const hideError = () => {
  error.value.isShow = false
}

const clearError = () => {
  error.value.global = null
}

const showingEmail = (user, size) => {
  const part1 = user.email.slice(0, size)
  const part2 = user.email.slice(size)
  return `<span class="list_item_value">${part1}<span style="opacity: 0.3">${part2}</span></span>`
}

onMounted(() => {
  if (process.client) {
    const path = window.location.pathname.split('/')
    if (!isNaN(+path[path.length - 1])) {
      workspaceID.value = path[path.length - 1]
    }
  }
})

const inviteUsers = () => {
  const payload = {
    emails: [...selectedEmails.value.map((user) => user.email)],
    workspace_id: workspaceID.value,
  }
  workspaceStore.inviteUsers(payload)
}

watch(getUsersListSuccess, (v) => {
  emails.value = v
})

watch(inviteUsersSuccess, async (v) => {
  await workspaceStore.getMembers(workspaceID.value)
  showPage.value = 3
})

watch(inviteUsersError, (v) => {
  error.value.global = 'Something went wrong.'
})
</script>

<style scoped lang="scss">
.el-autocomplete {
  width: 100%;
}
.el-checkbox__inner {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid #cdc7d2 !important;
  background-color: #fff !important;
}
.el-checkbox__inner::after {
  border: 2px solid #1a051d;
  transform: rotate(45deg) scaleY(0);
  border-left: 0;
  border-top: 0;
  left: 9px;
  top: 6px;
}
.el-checkbox__label {
  font-size: 14px;
  font-weight: 500;
  color: $ov-text--title !important;
}
.el-input__inner {
  border-radius: 6px;
  border: 1px solid #cdc7d2;
}
.el-dialog {
  border-radius: 20px;
  border: 1px solid #4f4cec;
  &__close {
    color: black !important;
  }
  &__footer {
    display: flex;
    justify-content: center;
  }
  &__body {
    padding: 15px 0 30px 0;
    color: $ov-text--title;
  }
  &__header {
    display: grid;
    justify-content: center;
    padding-top: 0;
    padding-bottom: 5px;
  }
}
.dialog-footer {
  &__action {
    color: $ov-text--title;
    font-size: 14px;
    font-weight: 500;
  }
}
.title {
  text-align: center;
  display: flex;
  word-break: break-word;

  &__image {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  &__text {
    font-weight: 600;
    font-size: 18px;
    color: $ov-text--title;
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
    padding: 27px 63px 0 63px;
  }
  &__input {
    width: 100%;
    &--label {
      color: $ov-text--title;
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
      padding-bottom: 22px;
    }
  }
  &__chips-box {
    max-height: 164px;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    margin-bottom: 27px;
    border-radius: 4px;
  }
  &__chip {
    width: 100%;
    height: 24px;
    border-radius: 4px;
    background-color: #e5e7fa;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    margin-bottom: 5px;
    &--text {
      color: $ov-primary--light;
      font-size: 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 5px;
    }
    &--icon {
      cursor: pointer;
      i {
        color: $ov-primary--light;
      }
    }
  }
  &__invite {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 18px;
    &--btn {
      width: 177px;
      height: 40px;
      border-radius: 6px;
      margin: 0 auto;
      background-color: $ov-primary;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
    }
    &--skip-btn {
      margin: 0 !important;
      background-color: inherit !important;
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
      text-transform: lowercase;
      border: none !important;
      color: #d0c9d6;
    }
  }
  &__text-btn {
    margin-top: 9px;
    font-size: 17px;
    font-weight: 600;
    color: #d0c9d6;
  }
  &__first-page {
    padding: 9px 100px 0 100px;
    &--title {
      font-size: 14px;
      font-weight: 500;
      color: $ov-text--title;
      text-align: center;
    }
    &--checkobox-container {
      padding-top: 43px;
      padding-bottom: 48px;
    }
    &--checkbox {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px 0;
    }
    &--small-text {
      font-size: 8px;
      color: #999999;
      font-weight: 500;
      text-align: center;
      a {
        color: $ov-primary;
      }
      padding-bottom: 14px;
    }
    &--submit-box {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 18px;
    }
  }
}

.list_item_isMember {
  background: #e5e7fa;
  border-radius: 6px;
  font-weight: 600;
  font-size: 10px;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;
  color: #4156f6;
  width: 75px;
}

.list_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-style-popup {
  top: 482px !important;
}

.el-form-item__error {
  position: absolute;
  font-family: 'Montserrat';
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  top: 0;
  left: 105%;
  padding: 14px;
  color: #e60022;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  max-width: 224px;
  height: max-content;
  min-height: 48px;
  border-radius: 13px;
  background-color: white;
  box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.invite-dialog {
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
