<template>
  <div class="main" :style="{ width: step === 4 ? '100%' : '390px' }">
    <div class="main__form" :style="{ width: step === 4 ? '100%' : '390px' }">
      <template v-if="step === 1">
        <div class="main__form--title">Step 1: Set Password</div>
        <div class="main__form--subtitle">Fill in the fields to set your Password.</div>
        <el-form
          ref="passwordForm"
          class="main__form--box"
          hide-required-asterisk
          :model="payload.passwordForm"
          :rules="rules"
        >
          <div v-if="errors.global.value" class="el-form-item__global-error-container">
            <div class="el-form-item__global-error">
              <img src="@/assets/images/icons/error.svg" alt="" />
              <span>{{ errors.global.value }}</span>
            </div>
            <span class="clear-error" @click="clearError">X</span>
          </div>
          <el-form-item prop="password" class="form-item">
            <el-input
              ref="password"
              v-model="payload.passwordForm.password"
              class="main__form--box__input"
              placeholder="Password"
              :type="showPassword ? 'text' : 'password'"
              @input="validateField('password', 'passwordForm')"
              @blur="validateField('password', 'passwordForm')"
            >
              <template #prefix>
                <img src="@/assets/images/icons/lock-icon.svg" alt="password_icon" />
              </template>
              <template #suffix>
                <div v-if="payload.passwordForm.password" style="position: relative" @click="focusElement('password')">
                  <span for="password" class="custom_placeholder"> Password </span>
                </div>
                <img
                  :class="errors.password.value ? 'eye_icon' : ''"
                  :src="showPassword ? hideEyeIcon : showEyeIcon"
                  alt="eye_icon"
                  @click="showPassword = !showPassword"
                />
                <template v-if="errors.password.value">
                  <div
                    class="error_icon"
                    @mouseover="showError('password', 'mouseover')"
                    @mouseout="showError('password', 'mouseout')"
                    @click="showError('password', 'click')"
                  >
                    <img
                      v-if="errors.password.status === 'Medium' && payload.passwordForm.password"
                      src="@/assets/images/icons/warning.svg"
                      alt=""
                    />
                    <img
                      v-else-if="errors.password.status === 'Strong' && payload.passwordForm.password"
                      src="@/assets/images/icons/good.svg"
                      alt=""
                    />
                    <img v-else src="@/assets/images/icons/error.svg" alt="" />
                  </div>
                </template>
              </template>
            </el-input>
            <div v-if="errors.password.isShow && isWeb()" :class="getColor()" class="el-form-item__error strength">
              <span v-html="errors.password.value"></span>
            </div>
            <template #error>
              <div></div>
            </template>
          </el-form-item>
          <el-form-item prop="password_confirmation" class="form-item">
            <el-input
              ref="password_confirmation"
              v-model="payload.passwordForm.password_confirmation"
              class="main__form--box__input"
              placeholder="Confirm password"
              :type="showConfirmPassword ? 'text' : 'password'"
              @input="validateField('password_confirmation', 'passwordForm')"
              @blur="validateField('password_confirmation', 'passwordForm')"
            >
              <template #prefix>
                <img src="@/assets/images/icons/lock-icon.svg" alt="password_icon" />
              </template>
              <template #suffix>
                <div
                  v-if="payload.passwordForm.password_confirmation"
                  style="position: relative"
                  @click="focusElement('password_confirmation')"
                >
                  <span for="password_confirmation" class="custom_placeholder"> Confirm Password </span>
                </div>
                <img
                  :class="errors.password_confirmation.value ? 'eye_icon' : ''"
                  :src="showConfirmPassword ? hideEyeIcon : showEyeIcon"
                  alt="eye_icon"
                  @click="showConfirmPassword = !showConfirmPassword"
                />

                <template v-if="errors.password_confirmation.value">
                  <img
                    src="@/assets/images/icons/error.svg"
                    alt=""
                    class="error_icon"
                    @mouseover="showError('password_confirmation', 'mouseover')"
                    @mouseout="showError('password_confirmation', 'mouseout')"
                    @click="showError('password_confirmation', 'click')"
                  />
                </template>
              </template>
            </el-input>
            <template #error>
              <div v-if="errors.password_confirmation.isShow && isWeb()" class="el-form-item__error">
                <span v-html="errors.password_confirmation.value"></span>
              </div>
              <div></div>
            </template>
          </el-form-item>
          <el-button class="submit-button" :disabled="!isValid" @click="nextPage">
            <span class="submit-button__text">Next</span>
          </el-button>

          <error-massage
            v-if="errors.password.isShow && !isWeb()"
            :dialog-visible="errors.password.isShow && !isWeb()"
            :error-text="errors.password.value"
            :text-color="
              errors.password.status === 'Medium' && payload.passwordForm.password
                ? 'warning'
                : errors.password.status === 'Strong' && payload.passwordForm.password
                ? 'done'
                : 'weak'
            "
            @visible="errors.password.isShow = false"
          ></error-massage>

          <error-massage
            v-if="errors.password_confirmation.isShow && !isWeb()"
            :dialog-visible="errors.password_confirmation.isShow && !isWeb()"
            :error-text="errors.password_confirmation.value"
            @visible="errors.password_confirmation.isShow = false"
          ></error-massage>
        </el-form>
      </template>

      <template v-if="step === 2">
        <div class="main__form--title">Step 2: Enter Full Name</div>
        <div class="main__form--subtitle">Fill in the field to set your Full Name.</div>
        <el-form
          ref="fullnameForm"
          class="main__form--box"
          hide-required-asterisk
          :model="payload.fullnameForm"
          :rules="rules"
        >
          <el-form-item prop="full_name" class="form-item">
            <el-input
              ref="full_name"
              v-model="payload.fullnameForm.full_name"
              class="main__form--box__input"
              placeholder="Full Name"
              maxlength="30"
              @input="validateField('full_name', 'fullnameForm')"
              @blur="validateField('full_name', 'fullnameForm')"
            >
              <template #prefix>
                <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
              </template>

              <template #suffix>
                <div
                  v-if="payload.fullnameForm.full_name"
                  style="position: relative"
                  @click="focusElement('full_name')"
                >
                  <span
                    for="full_name"
                    class="custom_placeholder"
                    :class="payload.fullnameForm.full_name ? 'active' : ''"
                  >
                    Full Name
                  </span>
                </div>
                <template v-if="errors.full_name.value || errors.full_name.status">
                  <div
                    class="error_icon"
                    @mouseover="showError('full_name', 'mouseover')"
                    @mouseout="showError('full_name', 'mouseout')"
                    @click="showError('full_name', 'click')"
                  >
                    <img
                      v-if="errors.full_name.status === 'Medium' && payload.fullnameForm.full_name"
                      src="@/assets/images/icons/warning.svg"
                      alt=""
                    />
                    <img v-else-if="errors.full_name.value" src="@/assets/images/icons/error.svg" alt="" />
                  </div>
                </template>
              </template>
            </el-input>

            <div
              v-if="errors.full_name.status === 'Medium' && errors.full_name.isShow && isWeb()"
              class="el-form-item__error strength warning"
            >
              <span v-html="errors.full_name.value"></span>
            </div>
            <template #error>
              <div v-if="errors.full_name.isShow && isWeb()" class="el-form-item__error">
                <span v-html="errors.full_name.value"></span>
              </div>
              <div></div>
            </template>
          </el-form-item>
        </el-form>
        <el-button class="submit-button" :disabled="!isValid" @click="onSubmit">
          <span class="submit-button__text">Save</span>
        </el-button>
        <error-massage
          v-if="errors.full_name.isShow && !isWeb()"
          :dialog-visible="errors.full_name.isShow && !isWeb()"
          :error-text="errors.full_name.value"
          :text-color="errors.full_name.status === 'Medium' && payload.fullnameForm.full_name ? 'warning' : 'weak'"
          @visible="errors.full_name.isShow = false"
        ></error-massage>
      </template>

      <template v-if="step === 3">
        <div class="main__form--title">Step 3: Set PIN</div>
        <div class="main__form--subtitle">Fill in the fields to set your PIN.</div>
        <el-form ref="pinForm" class="main__form--box" hide-required-asterisk :model="payload.pinForm" :rules="rules">
          <div v-if="errors.global.value" class="el-form-item__global-error-container">
            <div class="el-form-item__global-error">
              <img src="@/assets/images/icons/error.svg" alt="" />
              <span>{{ errors.global.value }}</span>
            </div>
            <span class="clear-error" @click="clearError">X</span>
          </div>
          <el-form-item prop="pin" class="form-item">
            <el-input
              ref="pin"
              v-model="payload.pinForm.pin"
              class="main__form--box__input"
              placeholder="PIN"
              :type="showPIN ? 'text' : 'password'"
              @input="validateField('pin', 'pinForm')"
              @blur="validateField('pin', 'pinForm')"
            >
              <template #prefix>
                <img src="@/assets/images/icons/lock-icon.svg" alt="password_icon" />
              </template>
              <template #suffix>
                <div v-if="payload.pinForm.pin" style="position: relative" @click="focusElement('pin')">
                  <span for="pin" class="custom_placeholder"> PIN </span>
                </div>
                <img
                  :class="errors.pin.value ? 'eye_icon' : ''"
                  :src="showPIN ? hideEyeIcon : showEyeIcon"
                  alt="eye_icon"
                  @click="showPIN = !showPIN"
                />
                <template v-if="errors.pin.value">
                  <div
                    class="error_icon"
                    @mouseover="showError('pin', 'mouseover')"
                    @mouseout="showError('pin', 'mouseout')"
                    @click="showError('pin', 'click')"
                  >
                    <img
                      v-if="errors.pin.status === 'Medium' && payload.pinForm.pin"
                      src="@/assets/images/icons/warning.svg"
                      alt=""
                    />
                    <img
                      v-else-if="errors.pin.status === 'Strong' && payload.pinForm.pin"
                      src="@/assets/images/icons/good.svg"
                      alt=""
                    />
                    <img v-else src="@/assets/images/icons/error.svg" alt="" />
                  </div>
                </template>
              </template>
            </el-input>
            <div v-if="errors.pin.isShow && isWeb()" :class="getColor()" class="el-form-item__error strength">
              <span v-html="errors.pin.value"></span>
            </div>
            <template #error>
              <div></div>
            </template>
          </el-form-item>
          <el-form-item prop="pin_confirmation" class="form-item">
            <el-input
              ref="pin_confirmation"
              v-model="payload.pinForm.pin_confirmation"
              class="main__form--box__input"
              placeholder="Confirm PIN"
              :type="showConfirmPIN ? 'text' : 'password'"
              @input="validateField('pin_confirmation', 'pinForm')"
              @blur="validateField('pin_confirmation', 'pinForm')"
            >
              <template #prefix>
                <img src="@/assets/images/icons/lock-icon.svg" alt="password_icon" />
              </template>
              <template #suffix>
                <div
                  v-if="payload.pinForm.pin_confirmation"
                  style="position: relative"
                  @click="focusElement('pin_confirmation')"
                >
                  <span for="pin_confirmation" class="custom_placeholder"> Confirm PIN </span>
                </div>
                <img
                  :class="errors.pin_confirmation.value ? 'eye_icon' : ''"
                  :src="showConfirmPIN ? hideEyeIcon : showEyeIcon"
                  alt="eye_icon"
                  @click="showConfirmPIN = !showConfirmPIN"
                />

                <template v-if="errors.pin_confirmation.value">
                  <img
                    src="@/assets/images/icons/error.svg"
                    alt=""
                    class="error_icon"
                    @mouseover="showError('pin_confirmation', 'mouseover')"
                    @mouseout="showError('pin_confirmation', 'mouseout')"
                    @click="showError('pin_confirmation', 'click')"
                  />
                </template>
              </template>
            </el-input>
            <template #error>
              <div v-if="errors.pin_confirmation.isShow && isWeb()" class="el-form-item__error">
                <span v-html="errors.pin_confirmation.value"></span>
              </div>
              <div></div>
            </template>
          </el-form-item>
          <el-button class="submit-button" :disabled="!isValid" @click="setPIN">
            <span class="submit-button__text">SAVE</span>
          </el-button>

          <error-massage
            v-if="errors.pin.isShow && !isWeb()"
            :dialog-visible="errors.pin.isShow && !isWeb()"
            :error-text="errors.pin.value"
            @visible="errors.pin.isShow = false"
          ></error-massage>
          <error-massage
            v-if="errors.pin_confirmation.isShow && !isWeb()"
            :dialog-visible="errors.pin_confirmation.isShow && !isWeb()"
            :error-text="errors.pin_confirmation.value"
            @visible="errors.pin_confirmation.isShow = false"
          ></error-massage>
        </el-form>
      </template>

      <template v-if="step === 4">
        <div class="main__form--title">Step 4: Fill in profile page</div>
        <div class="main__form--subtitle" style="margin-bottom: 20px">
          Fill in the required information to join the workspace.
        </div>
        <el-form
          ref="editForm"
          class="main__form"
          hide-required-asterisk
          label-position="top"
          style="width: inherit !important"
          :model="payload.editForm"
        >
          <el-row>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }" class="main__form--picture">
              <el-form-item prop="avatar">
                <img :src="avatarUrl" alt="avatar" class="avatar" widht="138" height="138" />

                <el-dropdown class="el-upload--text">
                  <img src="~/assets/images/icons/edit-button.svg" alt="edit" class="avatar-edit_button" />

                  <template #dropdown>
                    <el-dropdown-menu class="avatar-edit_actions">
                      <el-upload
                        v-model="payload.editForm.avatar"
                        :show-file-list="false"
                        class="main__form--upload"
                        action="#"
                        accept="image/*"
                        :on-success="onAvatarUpload"
                      >
                        <el-dropdown-item
                          class="avatar-edit_actions-element"
                          @mouseover="hoveringStart"
                          @mouseout="hoveringEnd"
                        >
                          <span :class="isHovered"> Edit </span>
                        </el-dropdown-item>
                      </el-upload>
                      <el-dropdown-item
                        class="avatar-edit_actions-element"
                        @mouseover="hoveringStart"
                        @mouseout="hoveringEnd"
                      >
                        <span :class="isHovered" @click="handleDeleteAvatar"> Delete </span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-form-item>
              <div class="main__form--info">
                <span
                  v-if="payload.editForm.full_name || payload.editForm.display_name"
                  class="main__form--info__title"
                  >{{
                    payload.editForm.display_name ? payload.editForm.display_name : payload.editForm.full_name
                  }}</span
                >
                <span v-if="payload.email" class="main__form--info__subtitle">{{ payload.email }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="70">
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="name">
                <el-input
                  ref="full_name"
                  v-model="payload.editForm.full_name"
                  class="main__form--input"
                  placeholder="Full Name"
                >
                  <template #suffix>
                    <div
                      v-if="payload.editForm.full_name"
                      style="position: relative"
                      @click="focusElement('full_name')"
                    >
                      <span for="full_name" class="custom_placeholder"> Full Name </span>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="phone_number">
                <MazPhoneNumberInput
                  ref="phoneNumber"
                  v-model="payload.editForm.phone_number"
                  class="main__form--phone-number"
                  default-country-code="AM"
                  no-example
                  no-validation
                  :no-country-selector="isCountrySelector"
                  countries-height="48"
                  border-radius="0"
                  width="320px"
                />
                <span v-if="requiredFields.phone_number" class="requiredField">*</span>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="experience">
                <el-input
                  ref="experience"
                  v-model="payload.editForm.experience"
                  type="number"
                  class="main__form--input"
                  placeholder="Years of experience"
                >
                  <template #suffix>
                    <div
                      v-if="payload.editForm.experience"
                      style="position: relative"
                      @click="focusElement('experience')"
                    >
                      <span for="experience" class="custom_placeholder"> Years of experience </span>
                    </div>
                  </template>
                </el-input>
                <span v-if="requiredFields.experience" class="requiredField">*</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="70">
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="display_name">
                <el-input
                  ref="display_name"
                  v-model="payload.editForm.display_name"
                  class="main__form--input"
                  placeholder="Display Name"
                >
                  <template #suffix>
                    <div
                      v-if="payload.editForm.display_name"
                      style="position: relative"
                      @click="focusElement('display_name')"
                    >
                      <span for="display_name" class="custom_placeholder"> Display Name </span>
                    </div>
                  </template>
                </el-input>
                <span v-if="requiredFields.display_name" class="requiredField">*</span>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="languages">
                <el-select
                  ref="languagesList"
                  v-model="payload.editForm.languagesList"
                  multiple
                  class="main__form--input select"
                  placeholder="Languages"
                  :filterable="true"
                >
                  <el-option
                    v-for="(item, index) in languages"
                    :key="`lang_${index}`"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
                <span v-if="requiredFields.languages" class="requiredField">*</span>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="cv" class="main__form--cv-item">
                <div class="main__form--upload__cv-box">
                  <el-upload
                    v-model="payload.editForm.cv"
                    :show-file-list="false"
                    class="main__form--upload"
                    action="#"
                    :on-success="onCVUpload"
                  >
                    <span> </span>
                    <el-button class="main__form--upload__cv">
                      <div>
                        <div>
                          <span class="text-primary">{{ payload.editForm.cv ? payload.editForm.cv : '' }}</span>
                        </div>
                        <div>
                          <img src="@/assets/images/icons/download-icon.svg" alt="d" />

                          <span class="text-primary">Upload CV</span>
                          <span class="hint">(.pdf)</span>
                        </div>
                      </div>
                    </el-button>
                  </el-upload>
                </div>
                <span v-if="requiredFields.cv" class="requiredField">*</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="70">
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="date_of_birth">
                <el-date-picker
                  v-model="payload.editForm.date_of_birth"
                  class="main__form--input date-picker"
                  type="date"
                  value-format="YYYY-MM-DD"
                  placeholder="Date of birth"
                >
                </el-date-picker>
                <span v-if="requiredFields.date_of_birth" class="requiredField">*</span>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="timezone">
                <el-select
                  v-model="payload.editForm.timezone"
                  class="main__form--input select"
                  placeholder="Timezone"
                  :filterable="true"
                >
                  <el-option
                    v-for="zone in timeZonesList"
                    :key="`time_${zone.VALUE}`"
                    :value="zone.NAME.replace(', ', '/')"
                  >
                    {{ 'GMT' + (zone.VALUE === '0' ? '+' : '') + zone.VALUE + ' (' + zone.NAME + ')' }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="70">
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 12 }"
              :md="{ span: 8 }"
              style="display: flex; align-items: center; justify-content: center"
            >
              <el-form-item prop="gender">
                <el-radio-group v-model="payload.editForm.gender" class="main__form--radio-group">
                  <el-radio label="male">Male</el-radio>
                  <el-radio label="female">Female</el-radio>
                  <el-radio label="other">Other</el-radio>
                </el-radio-group>
                <span v-if="requiredFields.gender" class="requiredField">*</span>
              </el-form-item>
            </el-col>
            <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
              <el-form-item prop="speciality_id">
                <el-select
                  v-model="payload.editForm.speciality_id"
                  class="main__form--input select"
                  :filterable="true"
                  placeholder="Speciality"
                >
                  <el-option
                    v-for="(item, index) in profileSuccessData?.specialities"
                    :key="`spec_${index}`"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
                <span v-if="requiredFields.speciality_id" class="requiredField">*</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="edit-alert">
              <span class="edit-alert--title">
                You will need to fill in the mandatory information within 24 hours to comply with workspace rules.
              </span>
              <span class="edit-alert--subtitle">If you fail to do so you will be suspended.</span>
            </el-col>
          </el-row>
          <el-row class="main__form--actions">
            <el-col :span="12" class="submit-button__box">
              <el-button class="submit-button" :loading="isLoadingSubmit" @click="submitEdit">
                <span class="submit-button__text">{{ isLoadingSubmit ? '' : 'Save' }}</span>
              </el-button>
            </el-col>
            <el-col :span="12" class="skip-button__box">
              <el-button class="skip-button" :loading="isLoadingSubmit" @click="skipEdit">
                <span class="skip-button__text"
                  >SKIP <span style="display: inline-block; transform: scale(0.9, 2)">></span></span
                >
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>

      <check-modal
        v-if="isOpenPINDialog"
        :dialog-visible="isOpenPINDialog"
        :email="payload.email"
        @close="isOpenPINDialog = false"
      ></check-modal>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import cookies from 'js-cookie'

import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import CheckModal from '@/components/auth/AccessCheckModal.vue'

import useAuthStore from '~/stores/auth'
import usePINStore from '~/stores/pin'
import useProfileStore from '@/stores/profile'
import useWorkspaceStore from '~/stores/workspace'

import timeZonesList from '@/data/timezones.json'

import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'
definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const workspaceStore = useWorkspaceStore()
const pinStore = usePINStore()
const profileStore = useProfileStore()

const { profileSuccessData, editProfileData, editFailureData } = storeToRefs(profileStore)
const { setPinData, setPinFailureData, checkPinData, isLoadingSubmit } = storeToRefs(pinStore)
const { registerFailureData, registerSuccessData } = storeToRefs(authStore)
const { inviteAcceptSuccess } = storeToRefs(workspaceStore)

const instance = getCurrentInstance()
const $route = useRoute()
const step = ref(5)
const isValid = ref(false)
const email = ref(null)

// Global
const payload = ref({
  passwordForm: {
    password: null,
    password_confirmation: null,
  },
  fullnameForm: {
    full_name: null,
  },
  pinForm: {
    pin: null,
    pin_confirmation: null,
  },
  editForm: {
    full_name: null,
    display_name: null,
    lastname: null,
    date_of_birth: null,
    gender: null,
    phone_number: null,
    speciality_id: null,
    languagesList: null,
    experience: null,
    timezone: null,
    cv: null,
    avatar: null,
  },
  workspace_id: null,
  email: null,
})

const errors = ref({
  full_name: {
    value: '',
    status: null,
    isShow: false,
  },
  password: {
    value: '',
    status: null,
    isShow: false,
  },
  password_confirmation: {
    value: '',
    isShow: false,
  },
  pin: {
    value: '',
    status: null,
    isShow: false,
  },
  pin_confirmation: {
    value: '',
    isShow: false,
  },
  global: {
    value: null,
  },
})

// Step 1
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Step 2
const fullName = ref(null)

// Step 3
const showPIN = ref(false)
const showConfirmPIN = ref(false)

// Step 4

const config = useRuntimeConfig()
const isOpenPINDialog = ref(false)
const isHovered = ref(false)
const isCountrySelector = ref(true)
const avatarSrc = ref(null)
const avatarUrl = ref(defaultAvatar)
const requiredFields = ref({
  display_name: false,
  avatar: false,
  gender: false,
  languages: false,
  phone_number: false,
  experience: false,
  date_of_birth: false,
  speciality_id: false,
  cv: false,
})

const languages = ref([
  { name: 'EN', id: 'EN' },
  { name: 'RU', id: 'RU' },
  { name: 'HY', id: 'HY' },
])

// Validations
const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('This field is required'))
  }
  const strength = updatePasswordStrength(value)
  if (strength === 'Weak') {
    callback(new Error('Password strength: <b>Weak</b>'))
    errors.value.password.status = 'Weak'
  } else if (strength === 'Medium') {
    callback()
    errors.value.password.status = 'Medium'
    errors.value.password.value = 'Password strength: <b>Medium</b>'
  } else if (strength === 'Strong') {
    callback()
    errors.value.password.status = 'Strong'
    errors.value.password.value = 'Password strength: <b>Strong</b>'
  }
}

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== payload.value.passwordForm.password) {
    callback(new Error('Password and confirm password do not match'))
  } else {
    callback()
  }
}

