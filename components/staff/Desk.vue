<template>
  <div class="desk">
    <div class="desk__main" :class="{ 'edit-mode': !props.dragOptions.disabled }">
      <div>
        <div v-for="(item, i) in tablesList" :key="`row_${i}`" class="desk__row">
          <div v-if="i === 0" class="dailyEventsContainer" :class="{ 'edit-mode': !props.dragOptions.disabled }">
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
                  <div
                    v-if="element.user"
                    class="outer-box"
                    :style="{ cursor: element.user.id && !props.dragOptions.disabled ? 'grab' : 'pointer' }"
                  >
                    <div
                      v-if="index % 2 === 0"
                      class="left-box"
                      :class="{ top: index === 0 || index === 3, bottom: index === 1 || index === 2 }"
                    >
                      <div class="left-box__left">
                        <div class="left-box__left--name">
                          {{ element.user.full_name }}
                        </div>
                        <div class="left-box__left--status"></div>
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
                            :src="element.user.avatar ? getAvatar(element.user.avatar) : defaultAvatar"
                            :style="{
                              border: `1px solid rgb(65, 86, 246)`,
                            }"
                            alt=""
                          />
                        </el-badge>
                        <img
                          v-else
                          :src="element.user.avatar ? getAvatar(element.user.avatar) : defaultAvatar"
                          :style="{
                            border: `1px solid rgb(65, 86, 246)`,
                          }"
                          alt=""
                        />
                      </div>
                      <div
                        class="left-box__triangle"
                        :class="{
                          'left-box__triangle-bottom': index === 0,
                          'left-box__triangle-top': index === 2,
                        }"
                      >
                        <div
                          :class="{
                            'left-box__triangle--inner-bottom': index === 2,
                            'left-box__triangle--inner-top': index === 0,
                          }"
                        ></div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="right-box"
                      :class="{ top: index === 1 || index === 2, bottom: index === 3 || index === 0 }"
                    >
                      <div class="right-box__left">
                        <div class="right-box__left--name">
                          {{ element.user.full_name }}
                        </div>
                        <div class="right-box__left--status"></div>
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
                            :src="element.user.avatar ? getAvatar(element.user.avatar) : defaultAvatar"
                            :style="{
                              border: `1px solid rgb(65, 86, 246)`,
                            }"
                            alt=""
                          />
                        </el-badge>
                        <img
                          v-else
                          :src="element.user.avatar ? getAvatar(element.user.avatar) : defaultAvatar"
                          :style="{
                            border: `1px solid rgb(65, 86, 246)`,
                          }"
                          alt=""
                        />
                      </div>
                      <div
                        class="right-box__triangle"
                        :class="{
                          'left-box__triangle-bottom': index === 1,
                          'left-box__triangle-top': index === 3,
                        }"
                      >
                        <div
                          :class="{
                            'left-box__triangle--inner-bottom': index === 3,
                            'left-box__triangle--inner-top': index === 1,
                          }"
                        ></div>
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
              <span v-if="activeTablesCount" class="removeSeats" @click="onDeleteCol">- Remove Seats</span>
            </div>
          </el-button>
        </div>
      </div>
      <el-button
        v-if="!dragOptions.disabled"
        class="desk__main--add-col"
        style="margin-top: -25px; margin-left: 40px; margin-bottom: 100px"
      >
        <div class="desk__main--add-buttons">
          <span class="addSeats" @click="onAddRow">+ More Seats</span>
          <span v-if="activeTablesCount" class="removeSeats" @click="onDeleteRow">- Remove Seats</span>
        </div>
      </el-button>
    </div>
    <div v-if="!dragOptions.disabled" class="desk__edit-footer">
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
              :id="`footer-user_${element.user.id}`"
              :key="`footer-member_${element.user.id}`"
              class="desk__edit-footer--members__member"
              :style="{ cursor: element.user.id ? 'grab' : 'arrow' }"
            >
              <div class="desk__edit-footer--members__member--left">
                <img :src="element.user.avatar ? getAvatar(element.user.avatar) : defaultAvatar" alt="Avatar" />
              </div>
              <div class="desk__edit-footer--members__member--right">
                <div class="user-name">{{ element.user.full_name }}</div>
                <div class="user-status">
                  {{ element.user.email === AllUsersList[0].user.email ? 'You' : 'Member' }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      <div v-else class="desk__edit-footer--members__outer"></div>
      <el-button class="desk__edit-footer--save" @click="onSave"> Save </el-button>
    </div>
    <div v-if="dragOptions.disabled" class="desk__hint">
      <span class="desk__hint--title">Teams:</span>
      <div v-for="(item, index) in hints" :key="`hint_${index}`" class="desk__hint--item">
        <div class="desk__hint--circle" :style="{ background: item.color }"></div>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div v-if="!dragOptions.disabled && isFirstEnter" class="tutorial-box">
      <img src="@/assets/images/drag-tutorial/tutorial-cursor.svg" alt="^" class="tutorial-box__cursor" />
      <img src="@/assets/images/drag-tutorial/tutorial-top-arrow.svg" alt="|" class="tutorial-box__top-line" />
      <img src="@/assets/images/drag-tutorial/tutorial-user.svg" alt="User" class="tutorial-box__user" />
      <img src="@/assets/images/drag-tutorial/tutorial-bottom-line.svg" alt="|" class="tutorial-box__bottom-line" />
    </div>

    <OvInviteMemberModal
      v-if="isOpenInviteModal"
      :dialog-visible="isOpenInviteModal"
      :is-first="hasRequirements"
      @close="isOpenInviteModal = false"
      @save="onSave"
    ></OvInviteMemberModal>
    <edit-profile
      v-if="openEditProfile"
      :dialog-visible="openEditProfile"
      :required-fields="requiredFields"
      @close="navigateTo('/')"
    ></edit-profile>
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import OvInviteMemberModal from '@/components/shared/OvInviteMemberModal'
import editProfile from '@/components/invite/edit-profile.vue'
import tableTopLeft from '@/assets/images/tables/table-top-left.svg'
import tableTopRigth from '@/assets/images/tables/table-top-right.svg'
import tableBottomLeft from '@/assets/images/tables/table-bottom-left.svg'
import tableBottomRigth from '@/assets/images/tables/table-bottom-right.svg'
import useWorkspaceStore from '@/stores/workspace'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'

const workspaceStore = useWorkspaceStore()
const { getSeatsSuccess, getSeatsError, setSeatsSuccess, setSeatsError, getMembersSuccess, getMembersError } =
  storeToRefs(workspaceStore)
const props = defineProps({
  dragOptions: {
    type: Object,
    default: null,
  },
})

const footerFutureIndex = ref(null)
const footerMovingIndex = ref(null)
const footerFutureItem = ref(null)
const footerMovingElement = ref(null)
const openEditProfile = ref(null)
const movingItem = ref(null)
const movingIndex = ref(null)
const futureItem = ref(null)
const isInsideFooter = ref(false)
const reloadFooter = ref(true)
const workspaceID = ref(null)
const instance = getCurrentInstance()
const config = useRuntimeConfig()
const tablesCount = ref(1)
const columnsCount = ref(1)
const isFirstEnter = ref(true)
const hasRequirements = ref(false)
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
const hints = ref([
  { name: 'Marketing', color: '#4156F6', id: 1 },
  { name: 'Team Marketing', color: '#E4AC1A', id: 2 },
])

const AllUsersList = ref([])
const usersList = ref([])

const tablesList = ref([])

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

const lastTableId = ref(null)
const isOpenInviteModal = ref(false)

const availableMembers = ref([])

onMounted(() => {
  if (process.client) {
    const path = window.location.pathname.split('/')
    if (!isNaN(+path[path.length - 1])) {
      workspaceID.value = path[path.length - 1]
    }
  }
  workspaceStore.getMembers(workspaceID.value)
})

const setAvailableMembers = () => {
  const arr = []
  ;[...tablesList.value].forEach((row, index) => {
    row.forEach((col, idx) => {
      col.forEach((seat, i) => {
        if (seat.user) {
          arr.push(seat)
        }
      })
    })
  })

  availableMembers.value = usersList.value.filter(
    (el) =>
      !arr.find((elem) => {
        return elem.user.id === el.user.id
      })
  )
}

const handleDeleteUser = (index, subIndex, deleteIndex) => {
  const tableList = JSON.parse(JSON.stringify(tablesList.value))
  availableMembers.value.push(tableList[index][subIndex][deleteIndex])
  tablesList.value[index][subIndex][deleteIndex].user = null
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
  const length = tablesList.value[0] ? tablesList.value[0]?.length : 0
  Array(length + 1)
    .fill('')
    .forEach(() => {
      arr.push([
        { id: lastTableId.value, dragzone: false, user: null, row_col: '0_0' },
        { id: lastTableId.value + 1, dragzone: false, user: null, row_col: '0_1' },
        { id: lastTableId.value + 2, dragzone: false, user: null, row_col: '1_0' },
        { id: lastTableId.value + 3, dragzone: false, user: null, row_col: '1_1' },
      ])
      lastTableId.value += 4
    })
  tablesList.value.push(arr)
  setLastTableId()
}

const onDeleteRow = () => {
  tablesList.value.forEach((row, index) => {
    row.forEach((table, i) => {
      for (const userID in table) {
        if (table[userID].user && index === tablesList.value.length - 1) {
          handleDeleteUser(index, i, userID)
        }
      }
    })
  })
  tablesList.value.pop()
  if (!tablesList.value.length) {
    tablesList.value = [[]]
  }

  setLastTableId()
}

const handleAddTable = (row) => {
  row.push([
    { id: lastTableId.value, dragzone: false, user: null, row_col: '0_0' },
    { id: lastTableId.value + 1, dragzone: false, user: null, row_col: '0_1' },
    { id: lastTableId.value + 2, dragzone: false, user: null, row_col: '1_0' },
    { id: lastTableId.value + 3, dragzone: false, user: null, row_col: '1_1' },
  ])
  lastTableId.value += 4
}

const onAddCol = () => {
  if (tablesList.value.length > 1 && tablesList.value[0].length === tablesList.value[1].length) {
    tablesList.value = [[]]
  }
  tablesList.value.forEach((row, index) => {
    handleAddTable(row)
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
}

const handleDragEnd = (index, subIndex) => {
  tablesList.value.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      col.forEach((table, tableIndex) => {
        table.dragzone = false
      })
    })
  })
  console.log(movingItem.value.user)
  if (!movingItem.value.user) {
    return
  }

  const futureTemp = { ...futureItem.value.user }
  const movingTemp = { ...movingItem.value.user }

  if (isInsideFooter.value) {
    const availableTemp = Object.assign([], availableMembers.value)
    availableTemp.splice(availableTemp.indexOf(futureItem.value), 1, movingTemp)
    availableMembers.value = availableTemp

    const tablesTemp = Object.assign([], tablesList.value)
    tablesTemp[index][subIndex][movingIndex.value].user = futureTemp
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
        col[col.indexOf(futureItem.value)].user = movingTemp
      }
      if (col[col.indexOf(movingItem.value)]) {
        col[col.indexOf(movingItem.value)].user = futureTemp.id ? futureTemp : null
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
  const { index, element } = e.draggedContext
  const { element: relElement } = e.relatedContext
  movingItem.value = element
  movingIndex.value = index
  if (!element.user || (!element.user && !relElement.user)) return false

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
            ...footerFutureItem.value,
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

const onSave = () => {
  columnsCount.value = tablesList.value[0]?.length
  tablesCount.value = (columnsCount.value + 1) * tablesList.value.length - 1
  const filledSeats = {}
  tablesList.value.forEach((row, rowIndex) => {
    row.forEach((table, colIndex) => {
      table.forEach((seat) => {
        if (seat.user) {
          filledSeats[seat.user.id] = `${rowIndex}_${colIndex}_${seat.row_col}`
        }
      })
    })
  })
  const payload = {
    seats: filledSeats,
    tables_count: tablesCount.value,
    columns_count: columnsCount.value,
  }

  workspaceStore.setSeats(payload, workspaceID.value)
  instance.emit('save')
}

const setTables = ({ seats, counts }) => {
  const rowCount = (counts.tables_count + 1) / (counts.columns_count + 1)
  const tables = []
  let rowCol
  let seatID = 0
  for (let i = 0; i < rowCount; i++) {
    const row = []
    const colCount = !i ? counts.columns_count : counts.columns_count + 1
    for (let j = 0; j < colCount; j++) {
      const table = []
      for (let seatNumber = 0; seatNumber < 4; seatNumber++) {
        seatID++
        switch (seatNumber) {
          case 0:
            rowCol = '0_0'
            break
          case 1:
            rowCol = '0_1'
            break
          case 2:
            rowCol = '1_0'
            break
          case 3:
            rowCol = '1_1'
            break
        }
        table.push({
          id: seatID,
          row_col: rowCol,
          dragzone: false,
          user: null,
        })
      }
      row.push(table)
    }
    tables.push(row)
  }
  if (getMembersSuccess.value && seats) {
    const selectedUsers = Object.values(seats)
    selectedUsers.forEach((user) => {
      const userID = user.id
      const position = user.seat.split('_')
      const [tableRow, tableCol] = [position[0], position[1]]
      const userSeatPosition = `${position[2]}_${position[3]}`
      const seatPosition = tables[tableRow][tableCol].find((seat) => seat.row_col === userSeatPosition)
      const currentUser = getMembersSuccess.value.members.find((user) => {
        return user.id === userID
      })
      seatPosition.user = currentUser
    })
  }

  tablesList.value = tables
  setLastTableId()
}

const getAvatar = (url) => {
  return `${config.public.env.serverUrl}/storage/images/users/${url}`
}

watch(getMembersSuccess, (v) => {
  if (v) {
    workspaceStore.getSeats(workspaceID.value)
    AllUsersList.value = v.members.map((item) => ({
      user: item,
    }))
    usersList.value = JSON.parse(JSON.stringify(AllUsersList.value))
    hasRequirements.value = v.hasRequirements
    if (getSeatsSuccess.value) {
      setTables(getSeatsSuccess.value)
    }
    setAvailableMembers()
  }
})

watch(getMembersError, (v) => {
  openEditProfile.value = true
  requiredFields.value = v.requiredFields
})

watch(getSeatsSuccess, (v) => {
  if (v) {
    setTables(v)
    isFirstEnter.value = v.is_first
    setAvailableMembers()
  }
})

watch(getSeatsError, (v) => {})

watch(setSeatsSuccess, (v) => {})

watch(setSeatsError, (v) => {})

const activeTablesCount = computed(() => {
  return tablesList.value.reduce((acc, elem) => acc + elem.length, 0)
})
</script>

<style scoped lang="scss">
.desk {
  &__main {
    height: calc(100vh - 220px);
    border: 1px solid $ov-border--light;
    overflow: auto;
    overflow-x: auto;
    user-select: none;
    position: relative;
    background: url('~/assets/images/tables-background.svg');
    background-repeat: repeat;
    width: calc(100vw - 225px);
    &--add-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &.horizontal {
        flex-direction: row;
      }
    }
    &--add-col {
      position: relative;
      border: none;
      background: transparent;
      display: flex;
      gap: 15px;
      align-items: flex-start;
      justify-content: flex-start;
      width: 344px;
      cursor: default;
      margin-top: 41px;
      &.horizontal {
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
    width: max-content;

    &--col {
      padding: 65px 125px 65px 125px;
      display: grid;
      grid-template-columns: repeat(2, 0fr);
      position: relative;
      &__table {
        position: relative;
        width: 90px;
        height: 79px;
        z-index: 999;
        &.disabled {
          opacity: 0.5;
        }

        img {
          width: 23px;
          height: 23px;
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
    gap: 0 14px;
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
  &__hint {
    padding-top: 8px;
    display: flex;
    gap: 0 28px;
    align-items: center;
    &--title {
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;

      color: #4156f6;
    }
    &--item {
      display: flex;
      align-items: center;
      gap: 0 6px;
      font-weight: 400;
      font-size: 15px;
      line-height: 18px;

      color: #000000;
    }
    &--circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }
  }
  .left-box,
  .right-box {
    width: max-content;
    gap: 5px;
    height: 34px;
    border-radius: 13px;
    background: white;
    opacity: 1;
    z-index: 10;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;
    border: 1px solid #4156f6;
    box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    .badge {
      sup {
        right: 8px;
        top: 19px;
      }
    }
    &__triangle {
      &-top,
      &-bottom {
        position: absolute;
        width: 0;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
      &-top {
        top: -10px;
        border-bottom: 10px solid rgb(65, 86, 246);
      }
      &-bottom {
        bottom: -10px;
        border-top: 10px solid rgb(65, 86, 246);
      }

      &--inner {
        &-top,
        &-bottom {
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
        }
        &-top {
          border-top: 13px solid white;
          margin-top: -14px;
          margin-left: -12px;
        }
        &-bottom {
          border-bottom: 13px solid white;
          margin-top: 1px;
          margin-left: -12px;
        }
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
      }
      &--name {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #515151;
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
      height: 48px;
      padding: 13px 31px;
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
        max-width: calc(100% - 397px);
        display: flex;
        overflow-x: auto;
        gap: 25px;
      }

      &__member {
        min-width: 207px;
        max-width: 207px;
        width: 207px;
        height: 48px;
        display: flex;
        align-items: center;
        gap: 0 11px;
        box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.07);
        border-radius: 20px;
        background: white;
        padding: 0 20px;

        &--left {
          img {
            width: 23px;
            height: 23px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        &--right {
          .user-name {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            /* identical to box height */

            color: #515151;
          }
          .user-status {
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;

            color: #787878;
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
    right: 5px;
    &.top {
      top: 5px;
    }
    &.bottom {
      bottom: 5px;
    }
    &__triangle {
      right: 26px;
    }
  }
  .right-box {
    left: 5px;
    flex-direction: row-reverse;
    &.top {
      top: 5px;
    }
    &.bottom {
      bottom: 5px;
    }
    &__triangle {
      left: 26px;
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
        width: 0;
        display: none;
      }
    }
  }
  &__table {
    position: relative;
    &--images {
      padding: 65px 125px 65px 125px;
      display: grid;
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
  opacity: 0.3 !important;
}

.dragzone {
  opacity: 1 !important;
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
  margin: 50px 50px 80px 50px;
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
