<script setup lang="ts">
import { useColumns } from "./columns";
import type { responseData } from "/#/index";
import { getTestPaperList } from "./services";
import { FormInstance } from "element-plus";
import { handleTree } from "@pureadmin/utils";
import { reactive, ref, defineProps, onMounted } from "vue";
import { TableProBar } from "/@/components/ReTable";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
import { message } from "@pureadmin/components";
import edit from "./edit.vue";
defineOptions({
  name: "Dept"
});
const props = defineProps({
  onSetSelection: {
    type: Function,
    default: () => () => {}
  }
});
const form = reactive({
  name: "",
  pageNo: 1,
  pageSize: 10
});
let dataList = ref([]);
let loading = ref(true);
const { columns } = useColumns();

const formRef = ref<FormInstance>();
const tableRef = ref();
const visible = ref(false);
const deptType = ref("");
const deptId = ref("");
function handle(type: string, row: any) {
  visible.value = true;
  deptType.value = type;
  switch (type) {
    case "add":
      break;
    case "edit":
      deptId.value = row.id;
      break;

    default:
      break;
  }
}
function handleSelectionChange(val: any[]) {
  props.onSetSelection(val)
}

async function onSearch() {
  loading.value = true;
  let {
    data: { results }
  } = await getTestPaperList(form);
  dataList.value = handleTree(results as any);
  loading.value = false;
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-white dark:bg-dark w-99/100 pl-8 pt-4"
    >
      <el-form-item label="试卷名称：" prop="user">
        <el-input v-model="form.name" placeholder="请输入试卷名称" clearable />
      </el-form-item>
      <!-- <el-form-item label="状态：" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态" clearable>
          <el-option label="开启" value="1" />
          <el-option label="关闭" value="0" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('search')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          :loading="loading"
          :icon="useRenderIcon('refresh')"
          @click="resetForm(formRef)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <TableProBar
      title="试题列表"
      :loading="loading"
      :tableRef="tableRef?.getTableRef()"
      :dataList="dataList"
      @refresh="onSearch"
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
        >
          <template #difficulty="{ row }">
            <el-rate disabled v-model="row.difficulty" />
          </template>
        </PureTable>
      </template>
    </TableProBar>
  </div>
</template>
