<!--
 * @Author: @yzcheng
 * @Date: 2022-05-18 13:37:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 班级 新增编辑
 * @LastEditTime: 2022-08-27 19:56:16
-->
<template>
  <el-dialog
    width="30%"
    v-model="dialogVisible"
    :title="dictionary[type]"
    @close="handleAddUpdCancel"
  >
    <div class="dept-editor">
      <div class="wrap-box">
        <el-form ref="ruleFormRef" :model="formState" :rules="rules">
          <el-row>
            <el-col :span="24">
              <el-form-item label="班级名称" prop="name">
                <el-input
                  :disabled="isDisabled"
                  v-model="formState.name"
                  placeholder="请输入班级名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="年级名称" prop="grade">
                <el-input
                  :disabled="isDisabled"
                  v-model="formState.grade"
                  placeholder="请输入年级名称"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="con-bottom">
        <el-button type="primary" @click.prevent="onSubmit(ruleFormRef)"
          >提交</el-button
        >
        <el-button
          type="primary"
          ghost
          style="margin-left: 10px"
          @click="resetForm(ruleFormRef)"
          >重置</el-button
        >
        <el-button ghost style="margin-left: 10px" @click="handleAddUpdCancel"
          >返回</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  reactive,
  toRaw,
  computed,
  defineProps,
  getCurrentInstance
} from "vue";
import type { responseData } from "/#/index";
import { updateClassList, findClassDetailed, addClassList } from "./services";
import { message } from "@pureadmin/components";
import type { FormInstance, FormRules } from "element-plus";
const ruleFormRef = ref<FormInstance>();
const { ctx }: any = getCurrentInstance();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ""
  },
  id: {
    type: String,
    default: ""
  },
  onUpdate: {
    type: Function,
    default: () => () => {}
  }
});
const dictionary = {
  add: "班级添加",
  update: "班级更新"
};
const dialogVisible = computed({
  get: () => props.visible,
  set: val => ctx.$emit("update:visible", val)
});
const handleAddUpdCancel = () => {
  ctx.$emit("update:visible", false);
};
const taskJobVisible = ref(1);
// 表单数据
const formState = reactive({
  name: "",
  grade: ""
});
// 校验
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      trigger: "change",
      message: "班级是必传项"
    }
  ],
  grade: [
    {
      required: true,
      trigger: "change",
      message: "年级是必传项"
    }
  ]
});

// 表单
// 重置
const resetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 新增
const insertRegulatory = async (data: any) => {
  const res: responseData = await addClassList(data);
  if (res.code === 0) {
    await props.onUpdate();
    handleAddUpdCancel();
    message.success("新增成功");
  } else {
    message.error(res.message);
  }
};
// 修改
const updateRegulatory = async (data: any) => {
  const res: responseData = await updateClassList(data);
  if (res.code === 0) {
    await props.onUpdate();
    handleAddUpdCancel();
    message.success("更新成功");
  } else {
    message.error(res.message);
  }
};
// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = toRaw(formState);
      if (props.type !== "add") {
        updateRegulatory(data);
      } else {
        insertRegulatory(data);
      }
    }
  });
};
const isShowBtn = ref(true);
const isDisabled = ref(false);

onMounted(async () => {
    const { type, id } = props;
    console.log('id :>> ', id);
  if (["edit"].includes(type)) {
    const res = await findClassDetailed(id);
    if (res.code === 0) {
    // formState.id = id;
    // Object.entries(res.data).forEach(([key]) => {
    //   formState[key] = res.data[key];
    // });
    }
  }
});
</script>

<style scoped lang="scss">
.dept-editor {
  width: 100%;
  height: 100%;
  max-height: 650px;
  color: #ffffff;
  border-radius: 6px;
  position: relative;
  .wrap-box {
    height: calc(100% - 52px);
    max-height: 598px;
    overflow: auto;
    padding: 25px;
    .con-top-title {
      font-size: 14px;
      color: #ffffff;
      margin-bottom: 20px;
      span {
        display: inline-block;
        width: 4px;
        height: 28px;
        background: #1890ff;
        margin-right: 8px;
        vertical-align: text-bottom;
      }
    }
  }
  .con-bottom {
    height: 52px;
    line-height: 50px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    text-align: right;
    padding-right: 25px;
  }
}
</style>
