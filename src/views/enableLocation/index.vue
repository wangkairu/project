<template>
    <div class="manualPickup">
      <NavBar :name="name" class="nav"> </NavBar>
      <div class="main">
        <van-cell-group>
            <van-form ref="form">
                <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="warehouse"
                    label="移库库房"
                    placeholder="点击选择移库库房"
                    @click="handelWarehouse"
                />
                <van-popup v-model="showWarehouse" position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="WarehouseArr"
                        @confirm="onConfirmWarehouse($event)"
                        @cancel="showWarehouse = false"
                    />
                </van-popup>
                <van-field  
                    @clear="startColIndex = ''" 
                    clearable 
                    v-model="startColIndex" 
                    label="开始列" 
                    placeholder="请输入开始列" 
                    :rules="[{ required: true }]"
                />
                <van-field  
                    @clear="endColIndex = ''" 
                    clearable 
                    v-model="endColIndex" 
                    label="结束列" 
                    placeholder="请输入结束列" 
                    :rules="[{ required: true }]"
                />
                <van-field  
                    @clear="startRowIndex = ''" 
                    clearable 
                    v-model="startRowIndex" 
                    label="开始行" 
                    placeholder="请输入开始行" 
                    :rules="[{ required: true }]"
                />
                <van-field  
                    @clear="endRowIndex = ''" 
                    clearable 
                    v-model="endRowIndex" 
                    label="结束行" 
                    placeholder="请输入结束行" 
                    :rules="[{ required: true }]"
                />
            </van-form>
        </van-cell-group>
      </div>
      <div class="footer">
        <van-button round type="info" @click="SubmitManualOperation"
          >提交</van-button
        >
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar'
  import { Toast } from 'vant';
  import {  queryEnumList} from '@/api/shift'
  import {enableDisableLocation} from '@/api/location'
  export default {
    name: "disableLocation",
    components: {
      NavBar
    },
    data() {
      return {
        name: "启用库位",
        value: "",
        obj: null,
        showWarehouse:false,
        warehouse:"",
        warehouseCode:'',
        WarehouseArr:[],
        warehouseOptions:[],
        endColIndex:"",
        endRowIndex:"",
        startColIndex:"",
        startRowIndex:"",
        warehouseCode:"",
      }
    },
    mounted() {},
    methods: {
      onConfirmWarehouse(e){
        this.warehouseOptions.forEach((v)=>{
            if(v.value===e){
                this.warehouse=e
                this.warehouseCode=v.key
            }
        })
        this.showWarehouse = false
      },
      async queryEnumList(){
        const res = await queryEnumList('WarehouseCodeEnum')
        if(res.data.code=='0'){
            this.warehouseOptions= res.data.data
            this.WarehouseArr = res.data.data.map((v)=>v.value)
        }
      },
      handelWarehouse(){
        this.queryEnumList()
        this.showWarehouse = true
      },
      async SubmitManualOperation() {
        this.$refs.form.validate().then(async () => {
            const params={
                areaCode: "A",
                endColIndex: this.endColIndex,
                endRowIndex: this.endRowIndex,
                isEnable: 1,
                startColIndex: this.startColIndex,
                startRowIndex: this.startRowIndex,
                warehouseCode: this.warehouseCode
            }
            const res = await enableDisableLocation(params)
            if(res.data.code==='0'){
                this.endColIndex=''
                this.endRowIndex=''
                this.startColIndex=''
                this.startRowIndex=''
                this.warehouseCode=''
                this.warehouse=''
            }
        }).catch(() => {
        })
      }
    }
  }
  </script>
  
  
  <style scoped lang="less">
  .manualPickup {
    height: 100%;
    display: flex;
    flex-direction: column;
    .nav {
      height: 50px;
    }
    .main {
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
      position: relative;
      .empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .footer {
      height: 50px;
      padding: 2.5px 10px;
      border-top: 1px solid #ccc;
      .van-button--normal {
        width: 100%;
      }
    }
  }
  .boxInformation {
    margin-top: 6px;
  
    .boxCon {
      color: #444;
      font-size: 13px;
      padding: 0 8px;
    }
    .information {
      // padding: 0 15px;
      background: #fff;
      margin-top: 6px;
      height: 148px;
      li {
        padding: 0 36px;
        height: 37px;
        line-height: 37px;
        border-bottom: 1px solid #eee;
      }
    }
    .title {
      color: #666;
      font-size: 13px;
    }
    .con {
      color: #4e4e4e;
      display: inline-block;
      margin-left: 30px;
    }
  }
  /deep/ .van-icon-clear:hover {
    cursor: pointer;
  }
  </style>