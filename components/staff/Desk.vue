<template>
  <div class="desk">
    <div class="desk__main" :class="{ 'edit-mode': !dragOptions.disabled }">
      <div v-if="!reload">
        <div
          v-for="(item, index) in tablesList"
          :key="`row_${index}`"
          class="desk__row"
        >
          <div v-for="(col, idx) in item" :key="`col_${idx}`">
            <draggable
              v-model="tablesList[index][idx]"
              v-bind="dragOptions"
              :move="handleMove"
              @end="handleDragEnd(index, idx)"
            >
              <transition-group
                :name="
                  tablesList[index][idx].includes(movingItem) &&
                  tablesList[index][idx].includes(futureItem)
                    ? 'grid'
                    : 'list'
                "
                class="desk__row--col"
              >
                <div
                  v-for="(user, i) in col"
                  :id="user.id"
                  :key="user.id"
                  class="desk__row--col__table"
                  :class="{ disabled: user.disabled }"
                >
                  <div v-if="user.user" class="outer-box">
                    <div
                      v-if="i % 2 === 0"
                      class="left-box"
                      :class="{ top: i === 0 || i === 3 }"
                      :style="{
                        border: `3px solid ${
                          currentProfession(user.professionId).color
                        }`,
                      }"
                    >
                      <div class="left-box__left">
                        <div class="left-box__left--name">
                          {{ user.user.name }}
                        </div>
                        <div class="left-box__left--profession">
                          {{ currentProfession(user.professionId).name }}
                        </div>
                        <div class="left-box__left--status">
                          <div
                            v-for="bar in 5"
                            :key="`bar_${bar}`"
                            class="bar"
                            :class="{ active: bar <= user.projectStatus }"
                          ></div>
                        </div>
                      </div>
                      <div class="left-box__right">
                        <div
                          v-if="!dragOptions.disabled"
                          class="close"
                          @click="handleDeleteUser(index, idx, i)"
                        >
                          <img
                            src="@/assets/images/icons/close-circle-icon.svg"
                            alt="(x)"
                          />
                        </div>
                        <el-badge v-if="user.online" is-dot class="badge">
                          <img
                            :src="user.user.avatar"
                            :style="{
                              border: `1px solid ${
                                currentProfession(user.professionId).color
                              }`,
                            }"
                            alt=""
                          />
                        </el-badge>
                        <img
                          v-else
                          :src="user.user.avatar"
                          :style="{
                            border: `1px solid ${
                              currentProfession(user.professionId).color
                            }`,
                          }"
                          alt=""
                        />
                      </div>
                      <div
                        class="left-box__triangle"
                        :style="{
                          'border-top': `15px solid ${
                            currentProfession(user.professionId).color
                          }`,
                        }"
                      >
                        <div class="left-box__triangle--inner"></div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="right-box"
                      :class="{ top: i === 1 || i === 2 }"
                      :style="{
                        border: `3px solid ${
                          currentProfession(user.professionId).color
                        }`,
                      }"
                    >
                      <div class="right-box__left">
                        <div class="right-box__left--name">
                          {{ user.user.name }}
                        </div>
                        <div class="right-box__left--profession">
                          {{ currentProfession(user.professionId).name }}
                        </div>
                        <div class="right-box__left--status">
                          <div
                            v-for="bar in 5"
                            :key="`bar_${bar}`"
                            class="bar"
                            :class="{ active: bar <= user.projectStatus }"
                          ></div>
                        </div>
                      </div>
                      <div class="right-box__right">
                        <div
                          v-if="!dragOptions.disabled"
                          class="close"
                          @click="handleDeleteUser(index, idx, i)"
                        >
                          <img
                            src="@/assets/images/icons/close-circle-icon.svg"
                            alt="(x)"
                          />
                        </div>
                        <el-badge v-if="user.online" is-dot class="badge">
                          <img
                            :src="user.user.avatar"
                            :style="{
                              border: `1px solid ${
                                currentProfession(user.professionId).color
                              }`,
                            }"
                            alt=""
                          />
                        </el-badge>
                        <img
                          v-else
                          :src="user.user.avatar"
                          :style="{
                            border: `1px solid ${
                              currentProfession(user.professionId).color
                            }`,
                          }"
                          alt=""
                        />
                      </div>
                      <div
                        class="right-box__triangle"
                        :style="{
                          'border-top': `15px solid ${
                            currentProfession(user.professionId).color
                          }`,
                        }"
                      >
                        <div class="right-box__triangle--inner"></div>
                      </div>
                    </div>
                  </div>
                  <img
                    :src="tableIcons[i].src"
                    :class="{ 'edit-mode': !dragOptions.disabled }"
                    alt="t"
                  />
                </div>
              </transition-group>
            </draggable>
          </div>
          <el-button
            v-if="!dragOptions.disabled && index === 0"
            class="desk__main--add-col horizontal"
            @click="onAddCol"
          >
            + More Seats
          </el-button>
        </div>
      </div>
      <el-button
        v-if="!dragOptions.disabled"
        class="desk__main--add-col"
        @click="onAddRow"
      >
        + More Seats
      </el-button>
    </div>
    <div v-if="dragOptions.disabled" class="desk__hint">
      <div
        v-for="(item, index) in hints"
        :key="`hint_${index}`"
        class="desk__hint--item"
      >
        <div
          class="desk__hint--circle"
          :style="{ background: item.color }"
        ></div>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div v-else class="desk__edit-footer">
      <el-button class="desk__edit-footer--invite"> Invite Member </el-button>
      <draggable
        v-if="availableMembers.length"
        group="users"
        :move="handleMoveFromFooter"
        v-bind="dragOptions"
        :value="availableMembers"
        class="desk__edit-footer--members__outer"
        @end="handleFooterDragEnd"
      >
        <transition-group name="grid" class="desk__edit-footer--members">
          <div
            v-for="item in availableMembers"
            :id="`footer-user_${item.user.user_id}`"
            :key="`footer-member_${item.user.user_id}`"
            class="desk__edit-footer--members__member"
          >
            <div class="desk__edit-footer--members__member--left">
              <img :src="item.user.avatar" alt="Avatar" />
            </div>
            <div class="desk__edit-footer--members__member--right">
              <div class="user-name">{{ item.user.name }}</div>
              <div class="user-profession">
                {{ currentProfession(item.professionId).name }}
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div v-else class="desk__edit-footer--members__outer"></div>
      <el-button class="desk__edit-footer--save" @click="$emit('save')"
        >Save</el-button
      >
    </div>
    <div v-if="!dragOptions.disabled" class="tutorial-box">
      <img
        src="@/assets/images/drag-tutorial/tutorial-cursor.svg"
        alt="^"
        class="tutorial-box__cursor"
      />
      <img
        src="@/assets/images/drag-tutorial/tutorial-top-arrow.svg"
        alt="|"
        class="tutorial-box__top-line"
      />
      <img
        src="@/assets/images/drag-tutorial/tutorial-user.svg"
        alt="User"
        class="tutorial-box__user"
      />
      <img
        src="@/assets/images/drag-tutorial/tutorial-bottom-line.svg"
        alt="|"
        class="tutorial-box__bottom-line"
      />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import AllTablesList from '@/data/tablesList.json'
