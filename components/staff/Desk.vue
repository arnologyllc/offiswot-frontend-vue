<template>
  <div class="desk">
    <div class="desk__main" :class="{ 'edit-mode': !props.dragOptions.disabled }">
      <div>
        <div class="dailyEventsContainer" :class="{ 'edit-mode': !props.dragOptions.disabled }">
          <span class="todayDate"> {{ today }}</span>
          <div class="eventsList">
            <div class="todayEvent">
              <div></div>
              <span>Today is Tony’s birthday 🎂</span>
            </div>
            <div class="todayEvent">
              <div></div>
              <span>Shout out to Grace for amazing progress on AI integration. 🎉</span>
            </div>
          </div>
        </div>
        <div v-for="(item, i) in tablesList" :key="`row_${i}`" class="desk__row">
          <div v-for="(col, idx) in item" :key="`col_${idx}`" class="desk__table">
            <draggable
              class="desk__row--col"
              :list="col"
              :disabled="props.dragOptions.disabled"
              group="people"
              :move="handleMove"
              item-key="name"
              @end="handleDragEnd(i, idx)"
            >
              <template #item="{ element, index }">
                <div
                  :id="'index_' + i + '_' + idx + '_' + index"
                  :key="element.id"
                  class="desk__row--col__table"
                  :class="{ disabled: element.disabled }"
                >
                  <div v-if="element.user" class="outer-box">
                    <div
                      v-if="index % 2 === 0"
                      class="left-box"
                      :class="{ top: index === 0 || index === 3 }"
                      :style="{
                        border: `3px solid ${currentProfession(element.professionId).color}`,
                      }"
                    >
                      <div class="left-box__left">
                        <div class="left-box__left--name">
                          {{ element.user.name }}
                        </div>
                        <div class="left-box__left--profession">
                          {{ currentProfession(element.professionId).name }}
                        </div>
                        <div class="left-box__left--status">
                          <div
                            v-for="bar in 5"
                            :key="`bar_${bar}`"
                            class="bar"
                            :class="{ active: bar <= element.projectStatus }"
                          ></div>
                        </div>
                      </div>
                      <div class="left-box__right">
                        <div
                          v-if="!dragOptions.disabled"
                          :class="index % 2 === 1 ? 'close-right' : 'close-left'"
                          @click="handleDeleteUser(i, idx, index)"
                        >
                          <img src="@/assets/images/icons/close-circle-icon.svg" alt="(x)" />
                        </div>
                        <el-badge v-if="element.online" is-dot class="badge">
                          <img
                            :src="element.user.avatar"
                            :style="{
                              border: `1px solid ${currentProfession(element.professionId).color}`,
                            }"
                            alt=""
                          />
                        </el-badge>
                        <img
                          v-else
                          :src="element.user.avatar"
                          :style="{
                            border: `1px solid ${currentProfession(element.professionId).color}`,
                          }"
                          alt=""
                        />
                      </div>
                      <div
                        class="left-box__triangle"
                        :style="{
                          'border-top': `15px solid ${currentProfession(element.professionId).color}`,
                        }"
                      >
                        <div class="left-box__triangle--inner"></div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="right-box"
                      :class="{ top: index === 1 || index === 2 }"
                      :style="{
                        border: `3px solid ${currentProfession(element.professionId).color}`,
                      }"
                    >
                      <div class="right-box__left">
                        <div class="right-box__left--name">
                          {{ element.user.name }}
                        </div>
                        <div class="right-box__left--profession">
                          {{ currentProfession(element.professionId).name }}
                        </div>
                        <div class="right-box__left--status">
                          <div
                            v-for="bar in 5"
                            :key="`bar_${bar}`"
                            class="bar"
                            :class="{ active: bar <= element.projectStatus }"
                          ></div>
                        </div>
                      </div>
                      <div class="right-box__right">
                        <div
                          v-if="!dragOptions.disabled"
                          :class="index % 2 === 1 ? 'close-right' : 'close-left'"
                          @click="handleDeleteUser(i, idx, index)"
                        >
                          <img src="@/assets/images/icons/close-circle-icon.svg" alt="(x)" />
                        </div>
                        <el-badge v-if="element.online" is-dot class="badge">
                          <img
                            :src="element.user.avatar"
                            :style="{
                              border: `1px solid ${currentProfession(element.professionId).color}`,
                            }"
                            alt=""
                          />
                        </el-badge>
                        <img
                          v-else
                          :src="element.user.avatar"
                          :style="{
                            border: `1px solid ${currentProfession(element.professionId).color}`,
                          }"
                          alt=""
                        />
                      </div>
                      <div
                        class="right-box__triangle"
                        :style="{
                          'border-top': `15px solid ${currentProfession(element.professionId).color}`,
                        }"
                      >
                        <div class="right-box__triangle--inner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
            <div class="desk__table--images">
              <img
                v-for="(elem, index) in col"
                :key="`${i}-${idx}-${index}`"
                :src="tableIcons[index].src"
                :class="{
                  'edit-mode': !dragOptions.disabled,
                  dragzone: col[index].dragzone,
                  isShowTable: !col[index].user,
                  'table-left-top': index === 0,
                  'table-right-top': index === 1,
                  'table-left-bottom': index === 2,
                  'table-right-bottom': index === 3,
                }"
                class="table"
                alt="t"
              />
            </div>
          </div>
          <el-button v-if="!dragOptions.disabled && i === 0" class="desk__main--add-col horizontal">
            <div class="desk__main--add-buttons horizontal">
              <span class="addSeats" @click="onAddCol">+ More Seats</span>
              <span v-if="item.length" class="removeSeats" @click="onDeleteCol">- Remove Seats</span>
            </div>
          </el-button>
        </div>
      </div>
      <el-button v-if="!dragOptions.disabled" class="desk__main--add-col">
        <div class="desk__main--add-buttons">
          <span class="addSeats" @click="onAddRow">+ More Seats</span>
          <span v-if="tablesList.length" class="removeSeats" @click="onDeleteRow">- Remove Seats</span>
        </div>
      </el-button>
    </div>
    <div v-if="dragOptions.disabled" class="desk__hint">
      <div v-for="(item, index) in hints" :key="`hint_${index}`" class="desk__hint--item">
        <div class="desk__hint--circle" :style="{ background: item.color }"></div>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div v-else class="desk__edit-footer">
      <el-button class="desk__edit-footer--invite" @click="isOpenInviteModal = true"> Invite Member </el-button>
      <draggable
        v-if="availableMembers.length"
        :list="availableMembers"
        :disabled="props.dragOptions.disabled"
        class="desk__edit-footer--members__outer"
        group="people"
        :move="handleMoveFromFooter"
        item-key="name"
        @end="handleFooterDragEnd"
      >
        <template #item="{ element }">
          <div class="desk__edit-footer--members">
            <div
              :id="`footer-user_${element.user.user_id}`"
              :key="`footer-member_${element.user.user_id}`"
              class="desk__edit-footer--members__member"
            >
              <div class="desk__edit-footer--members__member--left">
                <img :src="element.user.avatar" alt="Avatar" />
              </div>
              <div class="desk__edit-footer--members__member--right">
                <div class="user-name">{{ element.user.name }}</div>
                <div class="user-profession">
                  {{ currentProfession(element.professionId).name }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      <div v-else class="desk__edit-footer--members__outer"></div>
      <el-button class="desk__edit-footer--save" @click="$emit('save')"> Save </el-button>
    </div>
    <div v-if="!dragOptions.disabled" class="tutorial-box">
      <img src="@/assets/images/drag-tutorial/tutorial-cursor.svg" alt="^" class="tutorial-box__cursor" />
      <img src="@/assets/images/drag-tutorial/tutorial-top-arrow.svg" alt="|" class="tutorial-box__top-line" />
      <img src="@/assets/images/drag-tutorial/tutorial-user.svg" alt="User" class="tutorial-box__user" />
      <img src="@/assets/images/drag-tutorial/tutorial-bottom-line.svg" alt="|" class="tutorial-box__bottom-line" />
    </div>

    <OvInviteMemberModal
      v-if="isOpenInviteModal"
      :dialog-visible="isOpenInviteModal"
      @close="isOpenInviteModal = false"
    ></OvInviteMemberModal>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import draggable from 'vuedraggable'
import OvInviteMemberModal from '@/components/shared/OvInviteMemberModal'
import AllTablesList from '@/data/tablesList.json'
import AllUsersList from '@/data/usersList.json'
import tableTopLeft from '@/assets/images/tables/table-top-left.svg'
import tableTopRigth from '@/assets/images/tables/table-top-right.svg'
import tableBottomLeft from '@/assets/images/tables/table-bottom-left.svg'
import tableBottomRigth from '@/assets/images/tables/table-bottom-right.svg'

const props = defineProps({
  dragOptions: {
    type: Object,
    default: null,
  },
})

const tablesList = ref(JSON.parse(JSON.stringify(AllTablesList)))
const usersList = ref(JSON.parse(JSON.stringify(AllUsersList)))

const footerFutureIndex = ref(null)
const footerMovingIndex = ref(null)
const footerFutureItem = ref(null)
const footerMovingElement = ref(null)
const movingItem = ref(null)
const movingIndex = ref(null)
const futureItem = ref(null)
const isInsideFooter = ref(false)
const reloadFooter = ref(true)

const tableIcons = ref([
  {
    id: 1,
    src: tableTopLeft,
    dragzone: false,
  },
  {
    id: 2,
    src: tableTopRigth,
    dragzone: false,
  },
  {
    id: 3,
    src: tableBottomLeft,
    dragzone: false,
  },
  {
    id: 4,
    src: tableBottomRigth,
    dragzone: false,
  },
])

const hints = ref([
  { name: 'Marketing', color: '#4156F6', id: 1 },
  { name: 'Team Marketing', color: '#E4AC1A', id: 2 },
])

const lastTableId = ref(null)
const isOpenInviteModal = ref(false)

const availableMembers = ref([])

onMounted(() => {
  setAvailableMembers()
  setLastTableId()
})

const currentProfession = (id) => {
  return hints.value.find((el) => el.id === id)
}

const setAvailableMembers = () => {
  const arr = []
  ;[...tablesList.value].forEach((row, index) => {
    row.forEach((col, idx) => {
      col.forEach((user, i) => {
        if (user.user) {
          arr.push(user)
        }
      })
    })
  })
  availableMembers.value = usersList.value.filter((el) => !arr.find((elem) => elem.user.user_id === el.user.user_id))
}

const handleDeleteUser = (index, subIndex, deleteIndex) => {
  const tableList = JSON.parse(JSON.stringify(tablesList.value))
  availableMembers.value.push(tableList[index][subIndex][deleteIndex])
  delete tablesList.value[index][subIndex][deleteIndex].user
  delete tablesList.value[index][subIndex][deleteIndex].professionId
  delete tablesList.value[index][subIndex][deleteIndex].projectStatus
  delete tablesList.value[index][subIndex][deleteIndex].disabled
}
const setLastTableId = () => {
  const arr = []
  tablesList.value.forEach((row) => {
    row.forEach((col) => {
      col.forEach((user) => {
        arr.push(user.id)
      })
    })
  })
  lastTableId.value = Math.max(...arr)
}
const onAddRow = () => {
  const arr = []
  for (const i in Array(tablesList.value[0]?.length + 1).fill('')) {
    lastTableId.value += +i + 2
    arr.push([
      { id: lastTableId.value + +i + 2 },
      { id: lastTableId.value + +i + 3 },
      { id: lastTableId.value + +i + 4 },
      { id: lastTableId.value + +i + 5 },
    ])
  }
  tablesList.value.push(arr)
  setLastTableId()
}

const onDeleteRow = () => {
  const arr = []
  tablesList.value.forEach((row, index) => {
    row.forEach((table, i) => {
      for (const userID in table) {
        if (table[userID].user) {
          handleDeleteUser(index, i, userID)
        }
      }
    })
  })
  tablesList.value.pop()
  setLastTableId()
}

const onAddCol = () => {
  tablesList.value.forEach((row, index) => {
    lastTableId.value += index + 2
    row.push([
      { id: lastTableId.value + index + 2 },
      { id: lastTableId.value + index + 3 },
      { id: lastTableId.value + index + 4 },
      { id: lastTableId.value + index + 5 },
    ])
  })
}

const onDeleteCol = () => {
  tablesList.value.forEach((row, index) => {
    lastTableId.value -= index + 2
    row.forEach((table, idx) => {
      if (idx === row.length - 1) {
        for (const userID in table) {
          if (table[userID].user) {
            handleDeleteUser(index, idx, userID)
          }
        }
      }
    })
    row.pop()
  })
  if (!tablesList.value[0].length) {
    tablesList.value.pop()
  }
}

const handleDragEnd = (index, subIndex) => {
  tablesList.value.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      col.forEach((table, tableIndex) => {
        table.dragzone = false
      })
    })
  })

  if (!movingItem.value || !futureItem.value) {
    return
  }

  const futureTemp = { ...futureItem.value }
  const movingTemp = { ...movingItem.value }

  if (isInsideFooter.value) {
    const availableTemp = Object.assign([], availableMembers.value)
    availableTemp.splice(availableTemp.indexOf(futureItem.value), 1, movingTemp)
    availableMembers.value = availableTemp

    const tablesTemp = Object.assign([], tablesList.value)
    tablesTemp[index][subIndex][movingIndex.value] = futureTemp
    tablesList.value = tablesTemp

    movingIndex.value = null
    movingItem.value = null
    futureItem.value = null
    isInsideFooter.value = false
    return
  }

  const _items = Object.assign([], tablesList.value)
  _items.forEach((el) => {
    el.forEach((col) => {
      if (col[col.indexOf(futureItem.value)]) {
        col[col.indexOf(futureItem.value)] = movingTemp
      }
      if (col[col.indexOf(movingItem.value)]) {
        col[col.indexOf(movingItem.value)] = futureTemp
      }
    })
  })
  tablesList.value = _items

  setTimeout(() => {
    movingItem.value = null
    futureItem.value = null
    movingIndex.value = null
  }, 300)
}

