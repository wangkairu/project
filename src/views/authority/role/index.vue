<template>
  <div class="warpper">
    <div class="table">
      <div class="enteringButton">
        <el-button type="primary" @click="addClick()" size="mini"
          >新增</el-button
        >
      </div>
      <el-table border style="width: 100%" :data="tableData">
        <el-table-column prop="id" label="ID"></el-table-column>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="edit-btn"
              size="mini"
              style="margin-right: 8px"
              @click="roleAuthority(scope.row)"
              >角色权限</el-button
            >
            <el-button
              type="text"
              class="edit-btn"
              size="mini"
              style="margin-right: 8px"
              @click="editRow(scope.row)"
              >编辑</el-button
            >
            <el-button
              slot="reference"
              type="text"
              class="edit-btn"
              size="mini"
              @click="delRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="是否管理员">
          <el-radio-group v-model="ruleForm.isAdmin">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer
      title="角色权限"
      size="45%"
      :visible.sync="dialogVisible_1"
      direction="ltr"
    >
      <div class="btn">
        <el-button type="primary" size="mini" @click="bindingMenu">
          绑定菜单
        </el-button>
        <el-button type="primary" size="mini" @click="saveData_1">
          保存
        </el-button>
      </div>
      <el-table
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%; margin-top: 10px"
        :data="Data"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="menuId" label="#" width="50"> </el-table-column>
        <el-table-column prop="menuTitle" label="菜单名称"> </el-table-column>
        <el-table-column prop="operateList" label="操作">
          <template slot-scope="{ row }">
            <span
              v-for="(operate, operateIndex) in row.operateList"
              :key="operateIndex"
              style="margin-right: 10px"
            >
              <el-checkbox
                v-if="operate.label"
                v-model="operate.isChecked"
                :label="operate.label"
                @change="
                  changeOperateMenu(row.menuId, operate.name, operate.isChecked)
                "
              />
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <el-dialog :visible.sync="dialogVisible_2" width="45%">
      <el-table
        @selection-change="handleSelectionChange_1"
        :data="selectData"
        border
        width="100%"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column prop="id" label="ID" width="40"> </el-table-column>
        <el-table-column prop="title" label="标题" width="120">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="operateList" label="操作">
          <template slot-scope="{ row }">
            <span
              v-for="(operate, operateIndex) in row.operateList"
              :key="operateIndex"
              style="margin-right: 10px"
            >
              <el-checkbox
                v-if="operate.label"
                v-model="operate.isChecked"
                :label="operate.label"
                @change="
                  changeOperateMenu_1(row.id, operate.name, operate.isChecked)
                "
                :disabled="operate.disabled"
              />
            </span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_2 = false">取 消</el-button>
        <el-button type="primary" @click="saveData()">确 定</el-button>
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
import { queryRoleList, saveOrUpdateRole, deleteRole } from "@/api";
import {
  bindMenuToRole,
  sysRoleQueryBindMenus,
  sysRoleQueryUnBindMenus,
} from "@/api/menu";
export default {
  name: "role",
  components: { PageNation },
  data: function () {
    return {
      dialogVisible: false,
      dialogVisible_1: false,
      dialogVisible_2: false,
      tableLoading: false,
      map: new Map(),
      map1: new Map(),
      tableData: [],
      Data: [],
      selectData: [],
      menuIdList: [],
      checkboxGroup1: [],
      menuId: [],
      menuId_1: [],
      roleId: "",
      title: "",
      form: {},
      ruleForm: {
        roleName: "",
        isAdmin: "",
        description: "",
      },
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    handleSelectionChange_1(val) {
      let arr = [];
      val.forEach((v) => {
        v.operateList.forEach((v) => {
          v.disabled = false;
        });
        arr.push({
          menuId: v.id,
          isDelete: v.isDelete,
          isExport: v.isExport,
          isQuery: v.isQuery,
          isUpdate: v.isUpdate,
        });
      });
      this.menuId = [...new Set(arr)];
    },
    handleSelectionChange(val) {
      let arr = [];
      val.forEach((v) => {
        arr.push({
          menuId: v.menuId,
          isDelete: v.isDelete,
          isExport: v.isExport,
          isQuery: v.isQuery,
          isUpdate: v.isUpdate,
        });
      });
      this.menuId_1 = [...new Set(arr)];
    },
    async bindingMenu() {
      this.dialogVisible_2 = true;
      const res = await sysRoleQueryUnBindMenus(this.roleId);
      this.selectData = res.data.map((v) => {
        this.map1.set(v.id, {
          isDelete: v.isDelete,
          isExport: v.isExport,
          isQuery: v.isQuery,
          isUpdate: v.isUpdate,
        });
        return {
          ...v,
          operateList: [
            {
              isChecked: v.isDelete,
              label: "删除",
              name: "isDelete",
              disabled: true,
            },
            {
              isChecked: v.isExport,
              label: "导出",
              name: "isExport",
              disabled: true,
            },
            {
              isChecked: v.isQuery,
              label: "查看",
              name: "isQuery",
              disabled: true,
            },
            {
              isChecked: v.isUpdate,
              label: "编辑",
              name: "isUpdate",
              disabled: true,
            },
          ],
        };
      });
    },
    async sysRoleQueryBindMenus() {
      const res = await sysRoleQueryBindMenus(this.roleId);
      this.Data = res.data.map((v) => {
        this.map.set(v.menuId, {
          isDelete: v.isDelete,
          isExport: v.isExport,
          isQuery: v.isQuery,
          isUpdate: v.isUpdate,
        });
        return {
          ...v,
          operateList: [
            { isChecked: v.isDelete, label: "删除", name: "isDelete" },
            { isChecked: v.isExport, label: "导出", name: "isExport" },
            { isChecked: v.isQuery, label: "查看", name: "isQuery" },
            { isChecked: v.isUpdate, label: "编辑", name: "isUpdate" },
          ],
        };
      });
      if (this.Data && this.Data.length > 0) {
        this.$nextTick(() => {
          if (this.$refs.multipleTable) {
            this.$refs.multipleTable.toggleAllSelection();
          }
        });
      }
    },
    roleAuthority(row) {
      this.roleId = row.id;
      this.dialogVisible_1 = true;
      this.sysRoleQueryBindMenus();
    },
    async saveData() {
      const params = {
        roleId: this.roleId,
        menuIdList: [...this.menuId, ...this.menuId_1],
      };
      const res = await bindMenuToRole(params);
      if (res.code === "0") {
        this.sysRoleQueryBindMenus();
        this.dialogVisible_2 = false;
      }
    },
    async saveData_1() {
      const params = {
        roleId: this.roleId,
        menuIdList: this.menuId_1,
      };
      const res = await bindMenuToRole(params);
      if (res.code === "0") {
        this.dialogVisible_1 = false;
      }
    },
    changeOperateMenu(id, name, isChecked) {
      var that = this;
      that.map.get(id)[name] = isChecked;
      const obj = that.map.get(id);
      this.menuId_1.forEach((v, ind) => {
        if (v.menuId == id) {
          this.menuId_1.splice(ind, 1, { menuId: id, ...obj });
        }
      });
    },
    changeOperateMenu_1(id, name, isChecked) {
      var that = this;
      that.map1.get(id)[name] = isChecked;
      const obj = that.map1.get(id);
      this.menuId.forEach((v, ind) => {
        if (v.menuId == id) {
          this.menuId.splice(ind, 1, { menuId: id, ...obj });
        }
      });
    },
    // 获取角色列表
    async queryRoleList() {
      const res = await queryRoleList({
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      });
      if (res.code === "0") {
        this.tableData = res.data.items;
        this.total = res.data.total;
      }
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryRoleList();
    },
    addClick() {
      this.dialogVisible = true;
      this.title = "新增";
    },
    //编辑表格方法
    editRow(rowData) {
      this.dialogVisible = true;
      this.title = "修改";
      this.ruleForm = {
        ...rowData,
        isAdmin: rowData.isAdmin === 1 ? "是" : "否",
      };
    },
    async handelConfirm() {
      let res = null;
      if (this.title === "新增") {
        res = await saveOrUpdateRole({
          ...this.ruleForm,
          isAdmin: this.ruleForm.isAdmin === "是" ? 1 : 0,
        });
      } else {
        res = await saveOrUpdateRole({
          ...this.ruleForm,
          isAdmin: this.ruleForm.isAdmin === "是" ? 1 : 0,
        });
      }
      if (res.code === "0") {
        this.ruleForm = {};
        this.queryRoleList();
        this.dialogVisible = false;
      }
    },
    handelCancel() {
      this.dialogVisible = false;
      this.userForm = {};
    },
    // 删除
    async delRow(rowData) {
      this.roleId = rowData.id;
      this.$confirm("此操作将永久删除,是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认操作
          const res = await deleteRole({ roleId: this.roleId });
          if (res.code === "0") {
            this.queryRoleList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          //取消操作
        });
    },
    authorityDistribution() {
      this.$router.push("/authority/rolePermission");
    },
  },
  mounted() {
    this.queryRoleList();
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 15px;
  }
  .table {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    padding: 20px;
    // position: relative;
    overflow: hidden;
    flex: 1;
    .enteringButton {
      margin-bottom: 10px;
      padding: 8px 0;
      // position: absolute;
    }
  }
  .control {
    box-sizing: border-box;
    display: flex;
    justify-content: right;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
    overflow: hidden;
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    padding: 6px;
    overflow: hidden;
  }
}
::v-deep .el-drawer__body {
  padding: 0 16px;
}
</style>