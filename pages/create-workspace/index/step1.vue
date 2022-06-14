<template>
  <div class="main">
    <el-form
      ref="step1"
      class="main__form"
      hide-required-asterisk
      :rules="rules"
      :model="payload"
      @submit.native.prevent="onSubmit"
    >
      <div class="main__title">Create workspace</div>
      <div class="main__subtitle">Please fill the forms to register</div>
      <el-form-item prop="name">
        <el-input
          v-model="payload.name"
          class="main__form--input"
          placeholder="Company name"
        ></el-input>
      </el-form-item>
      <el-form-item prop="industry_id">
        <el-select
          v-model="payload.industry_id"
          :loading="isLoadingIndustries"
          class="main__form--input"
          placeholder="Select Industry"
        >
          <el-option
            v-for="(item, index) in industriesList.industries"
            :key="`option_${index}`"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="main__form--footer">
        <div class="main__form--actions">
          <el-button
            type="text"
            class="main__form--actions__text-btn"
            @click="$router.push('/profile')"
            >Cancel</el-button
          >
          <el-button
            native-type="submit"
            :loading="isLoadingSubmit"
            class="submit-button"
          >
            <span>
              <span class="submit-button__text">Next</span>
              <img src="@/assets/images/icons/chevron-icon.svg" alt="arrow" />
            </span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import showError from '@/mixins/errorToast.js'

export default {
  name: 'CreateWorkSpaceStep1',
  mixins: [showError],
  data() {
    return {
      payload: {
        name: null,
        industry_id: null,
      },
      rules: {
        name: {
          required: true,
          message: 'Please input workspace name',
          trigger: 'blur',
        },
      },
    }
  },
  computed: {
    ...mapGetters('workspace', [
      'isLoadingIndustries',
      'industriesList',
      'industriesError',
      'isLoadingSubmit',
      'createWorkspaceSuccess',
      'createWorkspaceError',
    ]),
  },
  watch: {
    createWorkspaceSuccess(v) {
      if (v) {
        this.$message.success('Success !')
        this.$router.push('/profile')
      }
    },
    createWorkspaceError: {
      deep: true,
      handler(v) {
        this.showError(v)
      },
    },
    industriesError: {
      deep: true,
      handler(v) {
        this.showError(v)
      },
    },
  },
  async mounted() {
    await this.getIndustries()
  },
  methods: {
    ...mapActions('workspace', ['getIndustries', 'createWorkspace']),
    onSubmit() {
      this.$refs.step1.validate((valid) => {
        if (valid) {
          this.createWorkspace(this.payload)
        } else {
          this.$message.error('Wrong!')
          return false
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  min-height: calc(100vh - 366px);
  padding: 74px 246px;

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $ov-text--title;
    margin-bottom: 4px;
  }
  &__subtitle {
    font-size: 14px;
    color: $ov-text--subtitle;
    margin-bottom: 47px;
  }

  &__form {
    min-height: calc(100vh - 514px);
    display: flex;
    flex-direction: column;
    width: 480px;
    border-left: 1px solid #d0c9d6;
    padding: 21px 45px;

    &--input {
      width: 100%;
      box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
      ::v-deep {
        .el-input__inner {
          height: 48px;
          border-radius: 6px;
          border-color: $ov-border--light;

          &:focus,
          &:hover {
            border-color: $ov-primary;
          }
          &::placeholder {
            color: $ov-placeholder;
          }
        }
        .el-input__suffix {
          padding-right: 8px;
          cursor: pointer;
          i {
            color: black;
            &::before {
              content: '\e78f';
            }
          }
        }
      }
    }

    &--actions {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__text-btn {
        font-size: 17px;
        font-weight: 600;
        text-transform: uppercase;
        color: $ov-primary--light;
        &:hover {
          color: $ov-primary;
        }
      }
      .submit-button {
        background: linear-gradient(90.32deg, #0cb1b9 0.28%, #4156f6 99.75%);
        color: white;
        text-transform: uppercase;
        width: 220px;
        height: 48px;
        padding: 0;
        padding-right: 8px;
        border-radius: 6px;
        ::v-deep span {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        &__text {
          width: 100%;
          display: flex;
          font-size: 17px;
          font-weight: 700;
          justify-content: center !important;
        }
      }
    }
    &--footer {
      margin-top: auto;
      margin-bottom: 0;
    }
  }
  ::v-deep {
    .el-form-item.is-error {
      .el-input__inner {
        border-color: red !important;
      }
    }
    .el-form-item__error {
      z-index: 1000;
    }
  }
}
</style>
