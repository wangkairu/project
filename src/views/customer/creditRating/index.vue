<template>
    <div class="warpper">
        <div class="table">
            <el-table
            style="width: 100%;"
            :data="data"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
                <el-table-column  type="index" label="#"> </el-table-column>
                <el-table-column  label="客户简称" prop="mesCustomerShortName" > </el-table-column>
                <el-table-column  label="次数" prop="counts"> </el-table-column>
                <el-table-column  label="物流承运商" prop="logisticsCarriers" > </el-table-column>
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
    </div>
</template>

<script>
// import PageNation from "@/components/Pagination";
// import SearchFilter from "@/components/SearchFilter";
import {credit} from '@/api/customer'
export default{
    // components:{
    //     PageNation,
    //     SearchFilter
    // },
    data(){
        return {
            data:[],
        }
    },
    mounted(){
        this.credit()
    },
    methods:{
        async credit(){
            const res = await credit()
            if(res.code==='0'){
                this.data = res.data
            }
        }
    }
}
</script>

<style scoped lang="scss">
  .warpper {
    .table-filter {
      box-sizing: border-box;
      background-color: #fff;
      padding: 10px 10px;
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

    //   .enteringButton {
    //     margin-bottom: 10px;
    //   }
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
  }
  ::v-deep .el-table {
    .el-table__fixed {
      height: auto !important;
      bottom: 0px !important;
    }
  }
</style>