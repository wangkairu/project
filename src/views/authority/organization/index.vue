<template>
  <div>
    <div class="table">
      <div class="enteringButton">
        <el-button icon="el-icon-upload2" type="primary" size="mini"
          >导出</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addClick"
          size="mini"
          >新增</el-button
        >
      </div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="#" width="40"> </el-table-column>
        <el-table-column prop="departName" label="机构/部门名称">
        </el-table-column>
        <el-table-column prop="departNameEn" label="英文名"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="deleteDept(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="deptForm"
        :rules="rules"
        ref="deptForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="机构/部门名称" prop="departName">
          <el-input v-model="deptForm.departName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="deptForm.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="不启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="deptForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelConfirm()">确 定</el-button>
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
import {
  queryDeptList,
  queryDeptTree,
  saveOrUpdateDept,
  deleteDept,
} from "@/api";
export default {
  components: { PageNation },
  data() {
    return {
      tableData: [],
      title: "",
      dialogVisible: false,
      deptForm: {
        address: "",
        departName: "",
        remark: "",
        status: "",
      },
      rules: {
        departName: [
          { required: true, message: "机构/部门名称不能为空", trigger: "blur" },
        ],
      },
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.queryDeptList();
  },
  methods: {
    async queryDeptList() {
      const res = await queryDeptList({
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      });
      this.tableData = res.data.items;
      this.total = res.data.total;
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryDeptList();
    },
    async deleteDept(row) {
      // const res=await deleteDept()
      this.$confirm("此操作将永久删除,是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认操作
          const res = await deleteDept({ deptId: row.id });
          if (res.code === "0") {
            this.queryDeptList();
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
    addClick() {
      this.dialogVisible = true;
      this.title = "新增";
    },
    //编辑表格方法
    handleEdit(rowData) {
      this.dialogVisible = true;
      this.title = "修改";
      this.deptForm = {
        ...rowData,
        status: rowData.status === 1 ? "启用" : "不启用",
      };
    },
    async handelConfirm() {
      if (this.title === "新增") {
        const res = await saveOrUpdateDept({
          ...this.deptForm,
          status: this.deptForm.status === 1 ? "启用" : "不启用",
        });
        if (res.code === "0") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
      } else {
        const res = await saveOrUpdateDept({
          ...this.deptForm,
          status: this.deptForm.status === "启用" ? 1 : 0,
        });
        if (res.code === "0") {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
        }
      }
      this.deptForm = {};
      this.queryDeptList();
      this.dialogVisible = false;
    },
  },
};
</script>


<style lang="sass" scoped>
.warpper
  display: flex
  flex-direction: column
  justify-content: space-between
.table-filter
  box-sizing: border-box
  background-color: #fff
    // border-radius: 10px
  padding: 15px

.table
  box-sizing: border-box
  background-color: #fff
  margin-top: 10px
    // border-radius: 10px
  padding: 20px
  overflow: hidden
  flex: 1
.enteringButton
  padding-bottom: 8px

.control
  box-sizing: border-box
  display: flex
  justify-content: right
  background-color: #fff
  margin-top: 10px
    // border-radius: 10px
  padding: 10px
  overflow: hidden

.pagenation
  box-sizing: border-box
  display: flex
  justify-content: center
  background-color: #fff
  margin-top: 10px
    // border-radius: 10px
  padding: 6px
  overflow: hidden
</style>