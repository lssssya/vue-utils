<template>
  <div class="regionSel">
    <!--<p class="title">选择区域</p>-->
    <!--<p-->
    <!--  class="region"-->
    <!--  @click="visible = true"-->
    <!--&gt;-->
    <!--  <span>{{ selected.name || '暂无区域' }}</span>-->
    <!--  <i class="arrow-down" />-->
    <!--</p>-->
    <van-field
      readonly
      clickable
      name="picker"
      :value="selected.name"
      right-icon="arrow"
      placeholder="请选择发生区域"
      @click="visible = true"
    />
    <van-popup
      v-model="visible"
      round
      position="bottom"
      @close="handleCancel"
    >
      <p class="header">
        <span
          class="header-btn-cancel"
          @click="handleCancel"
        >
          取消
        </span>
        <span
          class="header-btn-sure"
          @click="handleSure"
        >
          确定
        </span>
      </p>
      <van-tabs
        v-model="activeTab"
        color="#2080f7"
        @click="handleJump"
      >
        <van-tab
          v-for="(tab, index) in tabList"
          :key="tab.indexCode"
          :name="tab.indexCode"
          :title="tab.name"
        >
          <p
            v-if="index > 0"
            class="btn-pre"
            @click="handlePop"
          >
            上一级
          </p>
          <van-radio-group
            v-model="currentId"
            class="list-wrap"
          >
            <p
              v-for="item in tab.regionList"
              :key="item.indexCode"
              :class="['list', current.indexCode === item.indexCode && 'active']"
              @click="handleJump(item)"
            >
              <i class="icon-group" />
              <span class="list-name">{{ item.name }}</span>
              <van-radio
                :name="item.indexCode"
                shape="square"
                class="list-check"
                @click.native.stop="handleCheck(item)"
              />
            </p>
            <p
              v-if="tab.loading"
              class="loading"
            >
              <van-loading
                type="spinner"
                size="24px"
                color="#2080f7"
              />
            </p>
            <p
              v-else
              class="finished"
            >
              暂无更多
            </p>
          </van-radio-group>
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>

<script>

export default {
  name: 'RegionSel',
  data () {
    return {
      visible: false,
      // 展示数据
      activeTab: '-1',
      tabList: [],
      // 当前选择
      current: { indexCode: '' },
      currentPath: '',
      // 已确定选择
      selected: {},
      selectedPath: ''
    }
  },
  computed: {
    currentId: {
      get () {
        return this.current.indexCode
      },
      set () {
      }
    }
  },
  mounted () {
    this.handleJump({ name: '根目录', indexCode: '-1', parentIndexCode: null })
  },
  methods: {
    handleReset () {
      this.current = { indexCode: '' }
      this.currentPath = ''
      this.selected = {}
      this.selectedPath = ''
      this.handleJump({ name: '根目录', indexCode: '-1', parentIndexCode: null })
    },
    handlePop () {
      const currentIndex = this.tabList.findIndex(item => item.indexCode === this.activeTab)
      this.activeTab = this.tabList[currentIndex - 1].indexCode
    },
    async handleJump (target) {
      if (typeof target === 'string') {
        this.activeTab = target
      } else {
        const { name, indexCode, parentIndexCode, leaf } = target
        if (leaf) return

        const index = this.tabList.findIndex(item => item.indexCode === indexCode)
        if (index < 0) {
          const parentIdIndex = this.tabList.findIndex(item => item.indexCode === parentIndexCode)
          this.tabList.splice(parentIdIndex + 1)
          this.tabList.push({
            name,
            indexCode,
            parentIndexCode,
            regionList: [],
            loading: false
          })
          this.apiGetRegion(parentIdIndex + 1)
        }
        this.$nextTick(() => {
          this.activeTab = indexCode
        })
      }
    },
    async apiGetRegion (tabIndex) {
      this.tabList[tabIndex].loading = true
      try {
        const parentIndexCode = this.tabList[tabIndex].indexCode
        const { data } = await API({ regionIndexCode: parentIndexCode })
        this.tabList[this.tabList.length - 1].regionList = data.rows
        this.tabList[tabIndex].loading = false
        // if (parentIndexCode === '-1') {
        //   this.handleCheck(data.rows[0])
        //   this.$emit('change', this.current)
        //   this.selected = this.current
        //   this.selectedPath = this.currentPath
        // }
      } catch {
        this.tabList[tabIndex].loading = false
      }
    },
    handleCheck (val) {
      this.current = val
      const currentIndex = this.tabList.findIndex(item => item.indexCode === this.activeTab)
      this.currentPath = JSON.stringify(this.tabList.slice(0, currentIndex + 1))
    },
    handleSure () {
      this.visible = false
      if (this.selected.indexCode !== this.current.indexCode) {
        this.$emit('change', this.current)
      }
      this.selected = this.current
      this.selectedPath = this.currentPath
      this.tabList = JSON.parse(this.selectedPath)
      this.activeTab = this.tabList[this.tabList.length - 1].indexCode
    },
    handleCancel () {
      this.visible = false
      this.current = this.selected
      this.currentPath = this.selectedPath
      this.tabList = JSON.parse(this.selectedPath)
      this.activeTab = this.tabList[this.tabList.length - 1].indexCode
    }
  }
}
</script>
<style
  lang="scss"
  scoped
>
$F_MAIN: 16px;
$C_MAIN: #2080f7;
$F_SUB: 14px;
.regionSel {
  flex: 1;
  //margin-top: 10px;
  //padding: 16px;
  background-color: #fff;

  .title {
    line-height: 32px;
    color: #4d4d4d;
    font-size: 16px;
  }

  .region {
    display: flex;
    align-items: center;
    height: 40px;
    color: #000;
    font-size: 16px;

    .arrow-down {
      margin: 0 12px;
      border-width: 5px 4px 0;
      border-style: solid;
      border-color: rgba(#000, 0.7) transparent transparent;
    }
  }

  .van-popup {
    display: flex;
    flex-direction: column;
    height: 60%;

    .header {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 16px;
      padding-right: 16px;
      border-bottom: 1px solid rgba(#979797, 0.17);
      font-size: 16px;

      .header-btn-cancel {
        color: #000;
      }

      .header-btn-sure {
        color: $C_MAIN;
      }
    }

    .btn-pre {
      color: rgba(0, 0, 0, 0.9);
    }

    .list-wrap {
      flex: 1;
      overflow: scroll;
    }

    .list {
      display: flex;
      align-items: center;
      height: 32px;
      margin-top: 12px;

      & > .list-name {
        flex: 1;
        padding-left: 16px;
        padding-right: 16px;
        font-size: $F_SUB;
        color: rgba(#000, 0.9);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &.active > .list-name {
        color: rgba($C_MAIN, 0.9);
      }

      .icon-group {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url('~@/assets/images/group.png');
        background-size: 100% 100%;
      }
    }

    ::v-deep .van-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-left: 16px;
      padding-right: 16px;

      .van-tabs__wrap {
        flex-shrink: 0;
      }

      .van-tabs__content {
        flex: 1;
        overflow: hidden;

        .van-tab__pane {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      }
    }

    .loading {
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .finished {
      line-height: 40px;
      text-align: center;
      color: rgba(#000, 0.5);
      font-size: $F_SUB;
    }
  }
}
</style>