const handleMove = (e) => {
  const { index, element, futureIndex } = e.draggedContext
  movingItem.value = element
  movingIndex.value = index
  futureItem.value = e.relatedContext.element
  const cordinates = e.related.id.split('_')
  tablesList.value.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      col?.forEach((table, tableIndex) => {
        if (rowIndex === +cordinates[1] && colIndex === +cordinates[2] && tableIndex === +cordinates[3]) {
          table.dragzone = true
        } else {
          table.dragzone = false
        }
      })
    })
  })
  if (e.related.className.includes('desk__edit-footer')) {
    isInsideFooter.value = true
  } else {
    isInsideFooter.value = false
  }
  return false
}

const handleMoveFromFooter = (e) => {
  const { index, futureIndex, element } = e.draggedContext

  const cordinates = e.related.id.split('_')
  tablesList.value.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      col.forEach((table, tableIndex) => {
        if (rowIndex === +cordinates[1] && colIndex === +cordinates[2] && tableIndex === +cordinates[3]) {
          table.dragzone = true
        } else {
          table.dragzone = false
        }
      })
    })
  })
  footerMovingIndex.value = index
  footerFutureIndex.value = futureIndex
  footerMovingElement.value = element
  footerFutureItem.value = e.relatedContext.element
  if (e.related.id.includes('footer-user')) {
    isInsideFooter.value = true
  } else {
    isInsideFooter.value = false
  } // Check if drag is into footer
  return false
}
const handleFooterDragEnd = () => {
  tablesList.value.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      col.forEach((table, tableIndex) => {
        table.dragzone = false
      })
    })
  })
  if (isInsideFooter.value) {
    const futureItem = availableMembers.value[footerFutureIndex.value]
    const movingItem = availableMembers.value[footerMovingIndex.value]
    const _items = Object.assign([], availableMembers.value)
    _items[footerFutureIndex.value] = movingItem
    _items[footerMovingIndex.value] = futureItem
    availableMembers.value = _items
  } else {
    if (footerFutureItem.value.user) {
      availableMembers.value.splice(footerMovingIndex.value, 1, footerFutureItem.value)
    } else {
      availableMembers.value.splice(footerMovingIndex.value, 1)
    }
    tablesList.value.forEach((row) => {
      row.forEach((col) => {
        if (col.includes(footerFutureItem.value)) {
          col.splice(col.indexOf(footerFutureItem.value), 1, {
            id: footerFutureItem.value.id,
            ...footerMovingElement.value,
          })
        }
      })
    })
  }
  footerFutureIndex.value = null
  footerMovingIndex.value = null
  footerFutureItem.value = null
  footerMovingElement.value = null
  isInsideFooter.value = false
  reloadFooter.value = true
  nextTick(() => {
    reloadFooter.value = false
  })
}