const validatePIN = (rule, value, callback) => {
  const regex = /^\d{4,6}$/
  if (!regex.test(value)) {
    callback(
      new Error(
        `<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`
      )
    )
  } else {
    callback()
  }
}

const validateRepeatPIN = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the PIN again'))
  } else if (value !== payload.value.pinForm.pin) {
    callback(new Error('PIN and repeat PIN do not match.'))
  } else {
    callback()
  }
}

const rules = ref({
  full_name: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
  ],
  password: [{ validator: validatePass, trigger: 'input' }],
  password_confirmation: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    { validator: validatePass2, trigger: 'blur' },
  ],
  pin: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    {
      validator: validatePIN,
      trigger: 'blur',
    },
  ],
  pin_confirmation: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    { validator: validateRepeatPIN, trigger: 'blur' },
  ],
})

const validateField = (fieldName, formName) => {
  instance.refs[formName].validateField(fieldName, (isValid, catchedError) => {
    if ((errors.value[fieldName].status !== 'Medium' && fieldName === 'full_name') || fieldName !== 'full_name') {
      if (!isValid) {
        errors.value[fieldName].value = catchedError[fieldName][0].message
      } else if (fieldName !== 'password') {
        errors.value[fieldName].value = ''
      }
    }
  })
  if (Object.values(payload.value[formName]).every((item) => item)) {
    instance.refs[formName].validate((res) => (isValid.value = res))
  } else {
    isValid.value = false
  }
}

