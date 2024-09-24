<template>
    <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'130px'"
          size="mini"
          :maxShow="3"
          @search="search"
          @reset="reset"
        >
        <el-form-item label="年份">
          <el-date-picker
            class="time"
            v-model="form.year"
            type="year"
            @keyup.enter.native="selectBlur"
            @change="selectBlur"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker> 
          </el-form-item>
          <el-form-item label="客户简码">
            <el-input
              size="mini"
              v-model="form.mesCustomerSimpleCode"
              placeholder="请输入内容"
              @keyup.enter.native="selectBlur"
              @change="selectBlur"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户信用级">
            <el-input
              size="mini"
              v-model="form.customerLevel"
              placeholder="请输入内容"
              @keyup.enter.native="selectBlur"
              @change="selectBlur"
            ></el-input>
          </el-form-item>
          <el-form-item label="规格类型">
            <el-input
              size="mini"
              v-model="form.normsType"
              placeholder="请输入内容"
              @keyup.enter.native="selectBlur"
              @change="selectBlur"
            ></el-input>
          </el-form-item>
          <el-form-item label="发货类型">
            <el-input
              size="mini"
              v-model="form.deliverType"
              placeholder="请输入内容"
              @keyup.enter.native="selectBlur"
              @change="selectBlur"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES规格简称">
                <el-select
                    filterable
                    v-model="form.mesNormShortName"
                    placeholder="请选择MES规格简称"
                    @change="selectBlur"
                >
                    <el-option
                    v-for="item in mesNormsNameListOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MES客户简称">
            <el-select
                filterable
                v-model="form.mesCustomerShortName"
                placeholder="请选择MES客户简称"
                @change="selectBlur"
            >
                <el-option
                v-for="item in mesCustomerOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                >
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="MES米长">
                <el-select
                    filterable
                    v-model="form.mesMeterLength"
                    placeholder="请输入MES米长"
                    @change="selectBlur"
                >
                    <el-option
                    v-for="item in mesMeterLength"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MES轮型">
                <el-select
                    filterable
                    v-model="form.mesWheelType"
                    placeholder="请输入MES轮型"
                    @change="selectBlur"
                >
                    <el-option
                    v-for="item in mesWheelType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="托盘">
                <el-select
                    filterable
                    v-model="form.mesTray"
                    placeholder="请输入托盘"
                    @change="selectBlur"
                >
                    <el-option
                        v-for="item in mesTrayOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </SearchFilter>
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          style="width: 100%"
          :data="data"
          :summary-method="getSummaries"
          show-summary
          v-loading="loading"
        >
          <el-table-column  type="index" label="序号"> </el-table-column>
          <el-table-column  prop="mesNormShortName" label="规格简称"> </el-table-column>
          <el-table-column  prop="mesCustomerShortName" label="客户简称" width="100"></el-table-column>
          <el-table-column  prop="mesCustomerSimpleCode" label="客户简码"> </el-table-column>
          <el-table-column  prop="mesWheelType" label="轮型"> </el-table-column>
          <el-table-column  prop="mesTray" label="托盘"> </el-table-column>
          <el-table-column  prop="mesMeterLength" label="米长"> </el-table-column>
          <el-table-column  prop="customerLevel" label="客户信用级"> </el-table-column>
          <el-table-column  prop="normsType" label="规格类型"> </el-table-column>
          <el-table-column  prop="deliverType" label="发货类型"> </el-table-column>
          <!-- <el-table-column
            v-for="(v,ind) in column"
            :key="ind"
            :label="v.label"
            :width="v.value==='taskNumber'&&v.check?220:100"
          >
          <template slot-scope="scope">
              <span v-show="v.value==='taskNumber'&&!scope.row.flag&&!v.check">{{ scope.row.dates[v.index].taskNumber}}</span>
              <el-input v-show="v.value==='taskNumber'&&scope.row.flag&&v.check" v-model="scope.row.dates[v.index].taskNumber" placeholder="请输入内容"></el-input>
              <span v-show="v.value==='submitNumber'">{{ scope.row.dates[v.index].submitNumber}}</span>
              <span v-show="v.value==='finishRatio'">{{ scope.row.dates[v.index].finishRatio}}</span>
              <span v-show="v.value==='restoreNumber'">{{ scope.row.dates[v.index].restoreNumber}}</span>
              <el-button v-show="v.value==='taskNumber'&&!scope.row.flag||v.value==='taskNumber'&&!v.check" type="text"  @click="handelEdit(scope.row,v)"
                >修改</el-button>
              <el-button v-show="v.value==='taskNumber'&&scope.row.flag&&v.check" type="text"  @click="insertOneOrder(scope.row,v)"
              >保存</el-button>
              <el-button v-show="v.value==='taskNumber'&&scope.row.flag&&v.check" type="text"  @click="handelCancel(scope.row,v)"
                >取消</el-button>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,index) in months" :key="item" :label="`${item}月`">
              <template slot-scope="scope">
                  <span>{{scope.row.dates[index].taskNumber}}</span>
              </template>	
          </el-table-column> -->
          <el-table-column prop="map.1MonthTaskNumber" label="1月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['1MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['1MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['1MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,1,scope.row.map['1MonthTaskNumber'])"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,1)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.1MonthSubmitNumber" label="1月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.1MonthRestoreNumber" label="1月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.1FinishRatio" label="1月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.2MonthTaskNumber" label="2月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['2MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['2MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['2MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,2,scope.row.map['2MonthTaskNumber'])"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,2)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.2MonthSubmitNumber" label="2月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.2MonthRestoreNumber" label="2月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.2FinishRatio" label="2月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.3MonthTaskNumber" label="3月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['3MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['3MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['3MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,3,scope.row.map['3MonthTaskNumber'])"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,3)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.3MonthSubmitNumber" label="3月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.3MonthRestoreNumber" label="3月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.3FinishRatio" label="3月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.4MonthTaskNumber" label="4月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['4MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['4MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['4MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,4,scope.row.map['4MonthTaskNumber'])"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,4)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.4MonthSubmitNumber" label="4月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.4MonthRestoreNumber" label="4月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.4FinishRatio" label="4月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.5MonthTaskNumber" label="5月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['5MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['5MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['5MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,5)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,5)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.5MonthSubmitNumber" label="5月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.5MonthRestoreNumber" label="5月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.5FinishRatio" label="5月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.6MonthTaskNumber" label="6月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['6MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['6MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['6MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,6)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,6)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.6MonthSubmitNumber" label="6月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.6MonthRestoreNumber" label="6月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.6FinishRatio" label="6月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.7MonthTaskNumber" label="7月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['7MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['7MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['7MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,7)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,7)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.7MonthSubmitNumber" label="7月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.7MonthRestoreNumber" label="7月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.7FinishRatio" label="7月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.8MonthTaskNumber" label="8月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['8MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['8MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['8MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,8)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,8)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.8MonthSubmitNumber" label="8月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.8MonthRestoreNumber" label="8月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.8FinishRatio" label="8月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.9MonthTaskNumber" label="9月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['9MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['9MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['9MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,9)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,9)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.9MonthSubmitNumber" label="9月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.9MonthRestoreNumber" label="9月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.9FinishRatio" label="9月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.10MonthTaskNumber" label="10月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['10MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['10MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['10MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,10)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,10)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.10MonthSubmitNumber" label="10月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.10MonthRestoreNumber" label="10月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.10FinishRatio" label="10月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.11MonthTaskNumber" label="11月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['11MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['11MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['11MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,11)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,11)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.11MonthSubmitNumber" label="11月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.11MonthRestoreNumber" label="11月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.11FinishRatio" label="11月完成率" width="120"> </el-table-column>
          <el-table-column prop="map.12MonthTaskNumber" label="12月订单量" width="120"> 
            <template slot-scope="scope">
              <span v-show="!scope.row.flag">{{ scope.row.map['12MonthTaskNumber']}}</span>
              <!-- <el-input v-show="scope.row.flag" v-model="scope.row.map['12MonthTaskNumber']" placeholder="请输入内容"></el-input>
              <el-button v-show="!scope.row.flag" type="text"  @click="handelEdit(scope.row,scope.row.map['12MonthTaskNumber'])"
                >修改</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="insertOneOrder(scope.row,12)"
              >保存</el-button>
              <el-button v-show="scope.row.flag" type="text"  @click="handelCancel(scope.row,12)"
                >取消</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="map.12MonthSubmitNumber" label="12月交付量" width="120"> </el-table-column>
          <el-table-column prop="map.12MonthRestoreNumber" label="12月可发库存量" width="120"> </el-table-column>
          <el-table-column prop="map.12FinishRatio" label="12月完成率" width="120"> </el-table-column>
          <el-table-column prop="allTaskNumber" label="合计订单量" width="120"> </el-table-column>
          <el-table-column prop="allSubmitNumber" label="合计交付量" width="120"> </el-table-column>
          <el-table-column prop="finishRatio" label="合计订单完成率"> </el-table-column>
          <el-table-column label="1月订单编号" width="120"> 
            <template slot-scope="scope">
              <el-button type="text" @click="handelInsert(1,scope.row)" 
              >插入</el-button>
              <el-button type="text" @click="handelDetal(1,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="2月订单编号" width="120">  
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(2,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(2,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="3月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(3,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(3,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="4月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(4,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(4,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="5月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(5,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(5,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="6月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(6,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(6,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="7月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(7,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(7,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="8月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(8,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(8,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="9月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(9,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(9,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="10月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(10,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(10,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="11月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(11,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(11,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="finishedTime" label="12月订单编号" width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="handelInsert(12,scope.row)"
              >插入</el-button>
              <el-button type="text" @click="handelDetal(12,scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagenation">
        <PageNation
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="pageChange"
        />
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        @close="handleClose('ruleForm')">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="订单编号" prop="number">
            <el-input v-model="ruleForm.number" placeholder="请输入订单编号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelMonthInsert">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="detail"
        :visible.sync="dialogVisible_1"
        width="30%"
        @close="handelReset">
        <li class="orderNum" v-for="(v,ind) in options" :key="ind"><span>订单编号：</span>{{ v }}</li>
        <div style="display: flex;justify-content: space-between;margin-top: 10px;">
          <el-input style="width: 280px;" v-model="ruleForm.id" placeholder="请输入订单编号"></el-input>
          <el-button type="primary" @click="handelInsertOne">插入</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible_1 = false">取 消</el-button> -->
          <el-button type="primary" @click="handelMonthDetail">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  <script>
  import {selectAll,insertNumberOrder,selectNumberOrder,insertOneOrder} from '@/api/ordersInteractions'
  import SearchFilter from "@/components/SearchFilter";
  import PageNation from "@/components/Pagination";
  export default {
    name: "shifting",
    components: {  SearchFilter,PageNation },
    data() {
      return {
        title:"",
        detail:"",
        dialogVisible_1: false,
        dialogVisible: false,
        loading: true,
        data: [],
        column:[],
        ruleForm:{
          number:"",
        },
        options:[],
        detailObj:{},
        editTaskNum:{},
        form: {
          year:`${new Date().getFullYear()}`
        },
        rules:{
          number: { required: true, message: '请输入订单编号', trigger: ['change','blur'] }
        },
        mesNormsNameListOptions:[],
        mesCustomerOptions:[],
        mesWheelType:[],
        mesTrayOptions:[],
        mesMeterLength:[],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total:0,
        taskVal:"",
        // months:['1','2','3','4','5','6','7','8','9','10','11','12']
      };
    },
    mounted() {
      this.selectAll();
      this.$store.dispatch('realList').then(()=>{
        this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
        this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
        this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
        this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
        this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
      })
    },
    methods: {
      pageChange(val) {
        this.listQuery.pageNum = val.page;
        this.listQuery.pageSize = val.limit;
        this.selectAll();
      },
      getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          let sum =0
          data.forEach(item => {
            if(index==10){
              sum+=item.map['1MonthSubmitNumber']
              sums[index]=sum
            }else if(index==14){
              sum+=item.map['2MonthSubmitNumber']
              sums[index]=sum
            }else if(index==18){
              sum+=item.map['3MonthSubmitNumber']
              sums[index]=sum
            }else if(index==22){
              sum+=item.map['4MonthSubmitNumber']
              sums[index]=sum
            }else if(index==26){
              sum+=item.map['5MonthSubmitNumber']
              sums[index]=sum
            }else if(index==30){
              sum+=item.map['6MonthSubmitNumber']
              sums[index]=sum
            }else if(index==34){
              sum+=item.map['7MonthSubmitNumber']
              sums[index]=sum
            }else if(index==38){
              sum+=item.map['8MonthSubmitNumber']
              sums[index]=sum
            }else if(index==42){
              sum+=item.map['9MonthSubmitNumber']
              sums[index]=sum
            }else if(index==46){
              sum+=item.map['10MonthSubmitNumber']
              sums[index]=sum
            }else if(index==50){
              sum+=item.map['11MonthSubmitNumber']
              sums[index]=sum
            }else if(index==54){
              sum+=item.map['12MonthSubmitNumber']
              sums[index]=sum
            }
          });
          // if(column.label.includes('订单量')){
          //   values.forEach((v)=>{
          //     if(index===10&&v.month===1){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===14&&v.month===2){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===18&&v.month===3){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===22&&v.month===4){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===26&&v.month===5){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===30&&v.month===6){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===34&&v.month===7){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===38&&v.month===8){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===42&&v.month===9){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===46&&v.month===10){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===50&&v.month===11){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     } else if(index===54&&v.month===12){
          //       sum+=v.taskNumber
          //       sums[index] = sum
          //     }
          //   })
          //   data.forEach((v)=>{
          //     if(index===58){
          //       sum+=v.allTaskNumber
          //       sums[index] = sum
          //     }
          //   })
          // } else if(column.label.includes('交付量')){
          //   values.forEach((v)=>{
          //     if(index===11&&v.month===1){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===15&&v.month===2){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===19&&v.month===3){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===23&&v.month===4){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===27&&v.month===5){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===31&&v.month===6){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===35&&v.month===7){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===39&&v.month===8){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===43&&v.month===9){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===47&&v.month===10){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===51&&v.month===11){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     } else if(index===55&&v.month===12){
          //       sum+=v.submitNumber
          //       sums[index] = sum
          //     }
          //   })
          //   data.forEach((v)=>{
          //     if(index===59){
          //       sum+=v.allSubmitNumber
          //       sums[index] = sum
          //     }
          //   })
          // }
        });
        return sums;
      },
      handelEdit(row,val){
        this.taskVal=val
        row.flag = true
      },
      handelCancel(row,val){
        if(val==1){
          row.map['1MonthTaskNumber']=this.taskVal
        }else if(val==2){
          row.map['2MonthTaskNumber']=this.taskVal
        }else if(val==3){
          row.map['3MonthTaskNumber']=this.taskVal
        }else if(val==4){
          row.map['4MonthTaskNumber']=this.taskVal
        }else if(val==5){
          row.map['5MonthTaskNumber']=this.taskVal
        }else if(val==6){
          row.map['6MonthTaskNumber']=this.taskVal
        }else if(val==7){
          row.map['7MonthTaskNumber']=this.taskVal
        }else if(val==8){
          row.map['8MonthTaskNumber']=this.taskVal
        }else if(val==9){
          row.map['9MonthTaskNumber']=this.taskVal
        }else if(val==10){
          row.map['10MonthTaskNumber']=this.taskVal
        }else if(val==11){
          row.map['11MonthTaskNumber']=this.taskVal
        }else if(val==12){
          row.map['12MonthTaskNumber']=this.taskVal
        }
        row.flag = false
      },
      handleClose(formName){
        this.$refs[formName].resetFields()
      },
      handelReset(){
        this.ruleForm.id=''
      },
      handelMonthDetail(){ 
        this.dialogVisible_1 = false
        this.ruleForm.id=''
      },
      async insertOneOrder(row,val,newVal){
        this.editTaskNum={
          customerLevel:row.customerLevel=="null"?null:row.customerLevel,
          deliverType:row.deliverType==0?null:row.deliverType,
          id:row.id,
          shop:row.shop,
          mesCustomerName:row.mesCustomerName,
          mesCustomerShortName: row.mesCustomerShortName,
          mesCustomerSimpleCode: row.mesCustomerSimpleCode=="null"?null:row.mesCustomerSimpleCode,
          mesMeterLength: row.mesMeterLength,
          mesNetWeight: newVal,
          mesNormShortName: row.mesNormShortName,
          mesTray: row.mesTray,
          mesWheelType: row.mesWheelType,
          normsType: row.normsType,
          month:val,
          year:Number(this.form.year),
        }
        const res = await insertOneOrder(this.editTaskNum)
        if(res.code === '0'){
          this.$message.success(res.msg)
          row.flag = false
        }
      },
      async handelMonthInsert(){
        const res = await insertNumberOrder(this.ruleForm)
        if(res.code==='0'){
          this.$message.success(res.msg)
          this.dialogVisible = false
        }else{
          this.$message.error(res.msg)
        }
      },
      handelInsert(month,row){
        this.ruleForm ={
          mesCustomerShortName:row.mesCustomerShortName,
          mesMeterLength:row.mesMeterLength,
          mesNormShortName:row.mesNormShortName,
          mesNormType:row.normsType?row.normsType:null,
          mesTray:row.mesTray,
          mesWheelType:row.mesWheelType,
          mesCustomerSimpleCode:row.mesCustomerSimpleCode,
          month:month,
          year:Number(this.form.year),
        }
        this.title=`${month}月插入`
        this.dialogVisible = true
      },
      async handelInsertOne(){
        const params={
          ...this.detailObj,
          number:this.ruleForm.id
        }
        const res = await insertNumberOrder(params)
        if(res.code==='0'){
          this.ruleForm.id=''
          this.$message.success(res.msg)
          this.selectNumberOrder();
        }else{
          this.$message.error(res.msg)
        }
      },
      async handelDetal(month,row){
        this.detail=`${month}月详情`
        this.detailObj={
          mesCustomerShortName:row.mesCustomerShortName,
          mesMeterLength:row.mesMeterLength,
          mesNormShortName:row.mesNormShortName,
          mesNormType:row.normsType?row.normsType:'',
          mesTray:row.mesTray,
          mesWheelType:row.mesWheelType,
          month:month,
          year:Number(this.form.year),
        }
        this.selectNumberOrder()
        this.dialogVisible_1 = true
      },
      async selectNumberOrder(){
        const res = await selectNumberOrder(this.detailObj)
        this.options = res.data
      },
      search() {
        this.selectAll();
      },
      reset() {
        this.form = {
          customerLevel : "",
          deliverType: '',
          mesCustomerShortName: "",
          mesCustomerSimpleCode: "",
          mesMeterLength: '',
          mesNormShortName: "",
          mesTray: '',
          mesWheelType: "",
          normsType: "",
          year: `${new Date().getFullYear()}`
        };
        this.selectAll();
      },
      selectBlur() {
        this.selectAll();
      },
      async selectAll() {
        const params = {
          ...this.form,
          page: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
        };
        const res = await selectAll(params);
        if (res.code === "0") {
          this.data = res.data[1].map((v)=>{
            // arr=v.dates.map((item,ind)=>{
            //   return [
            //     {label:item.month+'月订单量',index:ind,value:"taskNumber",month:item.month,check:false},
            //     {label:item.month+'月交付量',index:ind,value:"submitNumber",month:item.month,},
            //     {label:item.month+'月完成率',index:ind,value:"finishRatio",month:item.month,},
            //     {label:item.month+'月可发库存',index:ind,value:"restoreNumber",month:item.month,} 
            //   ]
            // })
            return {...v,flag:false,}
          })
          this.total=res.data[0].total
          this.loading = false
        } 
      },
    },
  };
  </script>
  <style lang="scss" scoped>
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
    .start{
      h4{
        padding: 4px 0;
        border-bottom: 1px solid #eee;
        margin-bottom: 6px;
      }
    }
    .end{
      margin-top: 10px;
      h4{
        padding: 4px 0;
        border-bottom: 1px solid #eee;
        margin-bottom: 6px;
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
  .orderNum{
    height: 30px;
    line-height: 30px;
  }
  ::v-deep .el-descriptions__body .el-descriptions__table {
    white-space: nowrap !important;
  }
  ::v-deep .el-descriptions-item__content {
    width: 100px;
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
  // ::v-deep .el-drawer__body {
  //   padding: 0 16px;
  // }
  // ::v-deep .el-table .el-table__cell{
  //   padding: 0.54rem 0;
  // }
  ::v-deep .el-table {
    .el-table__fixed {
      height: auto !important;
      bottom: 0px !important;
      padding: 0 10px;
    }
    // .el-table__fixed::before {
    //   height: 0px;
    // } 
    // .el-table__cell{
    //   padding: 0.5rem 0;
    // }
  }
  .el-table ::v-deep .DisableSelection > .cell {
    display: none;
  }
  </style>