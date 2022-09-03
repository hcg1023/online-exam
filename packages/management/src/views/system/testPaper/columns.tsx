/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 
 * @LastEditTime: 2022-09-03 18:48:04
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
      label: "试卷名称",
      prop: "title",
      width: 180,
      align: "left"
    },
    {
      label: "考试时间",
      prop: "minute",
      width: 180,
      align: "left"
    },
    // {
    //   label: "排序",
    //   prop: "sort",
    //   width: 60
    // },
    // {
    //   label: "状态",
    //   prop: "status",
    //   width: 80,
    //   cellRenderer: ({ row, props }) => (
    //     <el-tag
    //       size={props.size}
    //       type={row.status === 1 ? "danger" : "success"}
    //       effect="plain"
    //     >
    //       {row.status === 0 ? "关闭" : "开启"}
    //     </el-tag>
    //   )
    // },
    {
      label: "创建时间",
      width: 180,
      prop: "createdDate",
      formatter: ({ createdDate }) =>
        dayjs(createdDate).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "总分",
      prop: "totalScore"
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
