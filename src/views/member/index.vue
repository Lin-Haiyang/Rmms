<template>
  <div>
    <!-- 搜索框 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="headFrom"
      class="demo-form-inline"
      style="margin: 15px 20px 0 20px"
    >
      <el-form-item prop="cardNum">
        <el-input v-model="headFrom.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="headFrom.name" placeholder="会员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="headFrom.payType" placeholder="支付类型">
          <el-option
            v-for="item in payTypeList"
            :key="item.type"
            :value="item.type"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-form-item prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="headFrom.birthday"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData" class="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleAdd('addForm')" class="el-icon-edit">新增</el-button>
        <el-button type="danger" @click="resetForm('searchForm')" class="el-icon-delete">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增弹窗 -->
    <el-dialog width="500px" title="会员新增" :visible.sync="dialogFormVisible">
      <el-form
        :rules="rules"
        :model="addForm"
        label-position="right"
        label-width="100px"
        ref="addForm"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="addForm.cardNum" placeholder="会员卡号"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addForm.name" placeholder="会员姓名"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="addForm.birthday"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addForm.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="addForm.money" placeholder="开卡金额"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="addForm.payType" placeholder="支付类型">
            <el-option
              v-for="item in payTypeList"
              :key="item.type"
              :value="item.type"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input
            v-model="addForm.address"
            placeholder="请输入地址"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            addForm.id == null ? addData('addForm') : upDataById('addForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 主体显示区域 -->
    <el-table stripe :data="memberList" height="400px" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column width="100" prop="name" label="会员姓名"></el-table-column>
      <el-table-column width="150" prop="birthday" label="会员生日"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
       width="150"
      ></el-table-column>
      <el-table-column width="80" prop="integral" label="可用积分"></el-table-column>
      <el-table-column width="80" prop="money" label="开卡金额"></el-table-column>
      <el-table-column width="80" prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>
            {{ scope.row.payType | payTypeFilter }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="会员地址"
        width="220"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      style="margin: 10px 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
const payTypeList = [
  { type: 1, name: "现金" },
  { type: 2, name: "微信" },
  { type: 3, name: "支付宝" },
  { type: 4, name: "银行卡" },
];
import memberApi from "@/api/member";
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      searchMap: {},
      memberList: [],
      headFrom: {
        cardNum: null,
        name: "",
        birthday: null,
        payType: null,
      },
      addForm: {
        id: null,
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: null,
        integral: 0,
        payType: "",
        address: "",
      },
      payTypeList,
      addMember: {},
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
      },
    };
  },
  created() {
    this.updateData();
  },
  filters: {
    payTypeFilter(type) {
      const obj = payTypeList.find((item) => item.type == type);
      return obj ? obj.name : null;
    },
  },
  methods: {
    // 显示弹窗
    handleAdd(formName) {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.resetForm(formName);
      });
    },
    // 会员更新
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          memberApi.addMember(this.addForm).then((res) => {
            if (res.data.flag) {
              this.$message({
                message: "新增会员成功",
                type: "success",
              });
              this.dialogFormVisible = false;
              
            } else {
              this.$message({
                message: "新增会员失败",
                type: "error",
              });
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updateData() {
      memberApi
        .getMemberPageList(this.currentPage, this.pageSize)
        .then((res) => {
          const resp = res.data;
          this.memberList = resp.data.rows;
          this.total = resp.data.total;
        });
      // memberApi.getMemberList().then((res) => {
      //   // console.log(res.data.data);
      //   this.memberList = res.data.data;
      // });
    },
    handleEdit(id) {
      memberApi.getById(id).then((res) => {
        const resp = res.data;
        this.addForm = resp.data;
      });
      this.handleAdd("addForm");
    },
    upDataById(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          memberApi.changeMember(this.addForm).then((res) => {
            if (res.data.flag) {
              this.$message({
                message: "修改会员成功",
                type: "success",
              });
              this.dialogFormVisible = false;
          
              this.addForm.id = null;
        
            } else {
              this.$message({
                message: "修改会员失败",
                type: "error",
              });
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该会员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          memberApi.deleteById(id).then((res) => {
            if (res.data.flag) {
              this.$message({
                message: res.data.message,
                type: "success",
              });
              this.updateData();
            } else {
              this.$message({
                message: res.data.message,
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.updateData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.updateData();
    },
  },
};
</script>