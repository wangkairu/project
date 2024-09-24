<template>
    <div class="el-quarter-picker">
      <el-popover v-model="visible" placement="bottom-start" transition="el-zoom-in-top" trigger="click">
        <div class="content">
          <p>
            <button type="button" aria-label="前一年" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="prev" />
            <span role="button" class="span-year">{{ year }}年</span>
            <button type="button" aria-label="后一年" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right" @click="next" />
          </p>
          <div class="choose-item">
            <button :class="classStyle1" :disabled="disabled1" @click="selectHalfYear('上半年')">上半年</button>
            <button :class="classStyle2" :disabled="disabled2" @click="selectHalfYear('下半年')">下半年</button>
          </div>
        </div>
  
        <el-input slot="reference" v-model="text" :placeholder="'选择半年'" size="small" @change="iptchange">
          <i slot="prefix" class="el-input__icon el-icon-date" />
        </el-input>
      </el-popover>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HalfYearPicker',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: ['value', 'disabledTime', 'indexkey'], // disabledTime 格式为 YYYY-MM
    data() {
      return {
        visible: false,
        text: '',
        year: new Date().getFullYear(),
        nowmonth: new Date().getMonth(),
        nowyear: new Date().getFullYear(),
        emit_value: [],
        clickyear: '',
        clickmonth: '',
        disabled1: false, // 禁止，开始时间之前
        disabled2: false // 禁止，开始时间之前
      }
    },
    computed: {
      classStyle1: function() {
        return {
          today: (this.nowyear === this.year) && (this.nowmonth < 6 || this.nowmonth) === 6,
          clickcell: (this.year === this.clickyear) && (this.clickmonth === '上半年'),
          selectMonth: true,
          'is-disabled': (this.year > this.nowyear) || this.disabled1
        }
      },
      classStyle2: function() {
        return {
          today: (this.nowyear === this.year) && (this.nowmonth > 6),
          clickcell: (this.year === this.clickyear) && (this.clickmonth === '下半年'),
          selectMonth: true,
          'is-disabled': (this.year > this.nowyear) || ((this.year === this.nowyear) && this.nowmonth < 7) || this.disabled2
        }
      }
    },
    watch: {
      indexkey() {
        if (this.disabledTime) {
          this.aviod(this.disabledTime)
        }
      }
    },
    mounted() {
      if (this.disabledTime) {
        this.aviod(this.disabledTime)
      }
    },
    methods: {
      // 上一年
      prev() {
        this.year = this.year * 1 - 1
        this.aviod(this.disabledTime)
      },
      // 下一年
      next() {
        this.year = this.year * 1 + 1
        this.aviod(this.disabledTime)
      },
      // 点击选项事件
      selectHalfYear(item) {
        this.text = this.year + item
        this.clickyear = this.year
        this.clickmonth = item
        if (item === '上半年') {
          const data1 = this.year + '-01-01'
          const data2 = this.year + '-06-30'
          this.emit_value = [data1, data2]
        } else {
          const data1 = this.year + '-07-01'
          const data2 = this.year + '-12-31'
          this.emit_value = [data1, data2]
        }
        this.visible = false
        this.$emit('change', this.emit_value)
      },
      // 自主输入判断
      iptchange(val) {
        if (val !== '') {
          const year = val.slice(0, 4)
          const text = val.slice(5, 8)
          const reg = /^[0-9]{4}$/
          if (reg.test(year)) {
            if (text === '上半年' || text === '下半年') {
              this.text = val
              this.clickyear = year
              this.clickmonth = text
              const data1 = this.year + '-01-01'
              const data2 = this.year + '-06-30'
              this.emit_value = [data1, data2]
              this.$emit('change', this.emit_value)
            } else {
              this.text = ''
            }
          } else {
            this.text = ''
          }
        } else {
          this.$emit('change', ['', ''])
        }
      },
      aviod(timeA) {
        const time = timeA.date
        if (time) {
          const year = time.slice(0, 4)
          const month = time.slice(5, 7)
          if (timeA.type === 2) {
            if (this.year < year) {
              this.disabled1 = true
              this.disabled2 = true
            } else if (Number(this.year) === Number(year) && Number(month) > 6) {
              this.disabled1 = true
              this.disabled2 = false
            } else {
              this.disabled1 = false
              this.disabled2 = false
            }
          } else {
            if (this.year > year) {
              this.disabled1 = true
              this.disabled2 = true
            } else if (Number(this.year) === Number(year) && Number(month) <= 6) {
              this.disabled1 = false
              this.disabled2 = true
            } else {
              this.disabled1 = false
              this.disabled2 = false
            }
          }
        } else {
          this.disabled1 = false
          this.disabled2 = false
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .content {
    width: 220px;
    min-width: 220px;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 1px #ebeef5;
      padding-bottom: 12px;
      font-size: 16px;
      button {
        margin-top: 0;
      }
    }
    .choose-item {
      display: flex;
      justify-content: space-around;
      .selectMonth {
        margin: 14px 10px;
        font-size: 12px;
        background: transparent;
      }
      .selectMonth:hover {
        color: #409eff;
        cursor: pointer;
      }
      .today {
        color: #409eff;
        font-weight: 700;
      }
      .clickcell {
        color: #409eff;
      }
      .is-disabled {
        color: #c0c4cc !important;
        cursor: not-allowed !important;
        background-color: #fff;
        border-color: #ebeef5;
      }
    }
  }
  </style>
  
  