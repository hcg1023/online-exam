<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useColumns } from "/@/views/answer/completeList/columns";
import { FormInstance } from "element-plus";
import { TableProBar } from "/@/components/ReTable";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
import { getJudgeList } from "/@/views/answer/judgeList/services";
import { useRouter } from "vue-router";

const form = reactive({
  pageNo: 1,
  pageSize: 10
});
let dataList = ref([]);
let loading = ref(true);
const { columns } = useColumns();

const formRef = ref<FormInstance>();
const tableRef = ref();
const router = useRouter();
function handleJudge(row: any) {
  const { href } = router.resolve({
    name: "judgeExam",
    query: {
      taskId: row.task.id,
      testPaperId: row.id,
      userId: row.student.id
    }
  });
  window.open(href);
}

function handleSelectionChange(val) {
  console.log("handleSelectionChange", val);
}

async function onSearch() {
  loading.value = true;
  let {
    data: { results }
  } = await getJudgeList(form);
  dataList.value = results;
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
    <!--    <el-form-->
    <!--      ref="formRef"-->
    <!--      :inline="true"-->
    <!--      :model="form"-->
    <!--      class="bg-white dark:bg-dark w-99/100 pl-8 pt-4"-->
    <!--    >-->
    <!--      <el-form-item>-->
    <!--        <el-button-->
    <!--          type="primary"-->
    <!--          :icon="useRenderIcon('search')"-->
    <!--          :loading="loading"-->
    <!--          @click="onSearch"-->
    <!--        >-->
    <!--          搜索-->
    <!--        </el-button>-->
    <!--        <el-button-->
    <!--          :loading="loading"-->
    <!--          :icon="useRenderIcon('refresh')"-->
    <!--          @click="resetForm(formRef)"-->
    <!--        >-->
    <!--          重置-->
    <!--        </el-button>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->

    <TableProBar
      title="答卷列表"
      :loading="loading"
      :tableRef="tableRef?.getTableRef()"
      :dataList="dataList"
      @refresh="onSearch"
    >
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
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :loading="loading"
              @click="handleJudge(row)"
              :icon="useRenderIcon('edits')"
            >
              批改
            </el-button>
          </template>
        </PureTable>
      </template>
    </TableProBar>
  </div>
</template>
