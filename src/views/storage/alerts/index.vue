<template>
    <div class="warpper">
        <!-- <div class="table-filter">
            <SearchFilter
                :labelWidth="'145px'"
                size="mini"
                :maxShow="7"
                @search="search"
                @reset="reset"
            >
                 <el-form-item label="ID">
                    <el-input
                        size="mini"
                        v-model="id"
                        placeholder="请输入ID"
                        @change="handelID"
                        clearable
                    ></el-input>
                </el-form-item> 
                <el-form-item label="创建时间">
                <div class="time">
                    <el-date-picker
                    size="mini"
                    v-model="query.createdTime"
                    type="date"
                    placeholder="请选择创建时间"
                    @change="handelCreatedTime"
                    >
                    </el-date-picker>
                </div>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input
                        size="mini"
                        v-model="query.createdBy"
                        placeholder="请输入创建人"
                        @change="handelCreatedBy"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="更新人">
                    <el-input
                        size="mini"
                        v-model="query.updatedBy"
                        placeholder="请输入更新人"
                        @change="handelUpdatedBy"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="更新时间">
                    <div class="time">
                        <el-date-picker
                        size="mini"
                        v-model="query.updatedTime"
                        type="date"
                        placeholder="请选择更新时间"
                        @change="handelUpdatedTime"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="占用上限">
                    <el-input
                        size="mini"
                        v-model="query.upperLimit"
                        placeholder="请输入箱号"
                        @change="handelUpperLimit"
                        clearable
                ></el-input>
                </el-form-item>
                <el-form-item label="占用下限">
                    <el-input
                        size="mini"
                        v-model="query.lowerLimit"
                        placeholder="请输入占用下限"
                        @change="handelLowerLimit"
                        clearable
                ></el-input>
                </el-form-item>
                <el-form-item label="库列">
                    <el-input
                        size="mini"
                        v-model="query.onlyCodeCategory"
                        placeholder="请输入库列"
                        @change="handeLonlyCodeCategory"
                        clearable
                ></el-input>
                </el-form-item>
            </SearchFilter>
        </div> -->
        <div class="table">
        <el-table
            ref="table"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            :data="data"
        >
            <el-table-column
                type="index"
                label="#">
            </el-table-column>
            <el-table-column  prop="normsSimpleCode" label="规格简称"> </el-table-column>
            <el-table-column  prop="customerShortName" label="客户简称"> </el-table-column>
            <el-table-column
            prop="wheelType"
            label="轮型"
            >
            </el-table-column>
            <el-table-column  prop="meterLength" label="米长" >
            </el-table-column>
            <el-table-column
            prop="leftRightSides"
            label="左右面"
            >
            </el-table-column>
            <el-table-column prop="occupiedCount" label="使用计数">
            </el-table-column>
            <el-table-column prop="totalUse" label="总使用"> </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column
            prop="specialRequirements"
            label="特殊要求"
            >
            </el-table-column>
            <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="text"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        </div>
        <!-- <div class="pagenation">
            <PageNation
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="pageChange"
            />
        </div> -->
        <!-- <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="form" :model="create" label-width="80px">
            <el-form-item label="占用上限">
                <el-input v-model="create.upperLimit" placeholder="请输入占用上限"></el-input>
            </el-form-item>
            <el-form-item label="占用下限">
                <el-input v-model="create.lowerLimit" placeholder="请输入占用下限"></el-input>
            </el-form-item>
            <el-form-item label="库列">
                <el-input v-model="create.onlyCodeCategory" placeholder="请输入库列"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handelCreate">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="编辑"
        :visible.sync="edit"
        width="30%"
        :before-close="handleCancel">
        <el-form ref="form" :model="update" label-width="80px">
            <el-form-item label="更新人">
                <el-input v-model="update.updatedBy" placeholder="请输入更新人"></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="update.updatedTime" ></el-date-picker>
            </el-form-item>
            <el-form-item label="占用上限">
                <el-input v-model="update.upperLimit" placeholder="请输入占用上限"></el-input>
            </el-form-item>
            <el-form-item label="占用下限">
                <el-input v-model="update.lowerLimit" placeholder="请输入占用下限"></el-input>
            </el-form-item>
            <el-form-item label="库列">
                <el-input v-model="update.onlyCodeCategory" placeholder="请输入库列"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handelUpdate">确 定</el-button>
        </span>
        </el-dialog> -->
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
export default {
    name:"alerts",
    components:{
        SearchFilter,
        PageNation
    },
    data(){
        return {
            websock: null,
            listQuery:{
                pageNum:1,
                pageSize:10,
            },
            // total:0,
            data:[],
            // dialogVisible:false,
            // edit:false,
            // batchDelete:[],
        }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods:{
        initWebSocket(){ //初始化weosocket
            const wsuri =process.env.NODE_ENV === 'development' ? 'ws://192.168.110.23:9096/wms/websocket' : `ws://${window.location.host}/wms/websocket` ;
            this.websock = new WebSocket(wsuri);
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        },
        websocketonopen(){ //连接建立之后执行send方法发送数据
            let actions = {"test":"12345"};
            this.websocketsend(JSON.stringify(actions));
        },
        websocketonerror(){//连接建立失败重连
            this.initWebSocket();
        },
        websocketonmessage(e){ //数据接收
            const redata = JSON.parse(e.data);
            this.data=redata.data
        },
        websocketsend(Data){//数据发送
            this.websock.send(Data);
        },
        websocketclose(e){  //关闭
            console.log('断开连接',e);
        },
        // pageChange(val){
        //     this.listQuery.pageNum = val.page;
        //     this.listQuery.pageSize = val.limit;
        //     // this.basearlywarningthresholds()
        // }, 
    }
}
</script>

<style lang="scss" scoped>
.warpper {
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px 10px;
  }
  .table {
    padding: 6px 6px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    .enteringButton {
        margin-bottom: 10px;
      }
  }
  .echarts {
    display: flex;
    .box-card {
      margin-top: 10px;
      ::v-deep .el-card.is-always-shadow {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
    .saleRank {
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        .sort {
          display: flex;
          align-items: center;
        }
      }
      .client {
        display: inline-block;
        width: 240px;
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .index {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 1.5px;
        margin-right: 16px;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        background-color: #ccc;
        border-radius: 20px;
      }
    }
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    padding: 6px;
  }
}
::v-deep .el-table {
  .el-table__fixed {
    height: auto !important;
    bottom: 10px !important;
  }
  .el-table__fixed::before {
    height: 0px;
  } 
  .el-table__cell{
    padding: 0.5rem 0;
  }
}
.time {
  ::v-deep .el-input__suffix {
    right: 0.325rem;
  }
}

::v-deep .el-date-editor.el-input{
    width: 12.25rem;
}
</style>