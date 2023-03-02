<template>
  <div class="main-dash">
    <div
      class="main-dash__header"
      :class="{ 'edit-mode': !dragOptions.disabled }"
    >
      <div class="main-dash__header--left">
        <el-button-group class="main-dash__header--button-group">
          <el-button
            round
            :class="{ active: currentComponent === 'Desk' }"
            @click="currentComponent = 'Desk'"
            >Desk</el-button
          >
          <el-button
            round
            :class="{ active: currentComponent === 'List' }"
            @click="currentComponent = 'List'"
            >List</el-button
          >
        </el-button-group>
        <el-button
          v-if="currentComponent === 'Desk'"
          class="main-dash__header--edit-button"
          circle
          @click="dragOptions.disabled = false"
        >
          <img src="@/assets/images/icons/edit-icon.svg" alt="/" />
        </el-button>
      </div>
      <div v-if="currentComponent === 'Desk'"  class="main-dash__header--right" >
        <el-button class="main-dash__header--meetings" round >
          <div class="main-dash__header--meetings__left">
            <img src="@/assets/images/icons/clock-icon.svg" alt="(-)" />
            <div class="main-dash__header--meetings__left--title">
              Meeting in 30 minutes
            </div>
          </div>
          <div class="main-dash__header--meetings__right">+ 2 more</div>
        </el-button>
        <el-button type="text" class="main-dash__header--create-meeting"
          >+ Create meeting</el-button
        >
      </div>
    </div>
    <div class="main-dash__content">
      <component :is="currentComponent" :drag-options="dragOptions" @save="dragOptions.disabled = true"></component>
    </div>
  </div>
</template>

<script>
import Desk from '@/components/staff/Desk.vue'
import List from '@/components/staff/List.vue'

export default {
  name: 'WorkspaceId',
  components: {
    Desk,
    List,
  },
  data() {
    return {
      currentComponent: 'Desk',
      dragOptions: {
        animation: 1,
        group: 'users',
        disabled: true,
        ghostClass: 'ghost',
      },
    }
  },
}
</script>

<style scoped lang="scss">
.main-dash {
  width: calc(100% - 146px);
  height: calc(100vh - 80px);
  padding: 16px 66px 16px 21px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;

    &.edit-mode {
      opacity: 0.5;
      pointer-events: none;
    }

    &--left {
      display: flex;
      align-items: center;
      gap: 0 9px;
    }
    &--right {
      display: flex;
      align-items: center;
      gap: 0 26px;
    }
    &--button-group {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
      border-radius: 18px;
      ::v-deep {
        .el-button {
          background-color: white;
          border: none;
          color: black;
          font-weight: 600;
          font-size: 16px;
          width: 63px;
          height: 32px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          &.active {
            background: linear-gradient(
              246.28deg,
              #4156f6 -13.83%,
              #0cb1b9 107.63%
            );
            color: white;
          }
        }
      }
    }
    &--edit-button {
      width: 36px;
      height: 36px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e5e7fa;
      color: $ov-primary;
      img {
        width: 20px;
        height: 20px;
      }
    }
    &--meetings {
      padding: 0 22px;
      width: 249px;
      height: 53px;
      background: linear-gradient(216.33deg, #4456e1 -6.33%, #0cb1b9 118.1%);
      color: white;
      ::v-deep {
        span {
          display: flex;
          justify-content: space-between;
        }
      }
      &__left {
        display: flex;
        align-items: center;
        width: 120px;
        white-space: break-spaces;
        height: 0px;
        font-weight: 600;
        font-size: 14px;
        img {
          margin-top: 13px;
        }
      }
      &__right {
        color: #efefef;
        font-weight: 400;
        font-size: 14px;
      }
    }
    &--create-meeting {
      font-size: 16px;
      font-weight: 600;
      color: $ov-primary;
    }
  }
}
</style>