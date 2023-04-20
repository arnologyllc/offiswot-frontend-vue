<template>
  <div class="main">
    <el-menu class="main__sidebar" :collapse="true">
      <div class="main__sidebar--title">
        <img src="@/assets/images/icons/flag-icon.svg" alt="|>" />
        <span>Channels</span>
      </div>
      <div class="main__sidebar--channels-list">
        <div
          v-for="(item, index) in collapseChannels"
          :key="`channel_${index}`"
          class="main__sidebar--channels"
        >
          <div class="main__sidebar--channels__item">
            <div
              class="main__sidebar--channels__item--circle"
              :style="{
                background: item.statusColor,
                visibility: item.statusColor ? 'visible' : 'hidden',
              }"
            ></div>
            <div class="main__sidebar--channels__item--channel">
              {{ item.name }}
            </div>
          </div>
        </div>
        <el-button
          v-if="channelsList.length > collapseChannels.length"
          type="text"
          class="main__sidebar--show-more-channels"
          @click="showChannelsCount = channelsList.length"
          >+ {{ channelsList.length - showChannelsCount }} more</el-button
        >
      </div>
      <div class="main__sidebar--title">
        <img src="@/assets/images/icons/chat-icon.svg" alt="(...)" />
        <span>Chats</span>
      </div>
      <div class="main__sidebar--chat-list">
        <div
          v-for="(item, index) in chatsList"
          :key="`user_${index}`"
          class="main__sidebar--chat"
          :title="item.name"
        >
          <div
            class="main__sidebar--channels__item--circle"
            :style="{
              background: item.statusColor,
              visibility: item.statusColor ? 'visible' : 'hidden',
            }"
          ></div>
          <img :src="item.avatar" alt="User" />
        </div>
      </div>
    </el-menu>
    <NuxtChild />
    <check-modal
      :model="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script>
import {
  checkFirstLogin,
  checkLoginToken,
  checkSettingsToken,
} from '~/middleware/helpers'
import CheckModal from '@/components/auth/AccessCheckModal.vue'

export default {
  name: 'WorkspaceMain',
  components: {
    CheckModal,
  },
  middleware: [
    function ({ redirect, route }) {
      if (!route.params.id) {
        redirect('/profile')
      }
    },
  ],
  data() {
    return {
      isOpenPINDialog: false,
      showChannelsCount: 2,
      channelsList: [
        {
          name: '#G',
          statusColor: '#90B9E5',
        },
        {
          name: '#BD',
          statusColor: null,
        },
        {
          name: '#AF',
          statusColor: null,
        },
        {
          name: '#RRA',
          statusColor: null,
        },
        {
          name: '#BGG',
          statusColor: null,
        },
      ],
      chatsList: [
        {
          name: 'Alicia Petgrave',
          avatar:
            'data:image/jpeg;base64,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',
        },
        {
          name: 'Robert Downey',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/c/7/csm_frank-sprenger-interviewkachel_4470dab1a7.jpg',
          statusColor: '#FF3737',
        },
        {
          name: 'Robert Pattinson',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/7/1/csm_Richard_von_Braunschweig_4e4e3bd591.jpeg',
          statusColor: '#EFEFEF',
        },
        {
          name: 'David White',
          avatar:
            'https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg',
          statusColor: '#EFEFEF',
        },
        {
          name: 'Alicia Petgrave',
          avatar:
            'data:image/jpeg;base64,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',
        },
        {
          name: 'Robert Downey',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/c/7/csm_frank-sprenger-interviewkachel_4470dab1a7.jpg',
        },
        {
          name: 'Robert Pattinson',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/7/1/csm_Richard_von_Braunschweig_4e4e3bd591.jpeg',
        },
        {
          name: 'David White',
          avatar:
            'https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg',
        },
        {
          name: 'Alicia Petgrave',
          avatar:
            'data:image/jpeg;base64,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',
        },
        {
          name: 'Robert Downey',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/c/7/csm_frank-sprenger-interviewkachel_4470dab1a7.jpg',
        },
        {
          name: 'Robert Pattinson',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/7/1/csm_Richard_von_Braunschweig_4e4e3bd591.jpeg',
        },
        {
          name: 'David White',
          avatar:
            'https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg',
        },
        {
          name: 'Alicia Petgrave',
          avatar:
            'data:image/jpeg;base64,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',
        },
        {
          name: 'Robert Downey',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/c/7/csm_frank-sprenger-interviewkachel_4470dab1a7.jpg',
        },
        {
          name: 'Robert Pattinson',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/7/1/csm_Richard_von_Braunschweig_4e4e3bd591.jpeg',
        },
        {
          name: 'David White',
          avatar:
            'https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg',
        },
        {
          name: 'Alicia Petgrave',
          avatar:
            'data:image/jpeg;base64,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',
        },
        {
          name: 'Robert Downey',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/c/7/csm_frank-sprenger-interviewkachel_4470dab1a7.jpg',
        },
        {
          name: 'Robert Pattinson',
          avatar:
            'https://www.mantruckandbus.com/fileadmin/_processed_/7/1/csm_Richard_von_Braunschweig_4e4e3bd591.jpeg',
        },
        {
          name: 'David White',
          avatar:
            'https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg',
        },
      ],
    }
  },
  computed: {
    collapseChannels() {
      return this.channelsList.slice(0, this.showChannelsCount)
    },
  },
  mounted() {
    checkFirstLogin(this.$cookies, this.$router)
    checkLoginToken(this.$cookies, this.$router)
    if (!checkSettingsToken(this.$cookies)) {
      this.isOpenPINDialog = true
    }
  },
}
</script>

<style scoped lang="scss">
.main {
  height: calc(100vh - 80px);
  display: flex;

  &__sidebar {
    padding: 30.5px 20.3px;
    width: 146px;
    border-radius: 0px 20px 20px 0px;
    background: linear-gradient(180.87deg, #2c3a9f 6.42%, #299ba0 97.68%);
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(4px);
    color: white;
    overflow-y: auto;
    height: calc(100vh - 80px);
    &::-webkit-scrollbar {
      display: none;
    }

    &--title {
      display: flex;
      align-items: center;
      gap: 0 7px;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 17px;
    }

    &--channels-list {
      border-bottom: 1px solid white;
      padding-bottom: 44px;
      margin-bottom: 27px;
    }

    &--channels {
      &__item {
        display: flex;
        align-items: center;
        gap: 0 8px;
        margin-bottom: 14px;
        cursor: pointer;
        &--circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        &--channel {
          width: 62px;
          height: 43px;
          background: linear-gradient(
            90deg,
            rgba(48, 110, 154, 0.51) -55.65%,
            #7ab7e3 133.06%
          );
          border-radius: 20px;
          color: #f0f0f0;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    &--show-more-channels {
      display: flex;
      justify-content: center;
      width: calc(100% - 20px);
      color: white;
      font-size: 14px;
      font-weight: 500;
    }

    &--chat {
      display: flex;
      gap: 0 14px;
      align-items: center;
      margin-bottom: 16px;
      cursor: pointer;
      img {
        border: 0.5px solid #ffffff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
}
</style>
