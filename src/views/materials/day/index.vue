<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'100px'"
                size="mini"
                :maxShow="5"
                @search="search"
                @reset="reset"
            >
                <el-form-item label="日期">
                    <el-date-picker
                        size="mini"
                        v-model="form.date"
                        type="date"
                        placeholder="请选择"
                        format="yyyy-MM-dd"
                        value-format="yyyy-M-dd"
                        @change="handelMonth"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                <el-select
                    @change="handelState"
                    v-model="form.state"
                    placeholder="请选择状态"
                >
                    <el-option
                    v-for="item in options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                    >
                    </el-option>
                </el-select>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <div class="enteringButton">
                <el-upload
                action="#"
                :http-request="handelExcelImport"
                class="upload-demo"
                accept=".xls,.xlsx"
                multiple
                :show-file-list="false"
                >
                <el-button size="mini" type="primary">导入Excel</el-button>
                </el-upload>
                <el-button class="export" type="primary" @click="handelExcelExport" size="mini"
                >模板下载</el-button
                >
            </div>
            <el-table
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                style="width: 100%"
                :data="data"
                show-summary
                sum-text="月合计"
            >
                <el-table-column prop="time" label="日期"> </el-table-column>
                <el-table-column label="工字轮" >
                    <el-table-column
                        prop="b80_33"
                        label="B80/33"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="b80_17"
                        label="B80/17"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="b60"
                        label="B60"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="b40"
                        label="B40"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="mesCount"
                        label="合计"
                    >
                    </el-table-column>
                </el-table-column>
                <el-table-column label="托盘" >
                    <el-table-column
                        prop="plasticTray"
                        label="塑托"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="moodTray"
                        label="木托"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="ironTray"
                        label="铁托"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="clapboard"
                        label="隔板"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="trayCount"
                        label="合计"
                    >
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
            <div slot="header" class="clearfix">
                <div class="clearfixLeft">
                    <span>成品包装材料{{ title }}</span>
                </div>
                <!-- <div class="clearfix">
                <el-radio-group
                    v-model="all.dateType"
                    size="mini"
                    style="margin-right: 10px"
                >
                    <el-radio-button label="month">月统计</el-radio-button>
                </el-radio-group>
                <el-date-picker
                    v-show="all.dateType == 'month'"
                    v-model="all.month"
                    type="month"
                    placeholder="选择月"
                    size="mini"
                    value-format="yyyy-MM"
                    @change="allInMonthChange"
                >
                </el-date-picker>
                </div> -->
            </div>
            <div id="materialsMonth" style="height: 300px;"></div>
        </el-card>
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import {uploadExcel} from '@/utils/uploadExcel'
import {exportTemplate,importFinishedMaterials,showFinishedMaterialsDay} from '@/api/materials'
import * as echarts from "echarts";
export default {
    components:{
        SearchFilter
    },
    data(){
        return {
            form:{
                date:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                state:"0",
            },
            options:[
                {
                    key:"0",
                    label:"入库"
                },
                {
                    key:"1",
                    label:"发货"
                },
                {
                    key:"2",
                    label:"回收"
                },
                {
                    key:"3",
                    label:"报废"
                },
                {
                    key:"4",
                    label:"发往车间"
                },
            ],
            data:[],
            title:"发货",
            mesCount:[],
            trayCount:[],
            B80:[],
            B17:[],
            B60:[],
            B40:[],
            plasticTray:[],
            moodTray:[],
            ironTray:[],
            clapboard:[],
        }
    },
    mounted(){
        this.showFinishedMaterialsDay()
    },
    methods:{
        search(){
            this.showFinishedMaterialsDay()
        },
        reset(){
            this.showFinishedMaterialsDay()
        },
        handelMonth(){
            this.showFinishedMaterialsDay()
        },
        handelState(val){
            this.options.forEach((v)=>{
                if(v.key===val){
                    this.title = v.label
                }
            })
            this.showFinishedMaterialsDay()
        },
        async showFinishedMaterialsDay(){
            const val=this.form.date.split('-')
            const params={
                ...this.form,
                year:val[0],
                month:val[1],
                day:val[2],
            }
            const res = await showFinishedMaterialsDay(params)
            if(res.code==='0')
            {
                this.data=res.data
                this.mesCount=[]
                this.trayCount=[]
                this.plasticTray=[]
                this.clapboard=[]
                this.ironTray=[]
                this.moodTray=[]
                this.B40=[]
                this.B60=[]
                this.B17=[]
                this.B80=[]
                res.data.forEach((v)=>{
                   this.mesCount.push([v.time,v.mesCount])
                   this.trayCount.push([v.time,v.trayCount])
                   this.plasticTray.push([v.time,v.plasticTray])
                   this.clapboard.push([v.time,v.clapboard])
                   this.ironTray.push([v.time,v.ironTray])
                   this.moodTray.push([v.time,v.moodTray])  
                   this.B40.push([v.time,v.b40])
                   this.B60.push([v.time,v.b60])
                   this.B17.push([v.time,v.b80_17])
                   this.B80.push([v.time,v.b80_33])
                })
                const days = new Date(this.form.date.split('-')[0], this.form.date.split('-')[1], 0).getDate()
                let newArr=[]
                for(let i=1; i<=days;i++){
                    newArr.push(`${this.form.date.split('-')[0]}-${this.form.date.split('-')[1]}-${i}`)
                }
                let materialsMonth =  echarts.init(document.getElementById('materialsMonth'));
                let materialsMonthOptions = {
                    grid:{
                        top:"10%",
                        left:"2%",
                        right:"4%",
                        bottom:"3%",
                        containLabel:true,
                    },
                    tooltip: {
                        trigger: "item",
                        // formatter: '{b0}({a0}): {c0}<br />{b1}({a1}): {c1}%'
                    },
                    legend: { // 图例
                        data: ["工字轮小计", "托盘小计",'b80_33','b80_17','b60','b40','塑托','木托','铁托','隔板'],
                        top: "0%"
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        // prettier-ignore
                        data: newArr,
                    },
                    yAxis: {
                        axisLabel: {
                            formatter: '{value}'
                        },
                    },
                    series: [
                        {
                            name: '工字轮小计',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.mesCount,
                            smooth: true,
                        },
                        {
                            name: '托盘小计',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.trayCount,
                            smooth: true,
                        },
                        {
                            name: 'b80_17',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.B17,
                            smooth: true,
                        },
                        {
                            name: 'b80_33',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.B80,
                            smooth: true,
                            // label: {
                            //     show: true,
                            //     position: "bottom",
                            //     textStyle: {
                            //         fontSize: 16
                            //     }
                            // }
                        },
                        {
                            name: 'b60',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.B60,
                            smooth: true,
                            // label: {
                            //     show: true,
                            //     position: "bottom",
                            //     textStyle: {
                            //         fontSize: 16
                            //     }
                            // }
                        },
                        {
                            name: 'b40',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.B40,
                            smooth: true,
                            // label: {
                            //     show: true,
                            //     position: "bottom",
                            //     textStyle: {
                            //         fontSize: 16
                            //     }
                            // }
                        },
                        {
                            name: '木托',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.moodTray,
                            smooth: true,
                            // label: {
                            //     show: true,
                            //     position: "bottom",
                            //     textStyle: {
                            //         fontSize: 16
                            //     }
                            // }
                        },
                        {
                            name: '铁托',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.ironTray,
                            smooth: true,
                            // label: {
                            //     show: true,
                            //     position: "bottom",
                            //     textStyle: {
                            //         fontSize: 16
                            //     }
                            // }
                        },
                        {
                            name: '塑托',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.plasticTray,
                            smooth: true,
                            // label: {
                            //     show: true,
                            //     position: "bottom",
                            //     textStyle: {
                            //         fontSize: 16
                            //     }
                            // }
                        },
                        {
                            name: '隔板',
                            type: 'line',
                            // barWidth : '35%',
                            data: this.clapboard,
                            smooth: true,
                            // label: {
                            //     show: true,
                            //     position: "bottom",
                            //     textStyle: {
                            //         fontSize: 16
                            //     }
                            // }
                        },
                    ]
                };
                materialsMonth.setOption(materialsMonthOptions);
            }
        },
        handelExcelExport(){
            exportTemplate().then((res) => {
                const blob = new Blob([res], {type: 'application/vnd.ms-excel'})
                const fileName = "导出模板.xlsx";
                uploadExcel(fileName, blob);
            });
        },
        async handelExcelImport(file){
            const formData = new FormData();
            formData.append("file", file.file);
            const res = await importFinishedMaterials(formData)
            if(res.code==0){
                this.$message({
                    message: res.msg,
                    type: 'success',
                })
                this.showFinishedMaterialsDay()
            }else{
                this.$message({
                    message: res.msg,
                    type: 'error',
                })
            }
            
        },
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