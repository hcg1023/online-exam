<!--
 * @Author: @yzcheng
 * @Date: 2022-05-18 13:37:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 学科 新增编辑
 * @LastEditTime: 2022-08-28 19:12:48
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
          ref="ruleFormRef"
          label-width="100px"
          :model="formState"
          :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="formState.username"
                  placeholder="请输入用户名称"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="type !== 'edit'" :span="24">
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="formState.password"
                  placeholder="请输入密码"
                  show-password
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="真实姓名" prop="name">
                <el-input
                  v-model="formState.name"
                  placeholder="请输入真实姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="年龄" prop="age">
                <el-input-number
                  :min="1"
                  :max="100"
                  :controls="false"
                  v-model="formState.age"
                  placeholder="请输入年龄"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="性别" prop="sex">
                <el-select
                  v-model="formState.sex"
                  placeholder="请选择性别"
                  clearable
                >
                  <el-option label="男" value="BOY" />
                  <el-option label="女" value="GIRL" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="年级" prop="grade">
                <el-select
                  v-model="formState.grade"
                  placeholder="请选择年级"
                  clearable
                  @change="getclassInfo"
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
              <el-form-item label="班级" prop="classInfo">
                <el-select
                  v-model="formState.classInfo"
                  placeholder="请选择班级"
                  clearable
                >
                  <el-option
                    v-for="{ id, name } in classInfoList"
                    :key="id"
                    :label="name"
                    :value="id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formState.email" placeholder="请输入邮箱" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="状态" prop="status">
                <el-select
                  v-model="formState.status"
                  placeholder="请选择状态"
                  clearable
                >
                  <el-option label="启用" value="ENABLE" />
                  <el-option label="禁用" value="DISABLED" />
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
import { updateUser, findUserDetailed, addUserList } from "/@/api/user";
import { message } from "@pureadmin/components";
import { getGradeList } from "/@/api/system";
import { getClassInfo } from "./services";
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
  add: "学生添加",
  edit: "学生更新"
};
const dialogVisible = computed({
  get: () => props.visible,
  set: val => ctx.$emit("update:visible", val)
});
const handleAddUpdCancel = () => {
  ctx.$emit("update:visible", false);
};
const validateEmail = (rule: any, value: any, callback: any) => {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!reg.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};
const taskJobVisible = ref(1);
// 表单数据
const formState: any = reactive({
  identity: 2,
  username: "",
  password: "",
  name: "",
  age: 1,
  sex: "BOY",
  status: "ENABLE",
  email: "",
  classInfo: "",
  grade: ""
});
// 校验
const rules = reactive<FormRules>({
  grade: [
    {
      required: true,
      trigger: "change",
      message: "年级是必传项"
    }
  ],
  classInfo: [
    {
      required: true,
      trigger: "change",
      message: "班级是必传项"
    }
  ],
  sex: [
    {
      required: true,
      trigger: "change",
      message: "性别是必传项"
    }
  ],
  status: [
    {
      required: true,
      trigger: "change",
      message: "状态是必传项"
    }
  ],
  email: [
    {
      required: true,
      trigger: "change",
      message: "邮箱是必传项"
    },
    { validator: validateEmail, trigger: "blur" }
  ],
  age: [
    {
      required: true,
      trigger: "change",
      message: "年龄是必传项"
    }
  ],
  username: [
    {
      required: true,
      trigger: "change",
      message: "用户名是必传项"
    },
    { min: 3, message: "用户名必须大于三个字符", trigger: "change" }
  ],
  password: [
    {
      required: true,
      trigger: "change",
      message: "密码是必传项"
    },
    { min: 5, message: "密码必须大于五个字符", trigger: "change" }
  ],
  name: [
    {
      required: true,
      trigger: "change",
      message: "真实姓名是必传项"
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
  const res: responseData = await addUserList(data);
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
  const res: responseData = await updateUser(data);
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
    classInfoList.value = data;
  }
};
const isShowBtn = ref(true);
const isDisabled = ref(false);
const gradeList = ref([]);
const classInfoList = ref([]);
onMounted(async () => {
  const rs = await getGradeList({ pageNo: 1, pageSize: 1000 });
  gradeList.value = rs?.data?.results;
  const { type, id } = props;
  if (["edit"].includes(type)) {
    const res: responseData = await findUserDetailed(id);
    if (res.code === 200) {
      Object.entries(res.data).forEach(([key]) => {
        formState[key] = res.data[key];
      });
      formState["grade"] = res.data["grade"]?.id;
      formState["classInfo"] = res.data["classInfo"]?.id;
      const { code, data }: responseData = await getClassInfo({
        id: formState["grade"]
      });
      if (code === 200) {
        classInfoList.value = data;
      }
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