const showError = (fieldName, event) => {
  const webApp = isWeb()
  if (webApp) {
    errors.value[fieldName].isShow = event === 'mouseover'
  } else if (event === 'click') {
    errors.value[fieldName].isShow = true
  }
}

const updatePasswordStrength = (password) => {
  const mediumRegex =
    /^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/
  const identicalRegex = /^(?:(.)(?!\1{3}))*$/
  const words = ['password', 'admin', 'qwerty', 'asdfgh', 'xzcvb']

  if (
    identicalRegex.test(password) &&
    (password?.length > 15 || !words.some((elem) => password?.toLowerCase().includes(elem)))
  ) {
    if (
      strongRegex.test(password) &&
      (password?.length > 25 || !words.some((elem) => password.toLowerCase().includes(elem)))
    ) {
      return 'Strong'
    } else if (mediumRegex.test(password)) {
      return 'Medium'
    }
  }
  return 'Weak'
}

const getColor = () => {
  switch (errors.value.password.status) {
    case 'Medium':
      return 'warning'
    case 'Strong':
      return 'done'
    default:
      return ''
  }
}

// Submit Functions
const onSubmit = () => {
  // Register
  instance.refs.fullnameForm.validate((valid, ...props) => {
    if (valid) {
      const data = {
        email: payload.value.email,
        password: payload.value.passwordForm.password,
        password_confirmation: payload.value.passwordForm.password_confirmation,
        full_name: payload.value.fullnameForm.full_name,
        workspace_id: payload.value.workspace_id,
      }
      authStore.registerUser(data)
    } else {
      return false
    }
  })
}

