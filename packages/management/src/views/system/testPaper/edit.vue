<!--
 * @Author: @yzcheng
 * @Date: 2022-05-18 13:37:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 试题 新增编辑
 * @LastEditTime: 2022-09-03 20:57:25
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
                <el-select
                  @change="getclassInfo"
                  v-model="formState.grade"
                  placeholder="请选择年级"
                >
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
              <el-form-item label="学科" prop="subject">
                <el-select v-model="formState.subject" placeholder="请选择学科">
                  <el-option
                    v-for="{ id, name } in subjectList"
                    :key="id"
                    :label="name"
                    :value="id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="试卷名称" prop="title">
                <el-input
                  v-model="formState.title"
                  placeholder="请写试卷名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="建议时长" prop="minute">
                <el-input-number
                  v-model="formState.minute"
                  :min="1"
                  :max="100"
                />
              </el-form-item>
            </el-col>
            <el-col v-for="(i, index) in formState.questionGroups" :span="24">
              <el-form-item :label="`标题${index + 1}`" prop="minute">
                <el-space wrap>
                  <el-input style="width: 400px" v-model="i.title" />
                  <el-button type="success" @click="addOptions(index)" circle>
                    <IconifyIconOffline icon="add" />
                  </el-button>
                  <el-button type="danger" @click="deleteOptions(index)" circle>
                    <IconifyIconOffline icon="delete" />
                  </el-button>
                </el-space>
                <div class="question-box" v-if="i?.questionList?.length">
                  <div
                    v-for="(item, index) in i.questionList"
                    class="question-view"
                  >
                    <div>题目{{ index + 1 }}:</div>
                    <div>
                      <div>{{ item?.title }}</div>
                      <div>{{ formatting(item) }}</div>
                    </div>
                  </div>
                </div>
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
          @click.prevent="addQuestionGroups()"
          >添加标题</el-button
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
import {
  updateTestPaperList,
  findTestPaperDetailed,
  addTestPaperList,
  getClassInfo
} from "./services";
import { message } from "@pureadmin/components";
import { getGradeList } from "/@/api/system";
import paperComp from "./components/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import { words } from "lodash-unified";
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
  add: "试卷添加",
  edit: "试卷更新"
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
      console.log(item)
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
//添加一条标题
const addQuestionGroups = () => {
  formState.questionGroups.push({
    order: formState.questionGroups.length,
    title: "",
    questions: []
  });
};
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
      message: "试卷是必传项"
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
  const res: responseData = await addTestPaperList(data);
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
  const res: responseData = await updateTestPaperList(data);
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
const getclassInfo = async (id: string) => {
  const { code, data }: responseData = await getClassInfo({ id });
  if (code === 200) {
    subjectList.value = data;
  }
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
    const res = await findTestPaperDetailed(id);
    if (res.code === 200) {
      const { code, data }: responseData = await getClassInfo({
        id: res.data["grade"].id
      });
      if (code === 200) {
        subjectList.value = data;
      }
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
