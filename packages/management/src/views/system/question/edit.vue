<!--
 * @Author: @yzcheng
 * @Date: 2022-05-18 13:37:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 试题 新增编辑
 * @LastEditTime: 2022-08-30 19:01:32
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
              <el-form-item label="创编类型" prop="type">
                <el-select
                  v-model="formState.type"
                  placeholder="请选择创编类型"
                >
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
              <el-form-item label="题干" prop="title">
                <el-input
                  v-model="formState.title"
                  placeholder="请输入题干名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="!['SHORT_ANSWER','REPLY_QUESTION'].includes(getType)">
              <el-form-item label="选项" name="options">
                <el-space wrap>
                  <div
                    class="topic_options"
                    v-for="(item, index) in formState.options"
                    :key="`${index}-`"
                  >
                    <el-space wrap>
                      <el-input
                        style="width: 100px"
                        v-model="item.title"
                        placeholder="请输入选项"
                      />
                      <el-input
                        style="width: 400px"
                        v-model="item.value"
                        placeholder="请输入选项内容"
                      />
                      <el-button type="danger" circle>
                        <IconifyIconOffline
                          icon="delete"
                          @click="deleteOptions(index)"
                        />
                      </el-button>
                    </el-space>
                  </div>
                </el-space>
                <el-button
                  type="primary"
                  ghost
                  style="width: 100%; margin-top: 10px"
                  :loading="loading"
                  @click="addOptions"
                  >增加一行</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="标答" prop="correctOptions">
                <el-checkbox-group
                  v-if="['MULTIPLE_CHOICE'].includes(getType)"
                  v-model="formState.correctOptions"
                >
                  <el-checkbox
                    v-for="{ title } in formState.options"
                    :label="title"
                    :value="title"
                    :key="title"
                  />
                </el-checkbox-group>
                <el-radio-group
                  v-if="['SINGLE_CHOICE', 'JUDGE_QUESTION'].includes(getType)"
                  @change="val => (formState.correctOptions = [val])"
                  v-model="radioDefaule"
                >
                  <el-radio
                    v-for="{ title } in formState.options"
                    :label="title"
                    :value="title"
                    :key="title"
                  />
                </el-radio-group>
                <el-input
                  v-if="['SHORT_ANSWER'].includes(getType)"
                  v-model="formState.correctOptions"
                  placeholder="请输入标答名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="解析" prop="analyze">
                <el-input
                  type="textarea"
                  v-model="formState.analyze"
                  placeholder="请写解析"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分数" prop="score">
                <el-input-number
                  v-model="formState.score"
                  :min="1"
                  :max="100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="难度" prop="difficulty">
                <el-rate v-model="formState.difficulty" />
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
  addQuestionList,
  getClassInfo
} from "./services";
import { message } from "@pureadmin/components";
import { getGradeList } from "/@/api/system";
import type { FormInstance, FormRules } from "element-plus";
const ruleFormRef = ref<FormInstance>();
const radioDefaule = ref(null);
const topicType = [
  {
    key: "SINGLE_CHOICE",
    name: "单选题创编"
  },
  {
    key: "MULTIPLE_CHOICE",
    name: "多选题创编"
  },
  {
    key: "REPLY_QUESTION",
    name: "填空题创编"
  },
  {
    key: "JUDGE_QUESTION",
    name: "判断题创编"
  },
  {
    key: "SHORT_ANSWER",
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
  add: "试题添加",
  edit: "试题更新"
};
const defaultData = {
  title: "",
  value: ""
};
const dialogVisible = computed({
  get: () => props.visible,
  set: val => ctx.$emit("update:visible", val)
});
/** 获取类型 */
const getType = computed(() => {
  return formState.type;
});
const handleAddUpdCancel = () => {
  ctx.$emit("update:visible", false);
};
//删除一条选项
const deleteOptions = (index: number) => {
  formState.options.splice(index, 1);
};
//添加一条选项
const addOptions = (index: number) => {
  if (
    ["JUDGE_QUESTION"].includes(getType.value) &&
    formState.options.length >= 2
  ) {
    message.error("判断题最多只能添加两个选项");
    return;
  }
  formState.options.push(JSON.parse(JSON.stringify(defaultData)));
};

// 表单数据
const formState: any = reactive({
  title: "",
  type: "SINGLE_CHOICE",
  score: 0,
  difficulty: 0,
  grade: "",
  subject: "",
  options: [
    {
      title: "A",
      value: ""
    }
  ],
  correctOptions: "",
  answer: "",
  analyze: ""
});
// 校验
const rules = reactive<FormRules>({
  analyze: [
    {
      required: true,
      trigger: "change",
      message: "解析是必传项"
    }
  ],
  score: [
    {
      required: true,
      trigger: "change",
      message: "分数是必传项"
    }
  ],
  difficulty: [
    {
      required: true,
      trigger: "change",
      message: "难度是必传项"
    }
  ],
  subject: [
    {
      required: true,
      trigger: "change",
      message: "学科是必传项"
    }
  ],
  correctOptions: [
    {
      required: true,
      trigger: "change",
      message: "标答是必传项"
    }
  ],
  title: [
    {
      required: true,
      trigger: "change",
      message: "题干是必传项"
    }
  ],
  options: [
    {
      required: true,
      trigger: "change",
      message: "选项是必传项"
    }
  ],
  type: [
    {
      required: true,
      trigger: "change",
      message: "创编类型是必传项"
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
    const res = await findQuestionDetailed(id);
    if (res.code === 200) {
      const { code, data }: responseData = await getClassInfo({
        id: formState["grade"]
      });
      if (code === 200) {
        subjectList.value = data;
      }
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
