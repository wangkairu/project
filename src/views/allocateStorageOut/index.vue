<template>
    <div class="storage">
      <NavBar :name="name" class="nav"> </NavBar>
      <van-field
        readonly
        clickable
        name="picker"
        :value="warehouse"
        label="库房"
        placeholder="点击选择库房"
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
        readonly
        clickable
        name="picker"
        :value="isFinishedval"
        label="调拨状态"
        placeholder="点击选择调拨状态"
        @click="isFinishedFlag = true"
      />
      <van-popup v-model="isFinishedFlag" position="bottom">
        <van-picker
          show-toolbar
          :columns="isFinishedArr"
          @confirm="onConfirmIsFinishedFlag($event)"
          @cancel="isFinishedFlag = false"
        />
      </van-popup>
      <div class="footer">
          <van-button size="small" style="margin-top: 4px;"  type="info" @click="handelCreate">创建调拨出库计划单</van-button>
          <van-button style="margin-left: 10px;margin-top: 4px;" size="small"   type="info" @click="handelDelete">删除调拨出库单</van-button>
      </div>
      <div class="main">
        <div class="con" v-if="outData&&outData.length>0">
            <div class="box" v-for="(v,ind) in outData" :key="ind">
                <van-checkbox  v-model="v.checked" shape="square" @change="handelCheckBox(v)"></van-checkbox>
                <div class="item">
                    <div class="itemBox">
                      <h4>{{ v.mesCustomerShortName }}</h4>
                      <van-button type="info" class="complate" @click="handelClickComplate(v)">完成</van-button>
                    </div>
                    <div class="item_con">
                        <van-row >
                          <van-col span="20" offset="1"> <li> 
                                        <span>库房名称&emsp;</span>
                                        <span>{{ v.warehouseName }}</span>
                                    </li></van-col>
                            <van-col span="20" offset="1"> <li> 
                                        <span>规格简称&emsp;</span>
                                        <span>{{ v.mesNormsName }}</span>
                                    </li></van-col>
                            <van-col span="20" offset="1">      
                                <li>
                                    <span>客户简称&emsp;</span>
                                    <span>{{ v.mesCustomerShortName }}</span>
                                </li>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-around">
                            <van-col span="10" > 
                                <li> 
                                    <span>轮型&emsp;</span>
                                    <span>{{ v.mesWheelType }}</span>
                                </li>
                            </van-col>
                            <van-col span="10">     
                                <li>
                                    <span>米长&emsp;</span>
                                    <span>{{ v.mesMeterLength }}</span>
                                </li>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-around">
                          <van-col span="10" > 
                                <li> 
                                    <span>左右面&emsp;</span>
                                    <span>{{ v.mesLeftRightSidesEnum }}</span>
                                </li>
                            </van-col>
                            <van-col span="10" > 
                                <li> 
                                    <span>调拨状态&emsp;</span>
                                    <span>{{ v.isFinished==1?'已完成':'未完成' }}</span>
                                </li>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-around">
                            <van-col span="10">      
                                <li>
                                    <span>可调拨箱数&emsp;</span>
                                    <span >{{ v.boxCount }}</span>
                                </li>
                            </van-col>
                            <van-col span="10">      
                                <li>
                                    <span>调拨箱数&emsp;</span>
                                    <span >{{ v.count }}</span>
                                </li>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="item_con">
                        <van-row style="margin-top: 2px;">
                            <van-col span="20" offset="1">      
                                <li>
                                    <span>出库开始时间&emsp;</span>
                                    <span>{{ v.startTime }}</span>
                                </li>
                            </van-col>
                            <van-col span="20" offset="1"> 
                                <li> 
                                    <span>出库完成时间&emsp;</span>
                                    <span>{{ v.finishTime }}</span>
                                </li>
                            </van-col>
                            <van-col span="20" offset="1"> 
                                <li> 
                                    <span>调拨出库操作人&emsp;</span>
                                    <span>{{ v.allocateUser }}</span>
                                </li>
                            </van-col>
                            <!-- <van-col span="20" offset="1">      
                                <li>
                                    <span>备注&emsp;</span>
                                    <span>{{ v.remark }}</span>
                                </li>
                            </van-col> -->
                        </van-row>
                    </div> 
                </div>
            </div>
        </div>
        <div v-else class="empty">
          <span>暂无数据</span>
          <!-- <van-empty description="暂无数据" /> -->
        </div>
      </div>

      <!-- <div class="footer">
        <van-button round type="info" @click="warehousingGoods">提交</van-button>
      </div> -->
    </div>
  </template>
  
  <script>
  // import FormGroup from '@/components/FormGroup'
  import NavBar from '@/components/NavBar'
  import {queryAllocateOutList,complete,allocateOutDelete} from '@/api/allocate'
  import {queryEnumList} from '@/api/shift'
  import { Toast } from 'vant';
  export default {
    name: "Storage",
    components: {
      NavBar,
      // FormGroup,
    },
    data() {
      return {
        form: null,
        show: false,
        isFinishedFlag:false,
        WarehouseArr:[],
        isFinishedArr:[ '已完成','未完成'],
        date: new Date(),
        showWarehouse:false,
        name: '调拨出库',
        warehouse:"",
        warehouseCode:"",
        isFinishedval:"",
        isFinished:"",
        data:[],
        ids:[],
        outData:[],
        selectArr:[],
      }
    },
    mounted() {
        this.queryAllocateOutList()
    },
    methods: {
      async handelClickComplate(v){
        const res = await complete(v.id)
        if(res.data.code=='0'){
          Toast.success({ message: res.data.msg });
          this.queryAllocateOutList()
        } else {
          Toast.fail({ message: res.data.msg });
        }
      },
      async handelDelete(){
        if(this.selectArr.length==0){
          Toast.fail({ message: '请先勾选删除数据'});
        }else if(this.selectArr.length>0){
          const flag = this.selectArr.every((v)=>v.isFinished==0)
          if(flag){
            this.ids=this.selectArr.map((v)=>v.id)
            const res = await allocateOutDelete(this.ids)
            if (res.data.code === '0') {
              Toast.success({ message: res.data.msg });
              this.queryAllocateOutList()
            } else {
              Toast.fail({ message: res.data.msg });
            }
          }else{
            Toast.fail({ message: '请勾选调拨状态为未完成的数据'});
          }
        }
      },
      handelCreate(){
        this.$router.push('/allocateStorageOut/create')
      },
        onConfirmIsFinishedFlag(e){
          this.isFinishedval=e;
          e=='已完成'?this.isFinished=1:this.isFinished=0;
          this.isFinishedFlag=false;
          this.queryAllocateOutList()
        },
        handelCheckBox(val){
          if(val.checked){
            this.selectArr.push(val)
          }else{
            let ind=this.selectArr.findIndex((item)=>{return item.id==val.id})
            this.selectArr.splice(ind,1)
          }
        },
        handelWarehouse(){
            this.queryEnumList()
            this.showWarehouse = true
        },
        onConfirmWarehouse(e){
            this.warehouseOptions.forEach((v)=>{
                if(v.value===e){
                    this.warehouse=e
                    this.warehouseCode=v.key
                    // this.onlyCodeValue = ''
                }
            })
            this.showWarehouse = false
            this.queryAllocateOutList()
        },
        async queryEnumList(){
            const res = await queryEnumList('WarehouseCodeEnum')
            if(res.data.code=='0'){
              this.warehouseOptions= res.data.data
              this.WarehouseArr = res.data.data.map((v)=>v.value)
            }
        },
      async queryAllocateOutList() {
        const params={
            warehouse:this.warehouseCode,
            isFinished:this.isFinished,
        }
        const res = await queryAllocateOutList(params)
        if (res.data.code === '0') {
            this.outData = res.data.data.items&&res.data.data.items.map((v)=>{
                return{
                  ...v,
                  checked:false,
                }
            })
        } else {
            this.outData = null;
        }
      },
    }
  }
  </script>
  
  <style scoped lang="less">
  .storage {
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
      .con{
            .box{
                display: flex;
                padding: 0 10px;
                align-items: center;
            }
            margin-top: 2px;
            .item{
                width: 92%;
                margin-top: 10px;
                background: #fff;
                .item_con{
                    background: #fff;
                    border-bottom: 1px solid #ccc;
                    padding: 6px 0;
                    ul{
                        display: flex;
                        // justify-content: space-between;
                        padding: 2px 6px;
                    }
                    li{
                        margin-top: 4px;
                    }
                    ul li:not(:first-child){
                        margin-left: 15px;
                    }
                }
                .button{
                    padding: 5px 0;
                    display: flex;
                    justify-content: space-between;
                }
                .edit{
                    color: #1989fa;
                    padding: 4px 14px;
                    // float:right;
                }
            }
        }
        .empty {
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
          color: #ccc;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
    }
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0px 10px;
      border-top: 1px solid #ccc;
      .van-button--normal {
        width: 100%;
      }
    }
  }
  .itemBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    background: #ccc;
    .complate{
      padding: 0px 8px;
      height: 34px;
      // border: 1px solid #1989fa;
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
  </style>