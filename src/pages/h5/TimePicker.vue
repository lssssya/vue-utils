<!--
 * @Author: denghuan
 * @LastEditors: denghuan
 * @LastEditTime: 2023-12-19 15:21:16
 * @Description: 开始时间结束时间
-->
<template>
  <div
    style="width: 100%;"
    class="form-timeRange"
  >
    <van-field
      v-model="strValue"
      readonly
      clickable
      right-icon="arrow"
      placeholder="请选择时间范围"
      @click="visible = true"
    >
    </van-field>
    <van-popup
      v-model="visible"
      position="bottom"
      round
      @open="handleOpen"
    >
      <p class="header">
        <span class="header-title">时间范围</span>
        <span>
          <span
            class="header-btn"
            @click="handleSure"
          >确定
          </span>
        </span>
      </p>
      <!----------- 自定义选择 ----------->
      <div class="custom">
        <div class="quick-wrap">
          <p class="title">快速选择</p>
          <p class="quick">
            <span
              v-for="option in quickOption"
              :key="option.range"
              :class="['quick-option', activeOption === option.range && 'active']"
              @click="handleQuickSel(option)"
            >
              {{ option.label }}
            </span>
          </p>
        </div>
        <div class="custom-wrap">
          <p class="title">自定义</p>
          <div class="custom">
            <span
              :class="['custom-item', custom === 'start' && 'active']"
              @click="handleCustomSel('start')"
            >
              {{ ymdFormat(ope.start) }}
            </span>
            <span class="custom-split">至</span>
            <span
              :class="['custom-item', custom === 'end' && 'active']"
              @click="handleCustomSel('end')"
            >
              {{ ymdFormat(ope.end) }}
            </span>
          </div>
        </div>
        <van-datetime-picker
          v-show="custom === 'start'"
          v-model="ope.start"
          type="datetime"
          :show-toolbar="false"
          :visible-item-count="3"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @change="activeOption = 0"
        />
        <van-datetime-picker
          v-show="custom === 'end'"
          v-model="ope.end"
          type="datetime"
          :show-toolbar="false"
          :visible-item-count="3"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @change="activeOption = 0"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'FormTimeRange',
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    myValue: {
      get () {
        let [startTime, endTime] = this.value
        if (startTime && !endTime) {
          endTime = startTime
        } else if (!startTime && endTime) {
          startTime = endTime
        }
        if (startTime) {
          startTime = dayjs(startTime, 'YYYY-MM-DD HH:mm:ss')
          endTime = dayjs(endTime, 'YYYY-MM-DD HH:mm:ss')
          return [startTime, endTime]
        } else {
          return []
        }
      }
    },
    strValue () {
      const [startTime, endTime] = this.myValue
      return startTime && endTime
        ? startTime.format('YYYY-MM-DD HH:mm:ss') + ' ~ ' + endTime.format('YYYY-MM-DD HH:mm:ss')
        : ''
    }
  },
  data () {
    return {
      visible: false,
      // 操作数据
      ope: {
        start: new Date(),
        end: new Date()
      },
      // 快速选择
      activeOption: 0,
      quickOption: [
        {
          label: '今天',
          range: 0
        },
        {
          label: '近三天',
          range: 2
        },
        {
          label: '近七天',
          range: 6
        }
      ],
      // 自定义
      custom: 'start',
      // 时间选择
      minDate: dayjs().subtract(20, 'y').toDate(),
      maxDate: new Date()
    }
  },
  methods: {
    ymdFormat (val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm')
    },
    formatter (type, val) {
      if (type === 'year') {
        return `${ val }年`
      } else if (type === 'month') {
        return `${ val }月`
      } else if (type === 'day') {
        return `${ val }日`
      } else if (type === 'hour') {
        return `${ val }时`
      } else if (type === 'minute') {
        return `${ val }分`
      }
      return val
    },
    // 快速选择
    handleQuickSel ({ range }) {
      this.activeOption = range
      this.ope.end = dayjs().endOf('day').toDate()
      this.ope.start = dayjs().subtract(range, 'd').startOf('day').toDate()
      this.custom = 'start'
    },
    // 点击开始时间或者结束时间
    handleCustomSel (custom) {
      this.custom = custom
    },
    // 点击确定
    handleSure () {
      this.$emit(
        'changeValue',
        [
          dayjs(this.ope.start).format('YYYY-MM-DD HH:mm:ss'),
          dayjs(this.ope.end).format('YYYY-MM-DD HH:mm:ss')
        ]
      )
      this.visible = false
    },
    // 点击清楚
    handleClear () {
      this.$emit(
        'changeValue',
        []
      )
      this.visible = false
    },
    handleOpen () {
      const [startTime, endTime] = this.myValue
      if (startTime) {
        const d = endTime.diff(startTime, 'day', true)
        const quick = this.quickOption.find(item => item.range === d)
        if (quick) {
          this.handleQuickSel(quick)
        } else {
          this.ope.start = startTime.toDate()
          this.ope.end = endTime.toDate()
          this.activeOption = -1
        }
      } else {
        this.handleQuickSel(this.quickOption[0])
      }
    }
  }
}
</script>
<style
  lang="scss"
  scoped
>
@import '~@/pages/h5/assets/styles/variable.scss';

.com_field {
  padding: 6px 16px;
}

.form-timeRange {
  font-size: 14px;

  .van-popup {
    .header {
      margin-top: 16px;
      padding-left: 16px;
      padding-right: 16px;
      height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;

      .header-title {
        color: #000;
      }

      .header-btn {
        color: $navigator;
      }

      .error-btn {
        margin-left: 8px;
        color: $error;
      }
    }

    .custom {
      flex: 1;
      overflow-y: scroll;
    }

    .quick-wrap {
      padding: 0 16px;

      .title {
        margin-top: 12px;
        margin-bottom: 8px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.5);
      }

      .quick {
        height: 32px;
        display: flex;

        .quick-option {
          display: inline-block;
          flex: 1;
          border: 1px solid rgba(223, 228, 234, 0.4);
          border-radius: 4px;
          background-color: rgba(223, 228, 234, 0.4);
          color: rgba(0, 0, 0, 0.7);
          line-height: 30px;
          text-align: center;

          &.active {
            background-color: rgba($navigator, 0.1);
            border-color: rgba($navigator, 0.4);
            color: $navigator;
          }

          & + .quick-option {
            margin-left: 16px;
          }
        }
      }
    }

    .custom-wrap {
      margin-bottom: 24px;

      .title {
        margin-top: 12px;
        margin-bottom: 8px;
        padding-left: 16px;
        padding-right: 16px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.5);
      }

      .custom {
        display: grid;
        grid-template-columns: 1fr 50px 1fr;
        padding-left: 12px;
        padding-right: 12px;
        text-align: center;
        line-height: 24px;

        .custom-item {
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          color: rgba(0, 0, 0, 0.3);
          font-size: 16px;
          padding-bottom: 8px;

          &.active {
            border-bottom: 1px solid $navigator;
            color: $navigator;
          }
        }

        .custom-split {
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
</style>
