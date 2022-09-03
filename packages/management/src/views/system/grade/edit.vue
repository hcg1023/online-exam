<!--
 * @Author: @yzcheng
 * @Date: 2022-05-18 13:37:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 年级 新增编辑
 * @LastEditTime: 2022-09-03 23:53:22
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
        <el-form
          label-width="100px"
          ref="ruleFormRef"
          :model="formState"
          :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="年级名称" prop="title">
                <el-input
                  v-model="formState.title"
                  placeholder="请输入年级名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学科" prop="subjects">
                <el-select
                  multiple
                  v-model="formState.subjects"
                  placeholder="请选择学科"
                >
                  <el-option
                    v-for="{ id, name } in subjectList"
                    :key="id"
                    :label="name"
                    :value="id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="con-bottom">
        <el-button
          :loading="loading"
          type="primary"
          @click.prevent="onSubmit(ruleFormRef)"
          >提交</el-button
        >
        <el-button
          type="primary"
          ghost
          :loading="loading"
          style="margin-left: 10px"
          @click="resetForm(ruleFormRef)"
          >重置</el-button
        >
        <el-button
          :loading="loading"
          ghost
          style="margin-left: 10px"
          @click="handleAddUpdCancel"
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
import { updateGradeList, findGradeDetailed, addGradeList } from "./services";
import { message } from "@pureadmin/components";
import { getDisciplineList } from "/@/api/system";
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
  add: "年级添加",
  edit: "年级更新"
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
const formState: any = reactive({
  id: null,
  title: "",
  subjects: []
});
// 校验
const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      trigger: "change",
      message: "年级是必传项"
    }
  ],
  subjects: [
    {
      required: false
    }
  ]
});
const loading = ref(false);
// 表单
// 重置
const resetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 新增
const insertRegulatory = async (data: any) => {
  const res: responseData = await addGradeList(data);
  if (res.code === 200) {
    await props.onUpdate();
    handleAddUpdCancel();
    message.success("新增成功");
  } else {
    message.error(res.message);
  }
  loading.value = false;
};
// 修改
const updateRegulatory = async (data: any) => {
  const res: responseData = await updateGradeList(data);
  if (res.code === 200) {
    await props.onUpdate();
    handleAddUpdCancel();
    message.success("更新成功");
  } else {
    message.error(res.message);
  }
  loading.value = false;
};
// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  loading.value = true;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = toRaw(formState);
      if (props.type !== "add") {
        updateRegulatory(data);
      } else {
        insertRegulatory(data);
      }
    }else{
      loading.value = false;
    }
  });
};
const isShowBtn = ref(true);
const isDisabled = ref(false);
const subjectList = ref([]);
onMounted(async () => {
  const rs = await getDisciplineList({ pageNo: 1, pageSize: 1000 });
  subjectList.value = rs?.data?.results;
  const { type, id } = props;
  if (["edit"].includes(type)) {
    const res = await findGradeDetailed(id);
    if (res.code === 200) {
      formState["id"] = res.data["id"];
      formState["title"] = res.data["title"];
      formState["subjects"] = res.data["subjects"]?.map((i: any) => i.id);
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
