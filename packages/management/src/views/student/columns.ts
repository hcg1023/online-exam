import { ref } from "vue";
import dayjs from "dayjs";

export function useColumns() {
  const columns = ref([
    {
      type: "expand",
      slot: "expand"
    },
    {
      label: "序号",
      type: "index",
      width: 60,
      align: "left"
    },
    {
      label: "名称",
      prop: "title",
      align: "left"
    },
    {
      label: "开始时间",
      prop: "startDate",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ]);

  return {
    columns
  };
}
