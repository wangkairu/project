<template>
  <div class="warpper">
    <div class="table">
      <div class="enteringButton">
        <el-button type="primary" @click="handelCreateFatherNode" size="mini"
          >创建一级文件夹</el-button
        >
        <el-button type="primary" @click="handelCreateChildrenNode" size="mini"
          >创建二级文件夹</el-button
        >
        <el-button type="primary" @click="handelCreateChildNode" size="mini"
          >创建三级文件夹</el-button
        >
      </div>
      <div class="box">
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          class="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <span class="button">
                <el-button type="text" @click="() => handelEdit(data)">
                  编辑
                </el-button>
                <el-button type="text" @click="() => handleNodeClick(data)">
                  查看
                </el-button>
                <el-button type="text" @click="queryUsableMenus(data)">
                  绑定菜单
                </el-button>
                <el-button type="text" @click="() => remove(node, data)">
                  删除
                </el-button>
              </span>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-dialog title="查看绑定菜单" :visible.sync="flag" width="50%">
      <div class="table_list">
        <el-table
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          ref="multipleTable"
          width="100%"
        >
          <el-table-column type="selection" width="44"> </el-table-column>
          <el-table-column prop="id" label="#" width="40"> </el-table-column>
          <el-table-column prop="menuCode" label="菜单编号" width="95">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="120">
          </el-table-column>
          <el-table-column prop="path" label="路径"> </el-table-column>
          <el-table-column prop="layer" label="层级" width="50">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelMenuCancel">取 消</el-button>
        <el-button type="primary" @click="handelMenuConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :before-close="handleClose_1"
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="菜单名称" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input
            v-model="ruleForm.sort"
            placeholder="请输入排序数字"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="title === '创建二级文件夹' || title === '创建三级文件夹'"
          label="上级目录"
          prop="rootValue"
        >
          <el-select
            v-model="ruleForm.rootValue"
            placeholder="请选择上级目录"
            @change="handelChange"
          >
            <el-option
              v-for="v in root"
              :label="v.title"
              :value="v.id"
              :key="v.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handelConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择菜单" :visible.sync="dialogVisible_1" width="50%">
      <el-table
        @selection-change="handleSelectionChange_1"
        :data="selectData"
        border
        ref="multipleTable_1"
        width="100%"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column prop="id" label="#" width="40"> </el-table-column>
        <el-table-column prop="menuCode" label="菜单编号" width="95">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="120">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="layer" label="层级" width="50">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel_1">取 消</el-button>
        <el-button type="primary" @click="handelConfirm_1">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :before-close="handleClose"
      :title="name"
      :visible.sync="dialogVisible_Edit"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="菜单名称" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input
            v-model="ruleForm.sort"
            placeholder="请输入排序数字"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="name === '修改二级文件夹' || name === '修改三级文件夹'"
          label="上级目录"
          prop="rootValue"
        >
          <el-select
            v-model="ruleForm.rootValue"
            placeholder="请选择上级目录"
            @change="handelChange"
          >
            <el-option
              v-for="v in root"
              :label="v.title"
              :value="v.id"
              :key="v.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handelEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryFolderLayerList,
  saveOrUpdateMenuFolder,
  deleteFolder,
  queryBindMenus,
  queryUsableMenus,
  bindMenuToFolder,
  cancelBindMenu,
} from "@/api/menu";