import AllUsersList from '@/data/usersList.json'

export default {
  name: 'DeskComponent',
  components: {
    draggable,
  },
  props: {
    dragOptions: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tablesList: JSON.parse(JSON.stringify(AllTablesList)),
      usersList: JSON.parse(JSON.stringify(AllUsersList)),
      tableIcons: [
        {
          id: 1,
          src: require('@/assets/images/tables/table-top-left.svg'),
        },
        {
          id: 2,
          src: require('@/assets/images/tables/table-top-right.svg'),
        },
        {
          id: 3,
          src: require('@/assets/images/tables/table-bottom-left.svg'),
        },
        {
          id: 4,
          src: require('@/assets/images/tables/table-bottom-right.svg'),
        },
      ],
      hints: [
        { name: 'Marketing', color: '#4156F6', id: 1 },
        { name: 'Team Marketing', color: '#E4AC1A', id: 2 },
      ],
      movingItem: null,
      futureItem: null,
      movingIndex: null,
      reload: false,

      availableMembers: [],

      footerMovingIndex: null,
      footerFutureIndex: null,
      footerFutureItem: null,
      footerMovingElement: null,
      isInsideFooter: false,

      reloadFooter: false,

      lastTableId: null,
    }
  },
  mounted() {
    this.setAvailableMembers()
    this.setLastTableId()
  },
  methods: {
    currentProfession(id) {
      return this.hints.find((el) => el.id === id)
    },
    setAvailableMembers() {
      const arr = []
      ;[...this.tablesList].forEach((row, index) => {
        row.forEach((col, idx) => {
          col.forEach((user, i) => {
            if (user.user) {
              arr.push(user)
            }
          })
        })
      })
      this.availableMembers = this.usersList.filter(
        (el) => !arr.find((elem) => elem.user.user_id === el.user.user_id)
      )
    },
    handleDragEnd(index, subIndex) {
      if (!this.movingItem || !this.futureItem) {
        return
      }
      if (this.isInsideFooter && this.movingItem.user) {
        const futureIndex = this.availableMembers.indexOf(this.futureItem)
        this.availableMembers.splice(futureIndex, 1, this.movingItem)
        this.tablesList[index][subIndex].splice(this.movingIndex, 1, {
          id: this.movingItem.id,
          ...this.futureItem,
        })
        this.movingIndex = null
        this.movingItem = null
        this.futureItem = null
        return
      }
      const _items = Object.assign([], this.tablesList)
      _items.forEach((el) => {
        el.forEach((col) => {
          if (
            col[col.indexOf(this.futureItem)] &&
            this.movingItem.id !== this.futureItem.id
          ) {
            col.splice(col.indexOf(this.futureItem), 1, this.movingItem)
          }
        })
      })
      this.tablesList[index][subIndex].splice(
        this.movingIndex,
        1,
        this.futureItem
      )
      this.tablesList = _items

      setTimeout(() => {
        this.movingItem = null
        this.futureItem = null
        this.movingIndex = null
      }, 300)
    },
    handleMove(e) {
      const { index, element } = e.draggedContext
      this.movingItem = element
      this.movingIndex = index
      this.futureItem = e.relatedContext.element
      if (e.related.id.includes('footer-user_')) {
        this.isInsideFooter = true
      } else {
        this.isInsideFooter = false
      }
      return false
    },
    handleMoveFromFooter(e) {
      const { index, futureIndex, element } = e.draggedContext
      this.footerMovingIndex = index
      this.footerFutureIndex = futureIndex
      this.footerMovingElement = element
      this.footerFutureItem = e.relatedContext.element
      if (e.related.id.includes('footer-user')) {
        this.isInsideFooter = true
      } else {
        this.isInsideFooter = false
      } // Check if drag is into footer
      return false
    },
    handleFooterDragEnd() {
      if (this.isInsideFooter) {
        const futureItem = this.availableMembers[this.footerFutureIndex]
        const movingItem = this.availableMembers[this.footerMovingIndex]
        const _items = Object.assign([], this.availableMembers)
        _items[this.footerFutureIndex] = movingItem
        _items[this.footerMovingIndex] = futureItem
        this.availableMembers = _items
      } else {
        if (this.footerFutureItem.user) {
          this.availableMembers.splice(
            this.footerMovingIndex,
            1,
            this.footerFutureItem
          )
        } else {
          this.availableMembers.splice(this.footerMovingIndex, 1)
        }
        this.tablesList.forEach((row) => {
          row.forEach((col) => {
            if (col.includes(this.footerFutureItem)) {
              col.splice(col.indexOf(this.footerFutureItem), 1, {
                id: this.footerFutureItem.id,
                ...this.footerMovingElement,
              })
            }
          })
        })
      }
      this.footerFutureIndex = null
      this.footerMovingIndex = null
      this.footerFutureItem = null
      this.footerMovingElement = null
      this.isInsideFooter = false
      this.reloadFooter = true
      this.$nextTick(() => {
        this.reloadFooter = false
      })
    },
    handleDeleteUser(index, subIndex, deleteIndex) {
      const tablesList = JSON.parse(JSON.stringify(this.tablesList))
      this.availableMembers.push(tablesList[index][subIndex][deleteIndex])
      delete this.tablesList[index][subIndex][deleteIndex].user
      delete this.tablesList[index][subIndex][deleteIndex].professionId
      delete this.tablesList[index][subIndex][deleteIndex].projectStatus
      delete this.tablesList[index][subIndex][deleteIndex].disabled
      this.reload = true
      this.$nextTick(() => {
        this.reload = false
      })
    },
    setLastTableId() {
      const arr = []
      this.tablesList.forEach((row) => {
        row.forEach((col) => {
          col.forEach((user) => {
            arr.push(user.id)
          })
        })
      })
      this.lastTableId = Math.max(...arr)
    },
    onAddRow() {
      const arr = []
      for (const i in Array(this.tablesList[0].length).fill('')) {
        this.lastTableId += +i + 2
        arr.push([
          { id: this.lastTableId + +i + 2 },
          { id: this.lastTableId + +i + 3 },
          { id: this.lastTableId + +i + 4 },
          { id: this.lastTableId + +i + 5 },
        ])
      }
      this.tablesList.push(arr)
      this.setLastTableId()
    },
    onAddCol() {
      this.tablesList.forEach((row, index) => {
        this.lastTableId += index + 2
        row.push([
          { id: this.lastTableId + index + 2 },
          { id: this.lastTableId + index + 3 },
          { id: this.lastTableId + index + 4 },
          { id: this.lastTableId + index + 5 },
        ])
      })
    },
  },
}
</script>

