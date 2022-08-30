<!--
 * @Author: @yzcheng
 * @Date: 2022-05-18 13:37:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 班级 新增编辑
 * @LastEditTime: 2022-08-29 12:09:25
-->
<template>
  <el-dialog
    width="50%"
    v-model="dialogVisible"
    :title="dictionary[type]"
    @close="handleAddUpdCancel"
  >
    <div class="dept-editor">
      <div class="wrap-box">
        <el-form
          ref="ruleFormRef"
          label-width="100px"
          :model="formState"
          :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="创编类型" prop="name">
                <el-select placeholder="请选择创编类型">
                  <el-option
                    v-for="{ key, name } in topicType"
                    :key="key"
                    :label="name"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="年级" prop="grade">
                <el-select v-model="formState.grade" placeholder="请选择年级">
                  <el-option
                    v-for="{ id, title } in topicType"
                    :key="id"
                    :label="title"
                    :value="id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学科" prop="grade">
                <el-select v-model="formState.grade" placeholder="请选择学科">
                  <el-option
                    v-for="{ id, title } in topicType"
                    :key="id"
                    :label="title"
                    :value="id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="题干" prop="grade">
                <el-input
                  v-model="formState.title"
                  placeholder="请输入题干名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选项">
                <div class="topic_options">
                  <el-space wrap>
                    <el-input
                      style="width: 100px"
                      v-model="formState.title"
                      placeholder="请输入选项"
                    />
                    <el-input
                      style="width: 400px"
                      v-model="formState.title"
                      placeholder="请输入选项内容"
                    />
                    <el-button type="danger" circle>
                      <IconifyIconOffline icon="delete" />
                    </el-button>
                  </el-space>
                </div>
                <el-button
                  type="primary"
                  ghost
                  style="width: 100%; margin-top: 10px"
                  :loading="loading"
                  >增加一行</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="标答" prop="grade">
                <el-checkbox-group v-model="formState.checkList">
                  <el-checkbox label="A" />
                  <el-checkbox label="B" />
                  <el-checkbox label="C" />
                  <el-checkbox label="D" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="解析" prop="grade">
                <el-input
                  type="textarea"
                  v-model="formState.title"
                  placeholder="请写解析"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分数" prop="grade">
                <el-input-number v-model="formState.num" :min="1" :max="100" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="难度" prop="grade">
                <el-rate v-model="formState.difficulty" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="知识点" prop="grade">
                <el-input
                  type="textarea"
                  v-model="formState.title"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="con-bottom">
        <el-button
          type="primary"
          :loading="loading"
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
          ghost
          :loading="loading"
          style="margin-left: 10px"
          @click="handleAddUpdCancel"
          >返回</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { IconifyIconOffline } from "/@/components/ReIcon";
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
import {
  updateQuestionList,
  findQuestionDetailed,
  addQuestionList
} from "./services";
import { message } from "@pureadmin/components";
import { getGradeList } from "/@/api/system";
import type { FormInstance, FormRules } from "element-plus";
const ruleFormRef = ref<FormInstance>();
const topicType = [
  {
    key: 1,
    name: "单选题创编"
  },
  {
    key: 2,
    name: "多选题创编"
  },
  {
    key: 3,
    name: "判断题创编"
  },
  {
    key: 4,
    name: "填空题创编"
  },
  {
    key: 5,
    name: "简答题创编"
  }
];
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
  edit: "班级更新"
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
    },
    { min: 2, message: "班级名称必须大于等于两个汉字", trigger: "change" }
  ],
  grade: [
    {
      required: true,
      trigger: "change",
      message: "年级是必传项"
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
  const res: responseData = await addQuestionList(data);
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
  const res: responseData = await updateQuestionList(data);
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
    } else {
      loading.value = false;
    }
  });
};
const isShowBtn = ref(true);
const isDisabled = ref(false);
const gradeList = ref([]);
onMounted(async () => {
  const rs = await getGradeList({ pageNo: 1, pageSize: 1000 });
  gradeList.value = rs?.data?.results;
  const { type, id } = props;
  if (["edit"].includes(type)) {
    const res = await findQuestionDetailed(id);
    if (res.code === 200) {
      formState["id"] = res.data["id"];
      formState["name"] = res.data["name"];
      formState["grade"] = res.data["grade"]?.id;
    }
  }
});
</script>

<style scoped lang="scss">
.topic_options {
  display: flex;
  justify-content: space-around;
}
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
