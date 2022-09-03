<script setup lang="ts">
import { getStudentTasks } from "/@/api/student";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { TableProBar } from "/@/components/ReTable";
import { useColumns } from "./columns";
import { TaskStatusEnum } from "/@/enums/task-status.enum";

const router = useRouter();

const form = reactive({
  pageNo: 1,
  pageSize: 10
});
let dataList = ref([]);
let loading = ref(true);
const { columns } = useColumns();

const tableRef = ref();

async function onSearch() {
  loading.value = true;
  let {
    data: { results }
  } = await getStudentTasks(form);
  dataList.value = results;
  loading.value = false;
}
onSearch();

function goToExam(taskId: string, testPaperId: string) {
  const { href } = router.resolve({
    name: "ExamWrite",
    query: {
      taskId,
      testPaperId
    }
  });
  window.open(href);
}

function goToReadExam(taskId: string, testPaperId: string) {
  router.push({
    name: "ExamRead",
    query: {
      taskId,
      testPaperId
    }
  });
}
</script>

<template>
  <div class="main">
    <TableProBar
      title="考试列表"
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
        >
          <template #expand="{ row }">
            <ul>
              <li
                class="exam-item"
                v-for="testPaper in row.testPapers"
                :key="testPaper.id"
              >
                <div>{{ testPaper.title }}</div>
                <div>
                  <span
                    :class="[
                      'exam-status',
                      `exam-status-${testPaper.status.toLowerCase()}`
                    ]"
                  >
                    {{ testPaper.statusName }}
                  </span>
                  <el-button
                    type="primary"
                    link
                    v-if="
                      testPaper.status === TaskStatusEnum.DONE ||
                      testPaper.status === TaskStatusEnum.CORRECT
                    "
                    @click="goToReadExam(row.id, testPaper.id)"
                    >查看试卷</el-button
                  >
                  <el-button
                    type="primary"
                    link
                    v-if="testPaper.status === TaskStatusEnum.UNDONE"
                    @click="goToExam(row.id, testPaper.id)"
                    >进行考试</el-button
                  >
                </div>
              </li>
            </ul>
          </template>
        </PureTable>
      </template>
    </TableProBar>
  </div>
</template>

<style lang="scss" scoped>
.exam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  & + & {
    margin-top: 10px;
  }
}
.exam-status {
  display: inline-block;
  font-size: 12px;
  padding: 0 6px;
  line-height: 24px;
  margin-right: 12px;
  border: 1px solid;
  &-done {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }
  &-undone {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
  }
  &-correct {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
  }
}
</style>
