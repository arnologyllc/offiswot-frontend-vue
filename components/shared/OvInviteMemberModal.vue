<template>
  <el-dialog
    v-model="props.dialogVisible"
    :width="dialogWidth"
    show-close
    top="30vh"
    @close="$emit('close')"
  >
    <div class="dialog__title">
      {{ showSecondPage ? 'Workspace Rules' : 'Invite member' }}
    </div>
    <div v-if="!showSecondPage" class="dialog__body">
      <el-form ref="inviteForm">
        <div class="dialog__input--label">Enter email</div>
        <el-autocomplete
          ref="email"
          v-model="userEmail"
          popper-class="custom-style-popup"
          class="dialog__input"
          :class="error.value ? 'is-error' : ''"
          :fetch-suggestions="querySearch"
          placeholder="Enter email"
          prefix-icon="el-icon-search"
          @select="handleSelect"
          @input="validateEmail"
        >
          <template v-if="!error.value" #default="{ item }">
            <span v-html="showingEmail(item.value, userEmail.length)"></span>
            <span v-if="item.link" class="list_item_isMember">Member</span>
          </template>

          <template v-if="error.value" #suffix>
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
          <div
            v-for="(item, index) in selectedEmails"
            :key="`email_${index}`"
            class="dialog__chip"
          >
            <div class="dialog__chip--text">{{ item.value }}</div>
            <div class="dialog__chip--icon" @click="removeChip(item)">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
        <div class="dialog__invite">
          <el-button class="dialog__invite--btn" @click="goNextPage">
            INVITE
          </el-button>
        </div>
      </el-form>
    </div>
    <div v-else class="dialog__second-page">
      <div class="dialog__second-page--title">
        What info must your workspace members provide to join?
      </div>
      <div class="dialog__second-page--checkobox-container">
        <el-checkbox-group v-model="checkList">
          <div class="dialog__second-page--checkbox">
            <div
              v-for="(item, index) in checkboxItems"
              :key="`checkbox_${index}`"
            >
              <el-checkbox :label="item"></el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <div class="dialog__second-page--small-text">
        You will be able to edit requried information abour memebers of the
        workspace in settings (click <a href="">here</a>).
      </div>
      <div class="dialog__second-page--submit-box">
        <el-button class="dialog__invite--btn"> SUBMIT </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
})

const error = ref({
  value: null,
  isShow: null,
})

const emails = ref([
  {
    value: 'aaaaaaaaaaaaaaaaaaaaaa@email.ru',
    link: 'https://github.com/vuejs/vue',
  },
  { value: 'bbb@gmail.com', link: 'https://github.com/ElemeFE/element' },
  { value: 'cc@gmail.com', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'ffff@mail.ru', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'asas@mail.ru', link: 'https://github.com/vuejs/vuex' },
  {
    value: 'dsdf@gmail.com',
    link: 'https://github.com/vuejs/vue-router',
  },
  { value: 'babel@mail.ru', link: 'https://github.com/babel/babel' },
])

const checkboxItems = ref([
  'Name',
  'Picture',
  'Surname',
  'Languages',
  'Phone number',
  'Years of experience',
  'Date of birth',
  'Specialty',
  'Upload CV',
])

const userEmail = ref('')
const selectedEmails = ref([])
const showSecondPage = ref(false)
const checkList = ref([
  'Name',
  'Picture',
  'Surname',
  'Languages',
  'Phone number',
  'Years of experience',
  'Date of birth',
  'Specialty',
  'Upload CV',
])

const dialogWidth = computed(() => (showSecondPage.value ? '918px' : '432px'))

const goNextPage = () => {
  showSecondPage.value = true
}

const handleSelect = (item) => {
  if (!selectedEmails.value.includes(item)) {
    selectedEmails.value.push(item)
    userEmail.value = ''
  }
  emails.value = emails.value.filter((el) => el.value !== item.value)
}

const querySearch = (queryString, cb) => {
  const allEmails = emails.value
  const results =
    queryString && !error.value.value
      ? allEmails.filter(createFilter(queryString))
      : []
  cb(results)
}

const createFilter = (queryString) => {
  return (email) => {
    return email.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const removeChip = (item) => {
  selectedEmails.value = selectedEmails.value.filter(
    (el) => el.value !== item.value
  )
  emails.value.push(item)
}

const validateEmail = (value) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  if (value.includes('@') && !emailRegex.test(value)) {
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

const showingEmail = (email, size) => {
  const part1 = email.slice(0, size)
  const part2 = email.slice(size)
  return `<span class="list_item_value">${part1}<span style="opacity: 0.3">${part2}</span></span>`
}
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
    margin-right: 4px;
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
  }
  &__text-btn {
    margin-top: 9px;
    font-size: 17px;
    font-weight: 600;
    color: #d0c9d6;
  }
  &__second-page {
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
</style>
