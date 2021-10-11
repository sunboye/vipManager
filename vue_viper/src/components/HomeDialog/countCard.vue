<template>
  <el-col :span="12" type="flex">
    <el-card shadow="never" width="400px" class="dialogcard">
      <!-- <div style="display: flex;justify-content: center;margin-bottom: 24px;color: #909399;">
        <h2>消费详情</h2>
      </div> -->
      <div style="display: flex;justify-content: center;">
        <el-form label-position="left" :model="consumpForm" label-width="80px">
          <el-form-item label="姓名:">
          <el-input v-model="consumpForm.username" :disabled="true" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="消费金额:">
            <el-input class="discount" clearable v-model="consumpForm.consump" @change="consumpChange"
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
          <el-form-item label="实际消费:">
            <span :class="{'money': consumpForm.realConsump!='' && !isNaN(consumpForm.realConsump)}">
                {{ consumpForm.realConsump!='' && !isNaN(consumpForm.realConsump) ? '￥' + consumpForm.realConsump : '--'}}
            </span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {}
</script>
