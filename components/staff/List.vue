<template>
  <div class="list">
    <div class="list__main">
      <el-button-group>
        <el-button
          :class="{ active: currentTerm === 'User' }"
          @click="currentTerm = 'User'"
          >Users</el-button
        >
        <el-button
          :class="{ active: currentTerm === 'Team' }"
          @click="currentTerm = 'Team'"
          >Teams</el-button
        >
      </el-button-group>
      <el-button class="list__main--btn">
        <span>+</span>
        ADD USER
      </el-button>
    </div>
    <div class="list__table">
      <div v-if="currentTerm === 'User'" class="list__table-user">
        {{ tableData }}
      </div>
      <div v-if="currentTerm === 'Team'" class="list__table-team">Team</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ListComponent',

  data() {
    return {
      currentTerm: 'User',
      tableData: null,
    }
  },
  async created() {
    this.tableData = await this.inviteWorkspace(this.$route.params.id)
  },
  methods: {
    ...mapActions('workspace', ['inviteWorkspace']),
    handleEdit(index, row) {
      console.log(index, row)
    },
  },
}
</script>

<style scoped lang="scss">
.list {
  &__main {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .el-button {
      border: 0px;
      border-bottom: 4px solid #ece9f1;
      color: #6d7075;
      cursor: pointer;
      background: #ffffff;
      padding: 10px 20px;
    }
    &--btn {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;
      color: #4156f6 !important;
      background: #e5e7fa !important;
      border-radius: 6px;
      padding: 6px 10px 4px 11px !important;
    }
  }

  &__table {
    width: 90%;
    margin: 0 auto;
  }
}
.active {
  border-bottom: 4px solid #bd7ae3 !important;
  color: #0d1c2e !important;
}
</style>
