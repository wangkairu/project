<template>
    <div class="quarter-picker">
      <div class="quarter-picker-inner">
        <div class="quarter-picker__header">
          <!-- 左边按钮 -->
          <i class="el-icon-d-arrow-left" @click="handlePrevYear" v-if="showLeft"></i>
          <span v-else class="empty-arrow"></span>
   
          <div class="quarter-picker__title">{{ year }}</div>
   
          <!-- 右边按钮 -->
          <i class="el-icon-d-arrow-right" @click="handleNextYear" v-if="showRight"></i>
          <span v-else class="empty-arrow"></span>
        </div>
   
        <div class="quarter-picker__options">
          <template v-for="item in options">
            <div class="quarter-picker__item" v-bind:key="item.value" :data-value="item.value" @click="handleItemClick(item)" :class="{
                 'quarter-picker__item__today': item.value == now_quarter,
                 'quarter-picker__item--active': quarter.includes(item.value),
               }">
              <div class="quarter-picker__item__label">{{ item.label }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  // created at 2022-04-22
  import dayjs from 'dayjs'
  import { quarter_options } from './config.js'
  var quarterOfYear = require('dayjs/plugin/quarterOfYear')
  dayjs.extend(quarterOfYear)
   
  export default {
    name: 'quarter-picker',
   
    props: {
      // 当前年
      year: {
        type: Number,
        default: () => {
          return dayjs().year()
        }
      },
   
      // 当前季度 ['2022-1']
      quarter: {
        type: Array,
        default: () => {
          return []
        }
      },
   
      // 当前日期
      // value: {
      //   type: Array,
      //   default: () => { return [] },
      // },
   
      // 显示左边按钮
      showLeft: {
        type: Boolean,
        default: true
      },
      // 显示右边按钮
      showRight: {
        type: Boolean,
        default: true
      }
    },
   
    components: {},
   
    data() {
      let now = dayjs()
      let now_year = now.year()
      let now_quarter = `${now_year}-${now.quarter()}`
   
      return {
        now_year,
        now_quarter
   
      }
    },
   
    computed: {
      options() {
        return quarter_options.map((item) => {
          return {
            label: item.label,
            value: `${this.year}-${item.value}`,
            year: this.year,
            quarter: item.value
          }
        })
      }
    },
   
    methods: {
      async getData() {},
   
      handleItemClick(item) {
        this.$emit('on-quarter-click', item)
      },
   
      handlePrevYear() {
        let year = this.year - 1
        this.$emit('update:year', year)
        this.$emit('on-year-change', year)
      },
   
      handleNextYear() {
        let year = this.year + 1
        this.$emit('update:year', year)
        this.$emit('on-year-change', year)
      }
    },
   
    created() {
      this.getData()
    }
  }
  </script>
   
  <style lang="less">
  .quarter-picker {
    border-right: 1px solid #e5e6eb;
  }
  .quarter-picker-inner { 
    padding: 8px 16px;
  }
  .quarter-picker__header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
   
    // padding: 8px 16px;
    border-bottom: 1px solid #e5e6eb;
   
    .el-icon-d-arrow-left,
    .el-icon-d-arrow-right,
    .empty-arrow {
      cursor: pointer;
      width: 24px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      border-radius: 50%;
      transition: all 0.1s cubic-bezier(0, 0, 1, 1);
      user-select: none;
   
      &:hover {
        background-color: #e5e6eb;
      }
    }
   
    .empty-arrow {
      cursor: auto;
   
      &:hover {
        background-color: transparent;
      }
    }
   
    .quarter-picker__title {
      flex: 1;
      color: #1d2129;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
    }
  }
   
  .quarter-picker__options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 14px 16px;
  }
   
  .quarter-picker__item {
    padding: 4px;
    cursor: pointer;
    position: relative;
  }
   
  .quarter-picker__item__label {
    border-radius: 24px;
    color: #000;
    background-color: #fff;
    // font-weight: 500;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    width: 50px;
  }
   
  .quarter-picker__item--active .quarter-picker__item__label,
  .quarter-picker__item:hover .quarter-picker__item__label {
    background-color: #409eff;
    color: #fff;
  }
   
  .quarter-picker__item__today:after {
    position: absolute;
    bottom: -2px;
    left: 50%;
    display: block;
    width: 4px;
    height: 4px;
    margin-left: -2px;
    background-color: #409eff;
    border-radius: 50%;
    content: '';
  }
  </style>
   
  <style lang="less" scoped>
  </style>