<template>
    <div class="quarter-range-picker">
      <!-- 透明遮罩 -->
      <div class="mark"
           v-if="show_quarter_range_picker"
           @click.stop="handleClosePicker"></div>
   
      <!-- 结果显示框 -->
      <el-date-picker :value="showValue"
                      popper-class="quarter-range-picker-date-popper"
                      type="monthrange"
                      format="yyyy-MM"
                      class="mo-date-picker"
                      range-separator="至"
                      @focus="handleOpenPicker"
                      size="mini"
                      @change="handleChange"
                      start-placeholder="开始半年"
                      end-placeholder="结束半年">
      </el-date-picker>
   
      <!--
      <el-input placeholder="请选择季度"
                :value="showValue"
                style="width: 240px"
                @focus="focusClick"
                size="mini">
        <i slot="prefix"
           class="el-input__icon el-icon-date"></i> -->
      <!-- </el-input> -->
   
      <!-- 弹出选框 -->
      <el-collapse-transition>
        <el-card class="quarter-range-picker__box-card"
                 v-show="show_quarter_range_picker">
          <div class="quarter-range-picker__content">
            <quarteHalfYear 
                            :year.sync="start_year"
                           :quarter="start_quarter"
                           :showRight="start_show_right"
                           @on-quarter-click="handleStartQuarterClick"
                           @on-year-change="handleStartYearChange"></quarteHalfYear>
            <quarteHalfYear 
                            :year.sync="end_year"
                           :showLeft="end_show_left"
                           :quarter.sync="end_quarter"
                           @on-quarter-click="handleEndQuarterClick"
                           @on-year-change="handleEndYearChange"></quarteHalfYear>
          </div>
        </el-card>
      </el-collapse-transition>
    </div>
  </template>
  <script>
  /**
   * 季节选择组件
   */
  import quarteHalfYear from "./quarteHalfYear.vue"
  import dayjs from 'dayjs';
  import { getQuarterHalfYear } from './config.js';
   
  export default {
    name: 'mo-quarter-range-half-year',
   
    components: {
        quarteHalfYear
    },
   
    props: {
      // [起始日期，结束日期]
      value: {
        type: Array,
        default: null,
      },
    },
   
    data() {
      let now = dayjs();
   
      return {
        show_quarter_range_picker: false,
        // 开始
        start_year: now.year(),
        start_quarter: [],
        // 结束
        end_year: now.year() + 1,
        end_quarter: [],
        // 整合后的月份 {year, quarter}
        quarter: []
      }
    },
    computed: {
      start_show_right() {
        return this.start_year < this.end_year - 1;
      },
      end_show_left() {
        return this.end_year > this.start_year + 1;
      },
      showValue() {
        if (this.value) {
          let start_date = dayjs(this.value[0])
          let end_date = dayjs(this.value[1])
          return [`${this.value[0]}`, `${this.value[1]}`]
        } else {
          return null
        }
      },
    },
    created() {},
    methods: {
      handleOpenPicker() {
        let start_date = dayjs()
        let end_date = dayjs().add(1, 'years');
        if (this.value) {
          start_date = dayjs(this.value[0])
          end_date = dayjs(this.value[1])
          this.start_quarter = [this.value[0], this.value[1]]
          this.end_quarter = [this.value[0], this.value[1]]
        }
        this.start_year = start_date.year()
        // 结束
        this.end_year = end_date.year()
        if (this.start_year >= this.end_year) {
          this.end_year = this.start_year + 1;
        }
        // 清空已选中
        this.quarter.splice(0, this.quarter.length);
        this.show_quarter_range_picker = true
      },
      handleClosePicker() {
        this.show_quarter_range_picker = false;
      },
   
      handleStartYearChange(year) {
        this.start_year = year
      },
   
      handleStartQuarterClick(quarter_item) {
        if (this.quarter.length == 0) {
          this.start_quarter.splice(0, this.start_quarter.length);
          this.end_quarter.splice(0, this.end_quarter.length);
        }
        let index = this.start_quarter.indexOf(quarter_item.value);
        if (index > -1) {
          this.start_quarter.splice(index, 1);
        } else {
          this.start_quarter.push(quarter_item.value)
          
        }
        this.quarter.push(quarter_item)
   
        this.handleCheckQuarterRange();
      },
   
      handleEndQuarterClick(quarter_item) {
   
        if (this.quarter.length == 0) {
          this.start_quarter.splice(0, this.start_quarter.length);
          this.end_quarter.splice(0, this.end_quarter.length);
        }
   
        let index = this.end_quarter.indexOf(quarter_item.value);
   
        if (index > -1) {
          this.end_quarter.splice(index, 1);
        } else {
          this.end_quarter.push(quarter_item.value)
        }
   
        this.quarter.push(quarter_item)
        console.log(this.quarter);
   
        this.handleCheckQuarterRange();
      },
   
      handleCheckQuarterRange() {
        // console.log('quarter', this.quarter);
   
        if (this.quarter.length == 2) {
          // 排序
          this.quarter.sort((a, b) => {
            if (a.year == b.year) {
              return a.quarter - b.quarter
            } else {
              return a.year - b.year
            }
          })
   
          let result = [];
          for (let item of this.quarter) {
            // 开始日期
            // let start_quarter = this.quarter[0];
            let months = getQuarterHalfYear(item.quarter);
            let start_quarter_month = months[0];
            let end_quarter_month = months[months.length - 1];
            
            // 月份从 0 开始索引
            let start_date = dayjs(`${item.year}-${start_quarter_month}`).startOf("month").format('YYYY-MM-DD')
            let end_date = dayjs(`${item.year}-${end_quarter_month}`).endOf("month").format('YYYY-MM-DD')
           
   
            result.push({
              ...item,
              start_date,
              end_date
            })
          }
          // console.log('result', [result[0].start_date, result[1].end_date]);
          
          this.$emit('update:value', [result[0].start_date, result[1].end_date])
          this.$emit('on-change', result)
   
          this.show_quarter_range_picker = false;
        }
      },
   
   
      handleEndYearChange() {
        // this.end_quarter.splice(0, this.start_quarter.length);
      },
   
      handleChange(val) {
   
        // console.log('handleClear', val);
        // 清空操作
        if (!val) {
          this.start_quarter.splice(0, this.start_quarter.length);
          this.end_quarter.splice(0, this.end_quarter.length);
            
          this.$emit('update:value', val)
        }
   
      },
   
   
    },
  }
  </script>
   
  <style lang="less">
  .mark {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 999;
  }
   
  .quarter-range-picker {
    display: inline-block;
    position: relative;
   
    .el-card__body {
      padding: 0;
    }
   
    .quarter-range-picke__value {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
   
  .quarter-range-picker__box-card {
    // width: 500px;
    // padding: 0 3px 20px;
    margin-top: 10px;
    position: absolute;
    z-index: 9999;
  }
   
  .quarter-range-picker__content {
    display: flex;
    justify-content: space-between;
  }
   
  // 隐藏原有的选择器
  .quarter-range-picker-date-popper {
    display: none;
  }
  </style>
   
  <style scoped>
  </style>