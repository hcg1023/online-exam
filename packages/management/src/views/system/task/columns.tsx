/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 
 * @LastEditTime: 2022-09-03 20:37:17
 */
import { ref } from "vue";
import dayjs from "dayjs";

export function useColumns() {
  const columns = ref([
    {
      type: "selection",
      width: 55,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 60,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "考试名称",
      prop: "title",
      align: "left"
    },
    {
      label: "年级名称",
      prop: "grade.title",
      align: "left"
    },
    {
      label: "创建时间",
      prop: "createdDate",
      formatter: ({ createdDate }) =>
        dayjs(createdDate).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ]);

  return {
    columns
  };
}