const setPIN = () => {
  // Set Pin
  instance.refs.pinForm.validate((valid, ...props) => {
    if (valid) {
      const data = {
        pin: payload.value.pinForm.pin,
        pin_confirmation: payload.value.pinForm.pin_confirmation,
      }
      pinStore.setPin(data)
    } else {
      return false
    }
  })
}

// Edit profile functions
const submitEdit = () => {
  const isValid = []
  for (const i in requiredFields.value) {
    isValid.push(requiredFields.value[i] && payload.value[i])
  }
  if (isValid.every((elem) => elem)) {
    const data = payload.value
    data.workspace_id = payload.workspace_id
    profileStore.editProfile(data)
  }
}

const skipEdit = () => {
  navigateTo('/')
}

const setProfileData = (v) => {
  if (v?.user.email) {
    email.value = v.user.email
  }
  if (v?.user.full_name) {
    fullName.value = v.user.full_name
  }
  if (v?.user.avatar) {
    avatarUrl.value = v.avatarPath.includes(config.public.env.serverUrl)
      ? `${v.avatarPath}/${v.user.avatar}`
      : `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
  } else {
    avatarUrl.value = defaultAvatar
  }
  for (const i in payload.value.editForm) {
    if (!isNaN(v?.user[i]) && v?.user[i]) {
      payload.value.editForm[i] = +v?.user[i]
    } else {
      payload.value.editForm[i] = v?.user[i]
    }
  }
  if (v?.user.languages) {
    payload.value.editForm.languagesList = v?.user.languages.split(',')
  }
  if (payload.value.editForm.phone_number) {
    payload.value.editForm.phone_number = payload.value.editForm.phone_number.toString()
  }
}

// Global helpers
const focusElement = (elem) => {
  instance.refs[elem].focus()
}

const handleResize = () => {
  isCountrySelector.value = window.innerWidth < 400
  instance.update()
}

const isWeb = () => {
  return window.innerWidth > 990
}

const clearError = () => {
  errors.value.global.value = ''
}

const nextPage = () => {
  instance.refs.passwordForm.validate((valid, ...props) => {
    if (valid) {
      step.value = 2
    } else {
      return false
    }
  })
}

// Update Profile Helpers
const onAvatarUpload = (e, file) => {
  const data = payload.value.editForm
  data.workspace_id = payload.value.workspace_id
  data.avatar = file.raw
  payload.value.editForm.avatar = file.raw
  avatarSrc.value = URL.createObjectURL(file.raw)
  profileStore.editProfile(data)
}

const handleDeleteAvatar = () => {
  payload.value.editForm.avatar = 'default'
  avatarSrc.value = 'default'
  const data = payload.value.editForm
  data.workspace_id = payload.value.workspace_id
  profileStore.editProfile(data)
}

const hoveringStart = () => {
  isHovered.value = 'hovered'
}
const hoveringEnd = () => {
  isHovered.value = false
}

// Watchers
watch(registerSuccessData, (v) => {
  step.value = 3
  setProfile({ token: v.token })
})

watch(registerFailureData, (v) => {
  if (typeof v !== 'string') {
    for (const i in v) {
      if (typeof v[i] !== 'string') {
        for (const j in v[i]) {
          errors.value.global.value = v[i][j]
        }
      } else {
        errors.value.global.value = v[i]
      }
    }
  } else {
    errors.value.global.value = v
  }
})

watch(step, (v) => {
  if (v === 4 && $route.query.issetPin) {
    isOpenPINDialog.value = true
  }
})

watch(setPinFailureData, (v) => {
  for (const i in v) {
    if (typeof v[i] !== 'string') {
      for (const j in v[i]) {
        errors.value.global.value = v[i][j]
      }
    } else {
      errors.value.global.value = v[i]
    }
  }
})

watch(setPinData, ({ data }) => {
  if (process.client) {
    cookies.remove('login_pin_token')
    cookies.remove('settings_pin_token')
    const initAccountValue = JSON.parse(localStorage.getItem('accounts'))
    const userID = cookies.get('currentAccountID') ? cookies.get('currentAccountID') : 0
    const loginPinTokenExpires = new Date()
    loginPinTokenExpires.setDate(loginPinTokenExpires.getDate() + 30)
    cookies.set('login_pin_token', data.login_pin_token, {
      expires: (Date.parse(loginPinTokenExpires) - new Date()) / 86400000,
    })
    initAccountValue[userID].login_pin_token = data.login_pin_token
    initAccountValue[userID].login_pin_token_expires = loginPinTokenExpires
    cookies.set('settings_pin_token', data.settings_pin_token, 0)
    initAccountValue[userID].settings_pin_token = data.settings_pin_token
    localStorage.setItem('accounts', JSON.stringify(initAccountValue))
    step.value = 4
    workspaceStore.acceptInvite({
      email: payload.email,
      token: $route.query.inviteToken,
    })
    profileStore.getProfile()
  }
})

watch(editProfileData, (v) => {
  setProfileData(v)
})

watch(checkPinData, (v) => {
  workspaceStore.acceptInvite({
    email: $route.query.email,
    token: $route.query.inviteToken,
  })

  profileStore.getProfile(payload.value.workspace_id)
})
watch(editFailureData, (v) => {})
watch(profileSuccessData, (v) => setProfileData(v))

watch(inviteAcceptSuccess, (v) => {
  for (const i in v.requiredFields) {
    requiredFields.value[i] = true
  }
})

// Hooks

const setProfile = (data) => {
  if (process.client) {
    const accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : []
    const accountIndex = accounts.findIndex((user) => user.email === payload.value.email)
    const allCookies = cookies.get()
    for (const i in allCookies) {
      cookies.remove(i)
    }

    const loginPinTokenExpires = new Date()
    loginPinTokenExpires.setHours(loginPinTokenExpires.getHours() + 1)
    Date.parse(loginPinTokenExpires)

    const expirationDate = 1 / 24

    cookies.set('currentAccountID', accountIndex === -1 ? accounts.length : accountIndex)
    cookies.set('token', data.token, { expires: expirationDate })

    if (accountIndex === -1) {
      accounts.push({
        ID: accounts.length,
        avatarUrl: null,
        email: payload.value.email,
        first_login: false,
        remember_token: false,
        token: data.token,
        token_expires: loginPinTokenExpires,
        workspaces: [],
      })
    } else {
      accounts[accountIndex].token = data.token
      accounts[accountIndex].token_expires = loginPinTokenExpires
    }
    localStorage.setItem('accounts', JSON.stringify(accounts))
  }
}

onBeforeMount(() => {
  payload.value.email = $route.query.email
  payload.value.workspace_id = $route.query.workspace_id
  if ($route.query.token) {
    step.value = $route.query.issetPin ? 4 : 3

    setProfile({ token: $route.query.token })
  } else {
    step.value = 1
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
  isCountrySelector.value = window.innerWidth < 400
})
</script>

<style scoped lang="scss">
.main {
  display: flex;
  position: relative;
  background-color: $ov-background;
  margin-left: 170px !important;
  height: calc(100vh - 280px) !important;
  margin-right: 40px;
  margin-bottom: 100px !important;
  width: initial !important;
  &__form {
    width: 390px;
  }
}

.el-input__suffix {
  display: flex !important;
}
.el-input__suffix-inner {
  display: flex !important;
}
.el-form-item {
  margin-bottom: 20px;
}
.submit-button {
  background: $ov-primary;
  color: white;
  text-transform: uppercase;
  width: 220px;
  height: 48px;
  padding: 0;
  border-radius: 6px;
  margin-top: 200px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__text {
    width: 100%;
    display: flex;
    font-size: 17px;
    font-weight: 700;
    justify-content: center !important;
  }
  &__box {
    display: flex;
    justify-content: flex-end;
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
  background: rgba(0, 0, 0, 0.66);
}

@media (max-width: 485px) {
  .main {
    padding-left: 0;
    &__form {
      padding: 0 10px;
      margin: 0 auto;
      &--box {
        text-align: center;
      }
      &--title {
        font-size: 20px;
        text-align: center;
      }
      &--subtitle {
        text-align: center;
      }
    }
  }
}

.main {
  &__form {
    .el-row {
      min-width: 100% !important;
    }
    .el-input__inner {
      min-width: 100% !important;
      max-width: 320px !important;
      height: 48px !important;
    }
    &-item {
      min-width: 100%;
      max-width: 320px;
      height: 48px;
      margin: 0 !important;
    }
    .el-input--suffix {
      min-width: 100%;
      max-width: 320px;
      height: 48px !important;
      margin: 0 !important;
    }
    &--upload {
      &__cv {
        border: none;
        background-color: inherit;
      }
    }
    &--phone-number {
      width: 100%;
    }
    &--input {
      &.select {
        width: 100%;
      }
    }
    &--info {
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      &__title {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #2c3a9f;
      }
      &__subtitle {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #717a7f;
      }
    }
    &--picture {
      display: flex;
      img {
        width: 119px;
        height: 119px;
        border-radius: 20px;
        object-fit: cover;
        background-color: #999;
      }
    }
    &--actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
}

.avatar {
  & > .el-form-item__content {
    align-items: left !important;
  }
}

.submit-button__box {
  flex: none;
  & .submit-button {
    margin-top: 0;
  }
}

.skip-button {
  border: none;
  background-color: inherit;
  &__text {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #717a7f;
  }
}

.avatar-edit_button {
  background: #ffffff !important;
  width: 22px !important;
  height: 22px !important;
}
.avatar-edit {
  &_actions {
    .main__form--upload {
      .el-upload--text {
        width: 100%;
      }
    }
    &-element {
      background-color: #ffffff;
      width: 116px;
      padding: 0 !important;
      &:hover {
        width: 100%;
        span {
          display: block;
          padding: 0;
          margin: 0;
          color: #3f3356 !important;
        }
      }
    }
    &-element > span {
      text-align: center;
      display: block;
      font-size: 15px;
      font-weight: 400;
      width: 80px;
      color: #3f3356 !important;
    }
  }
}
.avatar-edit_actions-element {
  .hovered {
    color: #d0c9d6 !important;
  }
}

.el-upload--text {
  position: absolute !important;
  cursor: pointer !important;
  bottom: -6px !important;
  right: -6px !important;
  width: 33px !important;
  height: 33px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7fa !important;
  background: #ffffff !important;
  border-radius: 50% !important;
}

.edit-alert {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 6px;
  margin-bottom: 40px;
  &--title {
    color: #ff647c;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
  }
  &--subtitle {
    color: #6d7075;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
  }
}
.requiredField {
  position: absolute;
  color: red;
  top: -18px;
  z-index: 99999;
  right: 0;
}
</style>
