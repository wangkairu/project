<template>
    <div class="warpper">
        <div class="table">
          <div class="table-filter">
            <SearchFilter
              :labelWidth="'130px'"
              size="mini"
              :maxShow="3"
              @search="search"
              @reset="reset"
            >
           
              <el-form-item label="WMS任务类别">
                <el-select v-model="form.wmsTaskType"   
                 @keyup.enter.native="selectBlur"
                  @change="selectBlur" placeholder="请选择WMS任务类别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </SearchFilter>
          </div>
            <el-table
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                style="width: 100%"
                :data="data"
            >
                <el-table-column prop="agvTaskNo" label="agv任务编号"> </el-table-column>
                <el-table-column prop="wmsTaskType" label="WMS任务类型"> 
                    <template slot-scope="scope">
                        <span v-show="scope.row.wmsTaskType===0">未开始</span>
                        <span v-show="scope.row.wmsTaskType===1">WMS自动发布任务</span>
                        <span v-show="scope.row.wmsTaskType===2">WMS人工发布任务</span>
                        <span v-show="scope.row.wmsTaskType===3">人工叉车任务</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wmsTaskPublisher" label="搬运任务发布人"> </el-table-column>
                <el-table-column prop="wmsTaskPublishTime" label="搬运任务发布时间"> </el-table-column>
                <el-table-column prop="wmsTaskCompleteTime" label="搬运任务完成时间"> </el-table-column>
                <el-table-column prop="remark" label="备注"> </el-table-column>
            </el-table>
        </div>
        <div class="pagenation">
            <PageNation
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="pageChange"
            />
        </div>
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import {queryAutoArtificialTaskList,} from '@/api/task'
export default {
    components:{
        PageNation,SearchFilter
    },
    data(){
        return {
            form:{},
            data:[],
            options:[
              {label:"未开始",value:"0"},
              {label:"WMS自动发布任务",value:"1"},
              {label:"WMS人工发布任务",value:"2"},
              {label:"人工叉车任务",value:"3"},
            ],
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            total:0,
        }
    },
    mounted(){
        this.queryAutoArtificialTaskList()
    },
    methods:{
        search(){ this.queryAutoArtificialTaskList()},
        reset(){
          this.form.wmsTaskType=''
          this.queryAutoArtificialTaskList()
        },
        selectBlur(){this.queryAutoArtificialTaskList()},
        pageChange(val){
            this.listQuery.pageNum = val.page;
            this.listQuery.pageSize = val.limit;
            this.queryAutoArtificialTaskList()
        },
        async queryAutoArtificialTaskList(){
            const params={
                request:this.form,
                page:this.listQuery.pageNum-1,
                size:this.listQuery.pageSize,
            }
            const res = await queryAutoArtificialTaskList(params)
            if(res.code==='0'){
                this.data = res.data.items
                this.total=res.data.total
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
      display: flex;
      .export {
        margin-left: 10px;
      }
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
</style>