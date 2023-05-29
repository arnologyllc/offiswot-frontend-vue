<template>
  <div class="submit-buttons-container">
    <el-form-item class="submit-form-item">
      <div class="submit-button__outer">
        <el-button
          class="submit-button"
          native-type="submit"
          :loading="props.loginLoading"
          :class="{ active: !props.isValid }"
        >
          <span class="submit-button__text">
            {{ !props.loginLoading ? props.loginTitle : '' }}
          </span>
          <img src="@/assets/images/icons/chevron-icon.svg" alt="arrow" class="arrow_position" />
        </el-button>
      </div>
    </el-form-item>
    <el-form-item v-if="props.showSocial">
      <div class="or-text">or</div>
    </el-form-item>
    <el-form-item v-if="props.showSocial" class="submit-form-item" style="width: 100%">
      <el-button class="google-sign-button">
        <div class="google-sign-button__inner">
          <img src="@/assets/images/icons/google-icon.svg" alt="G" />
          <span class="google-sign-button__inner--text">{{ props.socialTitle }}</span>
        </div>
      </el-button>
    </el-form-item>
  </div>
</template>

<script setup>
const props = defineProps({
  loginTitle: {
    type: String,
    default: '',
  },
  socialTitle: {
    type: String,
    default: '',
  },
  showSocial: {
    type: Boolean,
    default: true,
  },
  loginLoading: {
    type: Boolean,
    default: false,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped lang="scss">
.submit-buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.or-text {
  color: $ov-text--subtitle;
  display: flex;
  justify-content: center;
}
.submit-form-item {
  margin-bottom: 8px;
}

.google-sign-button {
  width: 100%;
  height: 48px;
  padding: 0;
  border-color: $ov-border--light;
  border-radius: 6px;
  &:focus,
  &:hover {
    background-color: white;
    border-color: $ov-primary;
  }
  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 21px;
    color: black;
    font-size: 15px;
    font-weight: 500;
  }
}
.el-icon {
  position: absolute;
}

.el-icon.is-loading {
  position: absolute;
}
.submit-button {
  background: linear-gradient(90.32deg, #0cb1b9 0.28%, #4156f6 99.75%);
  color: white;
  text-transform: uppercase;
  width: 220px;
  height: 48px;
  padding: 0;
  border-radius: 6px;
  span {
    margin: 0;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__text {
    width: 100%;
    display: flex;
    font-size: 17px;
    font-weight: 700;
    justify-content: center !important;
  }
  &__outer {
    display: flex;
    justify-content: center;
  }
}
@media (max-width: 375px) {
  .arrow_position {
    position: absolute;
    right: 5px;
  }
}

@media (min-width: 375px) {
  .arrow_position {
    position: absolute;
    right: 5px;
  }
}

.active {
  opacity: 0.5;
}
</style>
