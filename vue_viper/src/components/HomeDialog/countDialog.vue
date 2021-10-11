<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row style="margin-bottom: 12px; width: 550px">
          <el-input placeholder="请输入用户名或电话号码搜索" class="input-with-select" v-model.trim="searchValue"  @keyup.enter.native="getUserList(true)"
                  :clearable="true" @clear="getUserList(true)" style="float: right">
            <el-button type="info" slot="append" icon="el-icon-search" @click="getUserList(true)"></el-button>
          </el-input>
        </el-row>
        <el-row>
          <el-table :data="tableData" stripe border style="width: 550px" tooltip-effect="light" v-loading="isLoading">
            <el-table-column width="45px">
              <template slot-scope="props">
                <el-radio v-model="radio" :label="props.row.id" @change.native="getCurrentRow(props.row)">{{&nbsp;}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="124px" show-overflow-tooltip>
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.leval === 4" type="danger" size="mini">钻石</el-tag>
                  <el-tag v-if="scope.row.leval === 3" type="info" size="mini">白金</el-tag>
                  <el-tag v-if="scope.row.leval === 2" type="warning" size="mini">黄金</el-tag>
                  <el-tag v-if="scope.row.leval === 1" type="success" size="mini">白银</el-tag>
                  {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="50px">
              <template slot-scope="scope">
                <span>{{scope.row.sex | filterSex}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="telephone" label="电话号码" width="150px" show-overflow-tooltip></el-table-column>
            <el-table-column label="状态" width="80px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.status | filterStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column label="余额" width="100px">
              <template slot-scope="scope">
                <span style="color: #F56C6C;">￥{{scope.row.balance}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row type="flex" style="margin-top:20px;">
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
      </el-col>
      <el-col :span="12" type="flex">
        <el-card shadow="never" width="400px" class="dialogcard">
          <!-- <div style="display: flex;justify-content: center;margin-bottom: 24px;color: #909399;">
            <h2>消费详情</h2>
          </div> -->
          <div style="display: flex;justify-content: center;">
            <el-form label-position="left"  ref="consumpForm" :rules="consumpRules" :model="consumpForm" label-width="80px">
              <el-form-item label="姓名:">
              <el-input v-model="consumpForm.username" :disabled="true" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item label="消费金额:">
                <el-input class="discount" clearable v-model.number="consumpForm.consump" @change="consumpChange"
                  @blur="consumpChange" @keyup.native.enter="consumpChange"
                  @focus="consumpChange" @clear="consumpChange">
                  <i slot="prefix" style="font-style:normal;margin-right: 10px;">￥</i>
                  </el-input>
              </el-form-item>
              <el-form-item label="优惠福利:">
                <el-select v-model="consumpForm.discount" @change="consumpChange" placeholder="暂时没有优惠活动哦" :class="{'discount': consumpForm.discount!==1, 'nodiscount': consumpForm.discount===1}">
                  <el-option
                    v-for="item in discountList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="电话:">
                <el-input v-model="consumpForm.telephone" :disabled="true" suffix-icon="el-icon-phone-outline"></el-input>
              </el-form-item> -->
              <el-form-item label="当前余额:">
                <span class="money">{{ consumpForm.balance!='' && !isNaN(consumpForm.balance) ? '￥' + consumpForm.balance : '--'}}</span>
              </el-form-item>
              <el-form-item label="结算余额:">
                <span :class="{'money': consumpForm.endBalance!='' && !isNaN(consumpForm.endBalance)}">
                  {{ consumpForm.endBalance!='' && !isNaN(consumpForm.endBalance) ? '￥' + consumpForm.endBalance : '--'}}
                </span>
              </el-form-item>
              <el-form-item label="实际消费:" style="font-weight: bold;">
                <span :class="{'money': consumpForm.realConsump!='' && !isNaN(consumpForm.realConsump)}" style="font-size: 18px !important">
                    {{ consumpForm.realConsump!='' && !isNaN(consumpForm.realConsump) ? '￥' + consumpForm.realConsump : '--'}}
                </span>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import CountCard from './countCard.vue'
import { cloneDeep } from 'lodash'
let vm = {};
export default {
  name: 'CountDialog',
  data () {
    return {
      tableData: [],
      searchValue: '',
      radio: '1',
      radioData: {},
      isLoading: true,
      pagination: {
          pageSize: 5,
          total: 0,
          pageSizes: [5, 10, 20, 50],
          currentPage: 1
      },
      consumpVisible: false,
      consumpForm: {
        balance: 0,
        consump: '',
        discount: 1,
        endBalance: 0
      },
      consumpRules: {
        consump: [
            { required: true, message: '请输入消费金额', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 位数字', trigger: 'blur' }
          ]
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
        }
      ],
      statusList: {
        0: '已删除',
        1: '已激活',
        2: '已冻结'
      },
      sexList: {
        1: '男',
        2: '女'
      }
    }
  },
  created () {
    vm = this;
    vm.getUserList();
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
    getUserList (isSearch) {
      this.isLoading = true;
      var params = {
          query: this.searchValue || '',
          pagenum: !isSearch ? this.pagination.currentPage : 1,
          pagesize: this.pagination.pageSize
      }
      this.$axios.get('vipers', {params}).then((res) => {
          this.isLoading = false;
          var data = res.data;
          this.pagination.total = data.total;
          this.tableData = data.data;
          this.getCurrentRow(this.tableData[0])
          this.radio = this.tableData[0].id;
      });
    },
    getCurrentRow (row) {
      console.log(row)
      // && row.status === 1
      if (row && Object.keys(row).length > 0) {
        this.radioData = cloneDeep(row);
        this.consumpForm.username = this.radioData.name;
        this.consumpForm.balance = parseFloat(parseFloat(this.radioData.balance).toFixed(2));
        this.consumpChange();
      } else {
        this.$confirm('用户数据异常，请检查该用户数据!');
      }
    },
    consumpChange () {
      if (this.consumpForm.consump && !isNaN(this.consumpForm.consump)) {
        this.consumpForm.realConsump = parseFloat(parseFloat(this.consumpForm.discount * this.consumpForm.consump).toFixed(2));
        this.consumpForm.endBalance = parseFloat(parseFloat(this.radioData.balance - this.consumpForm.realConsump).toFixed(2));
      } else {
        this.consumpForm.realConsump = '';
        this.consumpForm.endBalance = '';
      }
    },
    handleSizeChange (size) {
      this.pagination.pageSize = !!size ? size : this.pagination.pageSize[0];
      this.getUserList();
    },
    handleCurrentChange (curpage) {
      this.pagination.currentPage = !!curpage ? curpage : 1;
      this.getUserList();
    }
  }
}
</script>