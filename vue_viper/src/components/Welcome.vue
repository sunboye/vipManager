<template>
<div class="welcompage">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-card shadow="never">
      <div>
        <el-row :gutter="20" type="flex" style="justify-content: center;margin: 80px 90px 90px 90px;">
          <el-button type="danger" @click="consumpVisible=true">会员消费</el-button>
          <div style="width: 5%"></div>
          <el-button type="danger"  @click="rechargeVisible=true">会员充值</el-button>
        </el-row>
        <el-row :gutter="20" type="flex" style="margin-top:20px;">
          <el-table :data="tableData" border style="width: 100%" tooltip-effect="light">
            <el-table-column label="消费者" prop="name" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="消费类型" prop="op_type" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="金额" prop="money" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="账户余额" prop="balance" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="消费时间" prop="op_time" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.op_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作结果" prop="op_result" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="20" type="flex" style="margin-top:20px;">
          <el-pagination
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </el-row>
      </div>
    </el-card>
    <el-dialog
        title="会员消费"
        :visible.sync="consumpVisible"
        v-if="consumpVisible"
        width="1200px"
        :before-close="handleClose">
        <count-dialog ref="countForm"></count-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="countConfirm">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="会员充值"
        :visible.sync="rechargeVisible"
        v-if="rechargeVisible"
        width="1200px"
        :before-close="handleClose">
        <recharge-dialog ref="rechargeForm"></recharge-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="rechargeConfirm">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import CountDialog from './HomeDialog/countDialog.vue'
import RechargeDialog from './HomeDialog/rechargeDialog.vue'
let vm = {}
export default {
  components: {
    CountDialog,
    RechargeDialog
  },
  data () {
    return {
      tableData: [],
      searchValue: '',
      isLoading: true,
      pagination: {
          pageSize: 10,
          total: 0,
          pageSizes: [10, 20, 50],
          currentPage: 1
      },
      rechargeVisible: false,
      consumpVisible: false,
      consumpForm: {
        consump: '',
        discount: 1,
        endBalance: ''
      },
      discountList: [
        {
          value: 1,
          label: '没有优惠哦'
        },
        {
          value: 0.99,
          label: '99折'
        },
        {
          value: 0.98,
          label: '98折'
        },
        {
          value: 0.95,
          label: '95折'
        },
        {
          value: 0.9,
          label: '9折'
        },
      ]
    }
  },
  created () {
    vm = this;
    vm.getLogList();
  },
  filters: {
    filterStatus: (val) => {
      if (val !== null && val !== undefined && !isNaN(val)) {
        return vm.statusList[val]
      }
      return '--'
    },
    filterSex: (val) => {
      if (val !== null && val !== undefined && !isNaN(val)) {
        return vm.sexList[val]
      }
      return '--'
    }
  },
  methods: {
    getLogList (isSearch) {
      this.isLoading = true;
      const params = {
          query: this.searchValue || '',
          current: !isSearch ? this.pagination.currentPage : 1,
          size: this.pagination.pageSize
      }
      this.$axios.get('/logs', {params}).then((res) => {
        if (res.success) {
          const dataTemp = res.data && res.data.records && res.data.records.length ? res.data.records : [];
          this.pagination.total = res.data.total;
          this.pagination.currentPage = res.data.current;
          this.radio = dataTemp.length ? dataTemp[0].id : null
          this.tableData = dataTemp;
        }
      }).finally(() => {
        this.isLoading = false;
      });
    },
    handleClose () {
      this.consumpVisible = false;
      this.rechargeVisible = false;
      // this.$refs.userForm.resetFields();
    },
    countConfirm () {
      const refForm = this.$refs.countForm;
      refForm.$refs.consumpForm.validate((valid) => {
        if (valid) {
          const formData = refForm.consumpForm;
          const viperData = refForm.radioData;
          if (formData.endBalance > 0) {
            const params = {
              vvid: viperData.id,
              opType: 1,
              money: formData.realConsump
            }
            this.$axios.post('/vipers/oprate', params).then((res) => {
              if (res.success) {
                this.getLogList();
                this.consumpVisible = false;
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$message.error('客户余额不足，请充值后再试');
          }
        }
      });
    },
    rechargeConfirm () {
      const refForm = this.$refs.rechargeForm;
      refForm.$refs.consumpForm.validate((valida) => {
        if (valida) {
          const formData = refForm.consumpForm;
          const viperData = refForm.radioData;
          if (formData.realConsump > 0) {
            const params = {
              vvid: viperData.id,
              opType: 2,
              money: formData.realConsump
            }
            this.$axios.post('/vipers/oprate', params).then((res) => {
              if (res.success) {
                this.getLogList();
                this.rechargeVisible = false;
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$message.error('充值金额不能小于零');
          }
        }
      });
    },
    handleSizeChange (size) {
      this.pagination.pageSize = !!size ? size : this.pagination.pageSize[0];
      this.getLogList();
    },
    handleCurrentChange (curpage) {
      this.pagination.currentPage = !!curpage ? curpage : 1;
      this.getLogList();
    }
  }
}
</script>

<style scope>
.welcompage .el-card {
  margin-top: 0px;
  height: auto;
}
.input-with-select {
  width: 500px;
}
#adduser {
  margin-left: 20px;
}
.opreate {
  display: flex;
  justify-content: center;
}
.demo-table-expand {
  font-size: 0;
  padding-left: 48px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
.dialogcard {
  margin-top: 0;
}
.money {
  color: #F56C6C;
}
.dialogcard .el-form-item {
  margin-bottom: 10px;
}
.discount input {
  color: #F56C6C;
}
.nodiscount input {
  color: #C0C4CC;
}
</style>
