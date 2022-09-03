<!--
 * @Author: @yzcheng
 * @Date: 2022-05-18 13:37:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 试题 新增编辑
 * @LastEditTime: 2022-09-03 20:53:07
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
              <el-form-item label="年级" prop="grade">
                <el-select v-model="formState.grade" placeholder="请选择年级">
                  <el-option
                    v-for="{ id, title } in gradeList"
                    :key="id"
                    :label="title"
                    :value="id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="标题" prop="title">
                <el-input v-model="formState.title" placeholder="请写标题" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="试卷" prop="title">
                <TableProBar
                  title="试题列表"
                  :loading="loadingTable"
                  :tableRef="tableRef?.getTableRef()"
                  :dataList="dataList"
                >
                  <template #buttons> </template>
                  <template v-slot="{ size, checkList }">
                    <PureTable
                      ref="tableRef"
                      border
                      align="center"
                      row-key="id"
                      table-layout="auto"
                      default-expand-all
                      :size="size"
                      :data="dataList"
                      :columns="columns"
                      :checkList="checkList"
                      :header-cell-style="{
                        background: 'var(--el-table-row-hover-bg-color)',
                        color: 'var(--el-text-color-primary)'
                      }"
                      @selection-change="handleSelectionChange"
                    />
                  </template>
                </TableProBar>
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
          type="success"
          :loading="loading"
          @click.prevent="addOptions()"
          >添加试卷</el-button
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
    <el-dialog
      width="70%"
      v-model="paperVisible"
      :title="'试题选择'"
      @close="handleCancel"
    >
      <div>
        <paperComp v-if="paperVisible" :onSetSelection="setSelection" />
        <div class="con-bottom">
          <el-button
            type="primary"
            :loading="loading"
            @click.prevent="addQuestion"
            >确认</el-button
          >
          <el-button
            ghost
            :loading="loading"
            style="margin-left: 10px"
            @click="handleCancel"
            >返回</el-button
          >
        </div>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { IconifyIconOffline } from "/@/components/ReIcon";
import {
  onMounted,
  ref,
  watch,
  reactive,
  toRaw,
  computed,
  defineProps,
  getCurrentInstance
} from "vue";
import type { responseData } from "/#/index";
import { updateTestList, findTestDetailed, addTestList } from "./services";
import { message } from "@pureadmin/components";
import { getGradeList } from "/@/api/system";
import paperComp from "./components/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import { words } from "lodash-unified";
import { useColumns } from "./columns";
import { handleTree } from "@pureadmin/utils";
import { TableProBar } from "/@/components/ReTable";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
let dataList = ref([]);
let loadingTable = ref(true);
const { columns } = useColumns();

const formRef = ref<FormInstance>();
const tableRef = ref();
const visible = ref(false);
const deptType = ref("");
const deptId = ref("");
const ruleFormRef = ref<FormInstance>();
const radioDefaule = ref(null);
const selectionList = ref([]);
const paperVisible = ref(false);
const paperIndex = ref(0);
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
  add: "考试添加",
  edit: "考试更新"
};
const dialogVisible = computed({
  get: () => props.visible,
  set: val => ctx.$emit("update:visible", val)
});
const handleAddUpdCancel = () => {
  ctx.$emit("update:visible", false);
};
const handleCancel = () => {
  paperVisible.value = false;
};
const formatting = (item: any) => {
  let str = "";
  switch (item.type) {
    case "REPLY_QUESTION":
      return item.correctOptions.join(",");
      break;
    case "SHORT_ANSWER":
      return item.answer;
      break;

    default:
      console.log(item);
      item.options.forEach((i: any) => {
        str += `${i.title}：${i.value}、`;
      });
      return str;
      break;
  }
};
// 表单数据
const formState: any = reactive({
  title: "",
  subject: "",
  grade: "",
  minute: 0,
  questionGroups: []
});
const setSelection = (val: any) => {
  selectionList.value = val;
};
//添加一条标题
const addQuestion = () => {
  formState.questionGroups[paperIndex.value].questions =
    selectionList.value.map((i: any) => i.id);
  formState.questionGroups[paperIndex.value].questionList = selectionList.value;
  paperVisible.value = false;
};
// 选择试题
const addOptions = (index: number) => {
  paperVisible.value = true;
  paperIndex.value = index;
};
//删除一条标题
const deleteOptions = (index: number) => {
  formState.questionGroups.splice(index, 1);
};
// 校验
const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      trigger: "change",
      message: "考试是必传项"
    }
  ],
  minute: [
    {
      required: true,
      trigger: "change",
      message: "建议时间是必传项"
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
const loading = ref(false);
// 重置
const resetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 新增
const insertRegulatory = async (data: any) => {
  const res: responseData = await addTestList(data);
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
  const res: responseData = await updateTestList(data);
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
const subjectList = ref([]);
onMounted(async () => {
  const rs = await getGradeList({ pageNo: 1, pageSize: 1000 });
  gradeList.value = rs?.data?.results;
  const { type, id } = props;
  if (["edit"].includes(type)) {
    const res = await findTestDetailed(id);
    if (res.code === 200) {
      formState["id"] = res.data["id"];
      formState["grade"] = res.data["grade"]?.id;
      formState["subject"] = res.data["subject"]?.id;
      formState["title"] = res.data["title"];
      formState["minute"] = res.data["minute"];
      formState["questionGroups"] = res.data["questionGroups"].map(
        (item: any) => {
          item.questionList = item.questions;
          item.questions = item.questions.map((i: any) => i.id);
          return item;
        }
      );
    }
  }
});
</script>

<style scoped lang="scss">
.question-box {
  padding: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  margin-top: 20px;
  width: 100%;
  .question-view {
    color: #000;
    display: flex;
    width: 100%;
    font-size: 18px;
    & > div:first-child {
      width: 80px;
    }
  }
}

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
}
.con-bottom {
  height: 52px;
  line-height: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  text-align: right;
  padding-right: 25px;
}
</style>
