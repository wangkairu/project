<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'110px'"
        size="mini"
        :maxShow="5"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="所属部门编号">
          <el-input
            size="mini"
            v-model="form.deptCode"
            placeholder="请输入部门编号"
            @change="handelDeptCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            @change="handelStatus"
            size="mini"
            v-model="form.status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            size="mini"
            v-model="form.userName"
            placeholder="请输入名称"
            @change="handeluserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input
            size="mini"
            v-model="form.workNo"
            placeholder="请输入工号"
            @change="handelWorkNo"
          ></el-input>
        </el-form-item>
      </SearchFilter>
    </div>
    <div class="table">
      <div class="enteringButton">
        <!-- <el-button type="primary" @click="searchClick" size="mini"
          >导出Excel</el-button
        > -->
        <el-button type="primary" @click="addClick" size="mini">新增</el-button>
      </div>
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%"
        :data="tableData"
        height="626"
      >
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column fixed prop="shop" label="分厂" width="120">
        </el-table-column>
        <el-table-column fixed prop="shopCode" label="分厂编号" width="120">
        </el-table-column>
        <!-- <el-table-column fixed prop="roleName" label="角色" width="160">
        </el-table-column> -->
        <el-table-column fixed prop="deptName" label="部门名称" width="230">
        </el-table-column>
        <el-table-column fixed prop="workNo" label="工号" width="90">
        </el-table-column>
        <el-table-column fixed prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="userIdentity" label="身份">
          <template slot-scope="scope">
            <span>{{scope.row.sex===1?'普通成员':'上级'}}</span>
          </template> </el-table-column>
        <el-table-column prop="classes" label="班次" width="60">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60"> 
          <template slot-scope="scope">
            <span>{{scope.row.sex===1?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="55"> </el-table-column>
        <el-table-column prop="phone" label="电话" width="130"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="130"> </el-table-column>
        <el-table-column label="状态" width="70">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="handelChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              title=""
              width="80px"
              trigger="click"
              :ref="`popover-${scope.$index}`"
            >
              <el-input show-password type="password" size="mini" v-model="userPass">
                <!-- <svg-icon slot="suffix" icon-class="Eyes-closed" /> -->
              </el-input>
              <el-button
                style="margin-left: 3px; margin-top: 8px"
                size="mini"
                type="primary"
                @click="changeUserRole(scope.row, scope.$index)"
                >确认
              </el-button>
              <el-button
                style="margin-left: 3px; margin-top: 8px"
                size="mini"
                @click="handleUserRoleClose(scope.$index)"
                >取消
              </el-button>
              <el-button
                slot="reference"
                size="mini"
                type="text"
                >修改密码
              </el-button>
            </el-popover>
            <el-button
              type="text"
              class="edit-btn"
              size="mini"
              style="margin-left: 10px"
              @click="editRow(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              class="edit-btn"
              size="mini"
              @click="handelBind(scope.row)"
              >绑定角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item size="mini" label="分厂" prop="workNo">
          <el-select v-model="userForm.shop" placeholder="请选择分厂">
            <el-option
              v-for="item in shop"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNo">
          <el-input
            v-model="userForm.workNo"
            placeholder="请输入工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="userForm.realname"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="登陆账号" prop="username">
          <el-input
            v-model="userForm.username"
            placeholder="请输入登陆账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input
            v-model="userForm.phone"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门编号" prop="deptCode">
          <el-input
            v-model="userForm.deptCode"
            placeholder="请输入所属部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="班次" prop="classes">
          <el-input
            v-model="userForm.classes"
            placeholder="请输入班次"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="userIdentity">
          <el-radio-group v-model="userForm.userIdentity">
            <el-radio label="普通成员"></el-radio>
            <el-radio label="上级"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handelConfirm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="绑定角色" :visible.sync="roleFlag" width="45%">
      <el-table
        @selection-change="handleSelectionChange"
        :data="roleData"
        border
        ref="roleList"
        width="100%"
      >
        <el-table-column type="selection"  width="45"> </el-table-column>
        <el-table-column prop="id" label="ID" width="40"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isEdit"
              v-model="scope.row.roleName"
            ></el-input>
            <div v-else>{{ scope.row.roleName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="备注"> </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 10px;">
        <PageNation
          v-show="roleTotal > 0"
          :total="roleTotal"
          :page.sync="listRoleQuery.pageNum"
          :limit.sync="listRoleQuery.pageSize"
          @pagination="pageChangeRole"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleFlag = false">取 消</el-button>
        <el-button type="primary" @click="bindRole()">确 定</el-button>
      </span>
    </el-dialog>
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
import { queryUserList, changeUserStatus, saveOrUpdateUser,bindRole,editUserPassword,queryRoleList,queryBindRole} from "@/api";
export default {
  name: "modifyClient",
  components: { PageNation, SearchFilter },
  data: function () {
    return {
      userRole: "",
      title: "",
      value1: "",
      userPass: "",
      tableData: [],
      shop:[{ value: 'D',label: "四期",},],
      options: [
        { value: 1,label: "正常",},
        { value: 2,label: "冻结",},
      ],
      form: {
        deptCode: "",
        status: "",
        userName: "",
        workNo: "",
      },
      dialogVisible: false,
      flag: false,
      roleFlag:false,
      request: {},
      userForm: {
        workNo: "",
        phone: "",
        classes: "",
        realname: "",
        userIdentity: "",
        sex: "",
        deptCode: "",
        username: "",
        shop:"",
        shopCode:"D"
      },
      rules: {
        username: [
          { required: true, message: "请输入登陆账号", trigger: "blur" },
        ],
        workNo: [{ required: true, message: "请输入工号", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        classes: [{ required: true, message: "请输入班次", trigger: "blur" }],
        deptCode: [
          { required: true, message: "请输入所属部门编号", trigger: "blur" },
        ],
        userIdentity: [
          { required: true, message: "请输入性别", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
      },
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      roleTotal:0,
      listRoleQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      roleData:[],
      roleIdList:[],
      userId:"",
    };
  },

  methods: {
    handleSelectionChange(select){
      this.roleIdList=select.map((v)=>{
        return v.id
      })
    },
    handleUserRoleClose(){
      this.userPass=''
    },
    async changeUserRole(v){
      const params={
        id: 0,
        password: this.userPass,
        userId: v.id,
      }
      const res = await editUserPassword(params)
      if(res.code=='0'){
        this.userPass=''     
        this.$message.success(res.msg)
        this.queryUserList();
      }else{
        this.$message.error(res.msg)
      }
    },
    async handelBind(row){
      this.roleFlag = true
      this.userId=row.id
      this.queryRoleList()
    },
    async queryBindRole(){
      const res = await queryBindRole(this.userId)
      if(res.code=='0'){
        res.data.forEach((i)=>{
          this.roleData.forEach((v)=>{
            if(i.roleId==v.id){
              this.$nextTick(()=>{
                this.$refs.roleList.toggleRowSelection(v,true)
              })
            }
          })
        })
      }
    },
    async queryRoleList() {
      const res = await queryRoleList({
        page: this.listRoleQuery.pageNum - 1,
        size: this.listRoleQuery.pageSize,
      });
      if (res.code === "0") {
        this.roleData = res.data.items;
        this.roleTotal = res.data.total;
        this.queryBindRole()
      }
    },
    async bindRole(){
      const params={
        id: 0,
        roleIdList: this.roleIdList,
        userId: this.userId,
      }
      const res = await bindRole(params)
      if(res.code === "0"){
        this.roleFlag=false
        this.roleIdList=[]
        this.$message.success(res.msg)
        this.queryUserList();
      }else{
        this.$message.error(res.msg)
      }
    },
    reset() {
      this.form = {};
      this.queryUserList();
    },
    handelDeptCode(val) {
      this.form.deptCode = val;
      this.queryUserList();
    },
    handeluserName(val) {
      this.form.userName = val;
      this.queryUserList();
    },
    handelWorkNo(val) {
      this.form.workNo = val;
      this.queryUserList();
    },
    handelStatus(val) {
      this.form.status = val;
      this.queryUserList();
    },
    // 修改密码
    changeRole() { },
    async handelChange(val) {
      await changeUserStatus(val.id);
    },
    async queryUserList() {
      const params = {
        ...this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryUserList(params);
      if (res.code === '0') {
        this.total = res.data.total;
        this.tableData = res.data.items.map((v) => {
          return {
            ...v,
            status: v.status === 1 ? true : false,
          };
        });
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }

    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryUserList();
    },
    pageChangeRole(val){
      this.listRoleQuery.pageNum = val.page;
      this.listRoleQuery.pageSize = val.limit;
      this.queryRoleList()
    },
    search(payload) {
      //重置当前页数为1
      this.query.page = 1;
      this.query.filter_name = payload.client_name;
    },
    addClick() {
      this.dialogVisible = true;
      this.title = "新增";
    },
    //编辑表格方法
    editRow(rowData) {
      this.dialogVisible = true;
      this.title = "修改";
      this.userForm = {
        ...rowData,
        userIdentity: this.userForm.userIdentity === 1 ? "普通成员" : "上级",
        sex: this.userForm.sex === 1 ? "男" : "女",
      };
    },
    async handelConfirm(formName) {
      if (this.title === "新增") {
        const res = await saveOrUpdateUser({
          ...this.userForm,
          userIdentity: this.userForm.userIdentity === "普通成员" ? 1 : 2,
          sex: this.userForm.sex === "男" ? 1 : 2,
          status: this.userForm.status ? 1 : 2,
        });
        if (res.code === "0") {
          this.queryUserList();
          this.dialogVisible = false;
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      } else {
        const res = await saveOrUpdateUser({
          ...this.userForm,
          userIdentity: this.userForm.userIdentity === "普通成员" ? 1 : 2,
          sex: this.userForm.sex === "男" ? 1 : 2,
          status: this.userForm.status ? 1 : 2,
        });
        if (res.code === "0") {
          this.queryUserList();
          this.dialogVisible = false;
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      }
      this.userForm = {
        workNo: "",
        phone: "",
        classes: "",
        realname: "",
        userIdentity: "",
        sex: "",
        deptCode: "",
        username: "",
      };
    },
    handelCancel() {
      this.dialogVisible = false;
      this.userForm = {};
    },
    // async delRow() {
    //   this.$confirm("此操作将永久删除该客户信息, 是否继续?", "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(async () => {
    //       //确认操作
    //     })
    //     .catch(() => {
    //       //取消操作
    //     });
    // },
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem("data"));
    this.request = {
      deptCode: data.deptCode,
      status: 1,
      userName: data.realname,
      workNo: data.workNo,
    };
    this.queryUserList();
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table-filter {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    // border-radius: 10px
    padding: 15px;
  }
  .table {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    // border-radius: 10px
    padding: 20px;
    overflow: hidden;
    flex: 1;
    .enteringButton {
      padding-bottom: 8px;
    }
  }
  .control {
    box-sizing: border-box;
    display: flex;
    justify-content: right;
    background-color: #fff;
    margin-top: 10px;
    // border-radius: 10px
    padding: 10px;
    overflow: hidden;
  }

  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    // border-radius: 10px
    padding: 6px;
    overflow: hidden;
  }
}

::v-deep .el-form-item {
  margin-bottom: 15px;
}
::v-deep .el-date-editor.el-input {
  width: 182px;
}
</style>