const today = computed(() => {
  return new Date().toLocaleDateString('en-us', { weekday: 'long', month: 'short', day: 'numeric' })
})
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
    &--add-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &.horizontal {
        flex-direction: row;
      }
    }
    &--add-col {
      border: none;
      background: transparent;
      display: flex;
      gap: 15px;
      height: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      width: 344px;
      cursor: default;
      &.horizontal {
        width: 0px;
        span {
          text-orientation: upright;
          writing-mode: vertical-lr;
          letter-spacing: -2px;
        }
      }
      span {
        text-align: left;
        letter-spacing: 2px;
        cursor: pointer;
      }
    }
  }

  &__row {
    display: flex;
    border-bottom: 1px solid $ov-border--light;

    &--col {
      padding: 65px 125px 65px 125px;
      display: grid;
      border-right: 1px solid $ov-border--light;
      grid-template-columns: repeat(2, 0fr);
      position: relative;
      &__table {
        position: relative;
        cursor: grab;
        width: 90px;
        height: 79px;
        z-index: 999;
        &.disabled {
          opacity: 0.5;
        }

        img {
          width: 71px;
          height: 65px;
          -o-object-fit: cover;
          object-fit: none;
          &:hover {
            opacity: 1;
          }
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
      sup {
        right: 8px;
        top: 19px;
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
    .close-right {
      position: absolute;
      z-index: 99;
      top: -20px;
      right: -26px;
      opacity: 1;
    }

    .close-left {
      position: absolute;
      z-index: 99;
      top: -20px;
      left: -26px;
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
      min-width: 190px;
      overflow-x: hidden;
      overflow-y: hidden;
      display: flex;
      align-items: center;
      gap: 0 20px;
      cursor: pointer;
      &__outer {
        width: calc(100% - 397px);
        display: flex;
        overflow-x: auto;
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
  &__table {
    position: relative;
    &--images {
      padding: 65px 125px 65px 125px;
      display: grid;
      border-right: 1px solid #ecebed;
      grid-template-columns: repeat(2, 0fr);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.edit-mode.table {
  opacity: 0.3;
  z-index: 997;
}

.table {
  position: relative;
  &-left {
    &-top {
      right: -12px;
      top: 16px;
    }
    &-bottom {
      right: -12px;
      bottom: 8px;
    }
  }
  &-right {
    &-top {
      top: 16px;
      left: -12px;
    }
    &-bottom {
      left: -12px;
      bottom: 8px;
    }
  }
}

.isShowTable {
  opacity: 0;
}

.desk__row--col__table[draggable='true'] {
  opacity: 0.1 !important;
  color: inherit;
  background-color: inherit;
}

.dragzone {
  opacity: 1 !important;
  // background-color: gray;
}

.sortable-chosen {
  opacity: 0;
}
.sortable-chosen.sortable-ghost {
  opacity: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.removeSeats {
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;

  letter-spacing: 2px;
  text-transform: uppercase;

  color: #ff647c;
}

.addSeats {
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  text-transform: uppercase;

  color: #6979f8;
}

.dailyEventsContainer {
  background: #ffffff;
  border: 1px solid #4156f6;
  border-radius: 13px;
  width: 330px;
  height: 159px;
  margin: 50px 50px 5px 50px;
  padding: 8px 18px 20px 18px;
  float: left;
  .todayDate {
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: #787878;
  }
  .eventsList {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .todayEvent {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    div {
      background: linear-gradient(270deg, #94cef9 -62.5%, rgba(48, 110, 154, 0.5) 275%);
      border-radius: 0px 2px 2px 0px;
      min-width: 4px;
      width: 4px;
    }
    span {
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: #3f3356;
    }
  }
}

.dailyEventsContainer.edit-mode {
  opacity: 0.3;
}
</style>
