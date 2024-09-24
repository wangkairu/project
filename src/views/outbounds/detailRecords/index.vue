<template>
    <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'145px'"
        size="mini"
        :maxShow="4"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="库房">
          <el-select v-model="form.warehouseCode" @change="handelIsFinished" placeholder="请选择">
              <el-option
              v-for="item in warehouseArr"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
        </el-form-item>
      </SearchFilter>
    </div>
    <div class="table">
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="data"
      >
        <el-table-column fixed type="index" label="序号" width="100"> </el-table-column>
        <el-table-column
          fixed
          prop="mesCustomerShortName"
          label="箱号二维码"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="mesLeftRightSidesEnum" label="规格简称" width="180">
        </el-table-column>
        <el-table-column
          fixed
          prop="mesMeterLength"
          label="客户简称"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesWheelType"
          label="轮型"
        >
        </el-table-column>
        <el-table-column prop="mesNormsName" label="轮型">
        </el-table-column>
        <el-table-column prop="mesSpecialRequirements" label="米长">
        </el-table-column>
        <el-table-column prop="warehouseName" label="左右面"> </el-table-column>
        <el-table-column prop="boxCount" label="特殊要求"> </el-table-column>
        <el-table-column prop="allocateUser" label="调拨前库位编号">
        </el-table-column>
        <el-table-column prop="allocateLocation" label="调拨出库开始时间">
        </el-table-column>
        <el-table-column prop="startTime" label="调拨出库完成时间"> </el-table-column>
        <el-table-column prop="startTime" label="调拨出库制单人"> </el-table-column>
        <el-table-column prop="startTime" label="调拨出库操作人"> </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <!-- <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <el-button
                  type="text"
                  @click="handelDelete(scope.$index, scope.row)"
                  >删除</el-button>
              </template>
         </el-table-column> -->
      </el-table>
    </div>
    <div class="pagenation">
      <PageNation
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="pageChange"
      />
    </div>
  </div>
</template>

<script>
import PageNation from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import {queryAllocateOutList,} from '@/api/storeOut'
import {queryWarehouseColDropDown} from '@/api/location'
export default {
  components:{
      PageNation,SearchFilter
  },
  data(){
      return {
          openAllocate:false,
          data:[],
          warehouseArr:[],
          allocateData:[],
          form:{},
          rules:{},
          warehouseName:"",
          total:0,
          listQuery: {
              pageNum: 1,
              pageSize: 10,
          },

      }
  },
  mounted(){
      this.queryAllocateOutList()
      this.warehouse()
  },
  methods:{
   
      async warehouse(){
          const res = await queryWarehouseColDropDown({})
          if(res.code==='0'){
            // this.warehouseOptions = res.data
            this.warehouseArr=res.data
            this.form.warehouseCode = res.data[1].key
          }
      },
      search(){
          this.queryAllocateOutList()
      },
      reset(){
          // this.form={}
          this.queryAllocateOutList()
      },
        handelIsFinished(){
            this.queryAllocateOutList()
        },
      pageChange(val) {
          this.listQuery.pageNum = val.page-1;
          this.listQuery.pageSize = val.limit;
          this.queryAllocateOutList();
      },
      async queryAllocateOutList(){
          const params={
              ...this.form,
              isFinished:1,
              pageNumber: this.listQuery.pageNum,
              pageSize: this.listQuery.pageSize
          }
          const res = await queryAllocateOutList(params)
          if(res.code==='0'){
              this.data=res.data.items
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.warpper {
.table-filter {
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px 0;
  .form {
    display: flex;
    justify-content: space-around;
  }
}
.row {
  margin-top: 20px;
}
.table {
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 10px;
  .enteringButton {
    margin-bottom: 10px;
  }
}
.button {
  float: right;
}
.pagenation {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: #fff;
  margin-top: 10px;
  padding: 6px;
}
.background {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 8px 10px;
  .backgroundItem {
    padding: 15px 10px;
    margin-bottom: 10px;
    background: #f0f0f0;
    border-radius: 10px;
    position: relative;
  }
  .iconfont {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
  }
}
}
ul {
display: flex;
}
.hiden {
display: inline-block;
width: calc(100% - 112px);
}
::v-deep .el-descriptions__body .el-descriptions__table {
white-space: nowrap !important;
}
::v-deep .el-descriptions-item__content {
width: 300px;
}
::v-deep span.el-tooltip {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 4px !important;
}
::v-deep .el-form-item {
margin-bottom: 12px;
}
::v-deep .el-input--mini .el-input__inner {
width: 180px;
}
.time {
::v-deep .el-input__suffix {
  right: 2.6125rem;
}
}
</style>