<style scoped lang="scss">
.desk {
  &__main {
    height: calc(100vh - 236px);
    border: 1px solid $ov-border--light;
    overflow: auto;
    overflow-x: auto;
    user-select: none;
    position: relative;
    &.edit-mode {
      height: calc(100vh - 296px);
    }
    &--add-col {
      border: none;
      background: transparent;
      &.horizontal {
        margin-top: -100px;
        margin-left: -34px;
        ::v-deep span {
          text-orientation: upright;
          writing-mode: vertical-lr;
          letter-spacing: -2px;
        }
      }
      ::v-deep span {
        color: #cdcdcd;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
      }
    }
  }

  &__row {
    &:first-child {
      padding-top: 50px;
    }
    display: flex;
    gap: 0 50px;
    border-bottom: 1px solid $ov-border--light;

    &--col {
      padding: 41px 100px 41px 101px;
      display: grid;
      border-right: 1px solid $ov-border--light;
      grid-template-columns: repeat(2, 1fr);
      &__table {
        position: relative;
        cursor: pointer;
        &.disabled {
          opacity: 0.5;
        }

        img {
          width: 71px;
          height: 65px;
          -o-object-fit: cover;
          object-fit: none;

          &.edit-mode {
            opacity: 0.5;
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  &__hint {
    padding-top: 8px;
    display: flex;
    gap: 0 28px;
    align-items: center;

    &--item {
      display: flex;
      align-items: center;
      gap: 0 13px;
      font-size: 15px;
      color: black;
    }
    &--circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }
  }
  .left-box,
  .right-box {
    width: 138px;
    height: 51px;
    border-radius: 13px;
    background: white;
    opacity: 1;
    z-index: 10;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;
    top: -20px;
    box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
    .badge {
      ::v-deep {
        sup {
          right: 8px;
          top: 19px;
        }
      }
    }
    &__triangle {
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      position: absolute;
      bottom: -15px;

      &--inner {
        width: 0;
        height: 0;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-top: 11px solid white;
        margin-top: -15px;
        margin-left: -11px;
      }
    }
    &__right {
      img {
        width: 23px;
        height: 23px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    &__left {
      &--name,
      &--profession {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100px;
      }
      &--name {
        font-size: 14px;
        font-weight: 600;
        color: #444348;
        line-height: 13px;
      }
      &--profession {
        font-size: 11px;
        color: $ov-text--subtitle;
      }

      &--status {
        display: flex;
        gap: 0 1px;
        .bar {
          height: 2px;
          background: #d9d9d9;
          border-radius: 4px;
          &:first-child {
            width: 9px;
          }
          &:nth-child(2) {
            width: 14px;
          }
          &:nth-child(3) {
            width: 21px;
          }
          &:nth-child(4) {
            width: 15px;
          }
          &:last-child {
            width: 20px;
          }
          &.active {
            background: #00c48c;
          }
        }
      }
    }
    .close {
      position: absolute;
      z-index: 99;
      top: -20px;
      right: -26px;
      opacity: 1;
    }

    &.top {
      top: -38px;
    }
  }
  &__edit-footer {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 29px 0 61px;
    gap: 0 10px;
    &--invite {
      text-transform: uppercase;
      color: $ov-primary;
      font-weight: 700;
      font-size: 16px;
      background: white;
      box-shadow: 0px 7px 16px rgba(65, 86, 246, 0.16);
      border-radius: 20px;
      height: 64px;
      padding: 21px 31px;
    }
    &--members {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      align-items: center;
      gap: 0 20px;
      &__outer {
        width: calc(100% - 397px);
      }

      &__member {
        min-width: 207px;
        max-width: 207px;
        width: 207px;
        height: 64px;
        display: flex;
        align-items: center;
        gap: 0 11px;
        box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.07);
        border-radius: 20px;
        background: white;
        padding: 0 20px;

        &--left {
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        &--right {
          .user-name {
            font-weight: 500;
            font-size: 15px;
            color: black;
          }
          .user-profession {
            font-size: 10px;
            color: black;
          }
          div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 124px;
          }
        }
      }
    }
    &--save {
      width: 177px;
      height: 48px;
      border-radius: 6px;
      text-transform: uppercase;
      color: white;
      font-weight: 700;
      font-size: 16px;
      background: $ov-primary;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }

  .left-box {
    left: -93px;
    &__triangle {
      right: 8px;
    }
  }
  .right-box {
    right: -93px;
    flex-direction: row-reverse;
    &__triangle {
      left: 8px;
    }
  }
  .grid-move {
    transition: all 0.3s;
  }
  .list-move, /* apply transition to moving elements */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
  .list-leave-active {
    display: none;
  }

  .tutorial-box {
    position: absolute;
    bottom: 84px;
    left: 440px;
    z-index: 999;
    display: grid;
    opacity: 1;
    animation: hint 4s 1 forwards;
    &__bottom-line {
      margin-left: 100px;
      height: 135px;
    }
    &__user {
      padding-top: 12px;
    }
    &__cursor {
      margin-left: 6px;
      transform: rotate(345deg);
    }
    &__top-line {
      margin-left: 26px;
      height: 108px;
    }
    @keyframes hint {
      0% {
        opacity: 0;
      }
      25% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      75% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        z-index: -1;
      }
    }
  }
}
</style>
