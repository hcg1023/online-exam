/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 
 * @LastEditTime: 2022-09-03 18:50:29
 */
import { ref } from "vue";
import dayjs from "dayjs";

export function useColumns() {
  const columns = ref([
    {
      type: "selection",
      width: 55,
      align: "left"
    },
    {
      label: "序号",
      type: "index",
      width: 60,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "试题名称",
      prop: "title",
      width: 180,
      align: "left"
    },
    {
      label: "试题类型",
      prop: "typeName",
      width: 180,
      align: "left"
    },
    {
      label: "创建时间",
      width: 180,
      prop: "createdDate",
      formatter: ({ createdDate }) =>
        dayjs(createdDate).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "总分",
      prop: "score"
    },
    {
      label: "难度",
      prop: "difficulty",
      slot: "difficulty"
    }
  ]);

  return {
    columns
  };
}