export default {
  data() {
    const data = [];
    return {
      title: "",
      name: "",
      dialogVisible: false,
      dialogVisible_1: false,
      dialogVisible_Edit: false,
      flag: false,
      data: JSON.parse(JSON.stringify(data)),
      tableData: [],
      selectData: [],
      root: [],
      fatherNode: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      layer: 1,
      parentId: "",
      ruleForm: {
        title: "",
        rootValue: "",
        sort: "",
        fatherNodeValue: "",
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序数字", trigger: "blur" }],
        rootValue: [{ required: true, message: "请选择上级目录", trigger: "blur" }],
      },
      parentId: "",
      loading: true,
      menuIdList: [],
      menuIdList_1: [],
    };
  },
  mounted() {
    this.queryFolderLayerList();
  },
  methods: {
    async queryUsableMenus(data) {
      this.parentId = data.id;
      const res = await queryUsableMenus();
      if (res.code === "0") {
        this.selectData = res.data;
        this.dialogVisible_1 = true;
      }
    },
    handleClose_1() {
      this.dialogVisible = false;
      this.ruleForm = {
        title: "",
        rootValue: "",
        sort: "",
        fatherNodeValue: "",
      };
    },
    handleClose() {
      this.dialogVisible_Edit = false;
      this.ruleForm = {
        title: "",
        rootValue: "",
        sort: "",
        fatherNodeValue: "",
      };
    },
    handleSelectionChange_1(val) {
      let arr = [];
      val.forEach((v) => {
        arr.push(v.id);
      });
      this.menuIdList = [...new Set(arr)];
    },
    async handleSelectionChange(val) {
      let arr = [];
      val.forEach((v) => {
        arr.push(v.id);
      });
      this.menuIdList_1 = [...new Set(arr)];
    },

    async handelConfirm_1() {
      const res = await bindMenuToFolder({
        menuIdList: this.menuIdList,
        parentId: this.parentId,
      });
      if (res.code === "0") {
        this.dialogVisible_1 = false;
        this.$refs.multipleTable_1.clearSelection();
        this.menuIdList = [];
        this.queryBindMenus();
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
    },
    handelCancel_1() {
      this.dialogVisible_1 = false;
      this.menuIdList = [];
      this.$refs.multipleTable_1.clearSelection();
    },
    async queryBindMenus() {
      const res = await queryBindMenus(this.parentId);
      if (res.code === "0") {
        this.tableData = res.data;
        this.$nextTick(() => {
          this.$refs.multipleTable.toggleAllSelection();
        });
      }
    },

    handleNodeClick(data) {
      this.parentId = data.id;
      this.queryBindMenus();
      this.flag = true;
    },
    async queryFolderLayerList() {
      const res = await queryFolderLayerList({ enableTree: true });
      if (res.code === "0") {
        this.loading = false;
        this.data = res.data;
      }
    },
    handelChange(e) {
      this.parentId = e;
    },
    handelCreateFatherNode() {
      this.dialogVisible = true;
      this.title = "创建一级文件夹";
    },
    async queryFolderLayerList_1() {
      const res = await queryFolderLayerList({ layer: this.layer });
      this.root = res.data;
    },
    handelCreateChildrenNode() {
      this.dialogVisible = true;
      this.title = "创建二级文件夹";
      this.queryFolderLayerList_1();
    },
    async handelCreateChildNode() {
      this.dialogVisible = true;
      this.title = "创建三级文件夹";
      this.layer = 2;
      this.queryFolderLayerList_1();
    },
    handelConfirm() {
      switch (this.title) {
        case "创建一级文件夹":
          this.layer = 1;
          this.saveOrUpdateMenuFolder();
          break;
        case "创建二级文件夹":
          this.layer = 2;
          this.saveOrUpdateMenuFolder();
          break;
        case "创建三级文件夹":
          this.layer = 3;
          this.saveOrUpdateMenuFolder();
          break;
      }
    },
    async saveOrUpdateMenuFolder() {
      const res = await saveOrUpdateMenuFolder({
        ...this.ruleForm,
        layer: this.layer,
        parentId: this.parentId,
      });
      if (res.code == "0") {
        this.queryFolderLayerList();
        this.ruleForm = {};
        this.dialogVisible = false;
        this.dialogVisible_Edit = false;
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'eroor',
          duration: 1000
        })
      }
    },
    async handelMenuCancel() {
      this.flag = false;
    },
    async handelMenuConfirm() {
      const params = {
        menuIdList: this.menuIdList_1,
        parentId: this.parentId
      }
      const res = await bindMenuToFolder(params)
      if (res.code === "0") {
        this.flag = false;
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
    },
    handelCancel() {
      this.dialogVisible = false;
      this.dialogVisible_Edit = false;
      this.ruleForm = {};
    },
    handelCnacel_1() {
      this.dialogVisible_1 = false;
    },
    handelEdit(data) {
      this.dialogVisible_Edit = true;
      if (data.layer === 1) {
        this.name = "修改一级文件夹";
      } else if (data.layer === 2) {
        this.name = "修改二级文件夹";
        this.layer=1
        this.queryFolderLayerList_1();
      } else {
        this.name = "修改三级文件夹";
        this.layer=2
        this.queryFolderLayerList_1();
      }
      this.ruleForm = {
        ...data,
        rootValue:data.parentId
      };
    },
    handelEditConfirm() {
      switch (this.name) {
        case "修改一级文件夹":
          this.layer = 1;
          this.saveOrUpdateMenuFolder();
          break;
        case "修改二级文件夹":
          this.layer = 2;
          this.saveOrUpdateMenuFolder();
          break;
        case "修改三级文件夹":
          this.layer = 3;
          this.saveOrUpdateMenuFolder();
          break;
      }
    },
    async remove(node, data) {
      this.$confirm("确定要取消吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await deleteFolder({ folderId: data.id });
        if (res.code === "0") {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.queryFolderLayerList();
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  width: 100%;
  .table {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    padding: 20px;
    .enteringButton {
      margin-bottom: 10px;
      padding: 8px 0;
    }
    .box {
      width: 100%;
      display: flex;

      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 17px;
      }
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
    padding: 12px;
    overflow: hidden;
  }
}

::v-deep .el-tree-node {
  position: relative;
  padding-left: 16px;
}
::v-deep .el-tree-node__content {
  margin-top: 10px;
}
::v-deep .el-tree-node__children {
  padding-left: 16px;
}

::v-deep .el-tree-node__children .el-tree-node::before {
  content: "";
  height: 100%;
  width: 1px;
  position: absolute;
  left: -3px;
  top: -22px;
  border-width: 1px;
  border-left: 1px dashed #52627c;
}

.tree ::v-deep .el-tree-node:last-child::before {
  height: 38px;
}

::v-deep .el-tree-node__children .el-tree-node::after {
  content: "";
  width: 30px;
  height: 20px;
  position: absolute;
  left: 0px;
  top: 15px;
  border-width: 1px;
  border-top: 1px dashed #52627c;
}

.tree > .el-tree-node::after {
  border-top: none;
}
.tree > .el-tree-node::before {
  border-left: none;
}

.tree ::v-deep .el-tree-node__expand-icon {
  font-size: 16px;
  &.is-leaf {
    color: transparent;
    // display: none;
  }
}
::v-deep .el-tree {
  width: 100%;
}
::v-deep .el-tree-node__content {
  margin-top: 12px;
  display: flex;
}
::v-deep .el-button--text {
  font-size: 15px;
}
</style>