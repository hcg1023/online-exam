/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-28 20:05:16
 */
import { ref } from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration); // 使用插件
dayjs.locale("zh-cn");

export function useColumns() {
  const columns = ref([
    {
      label: "序号",
      type: "index",
      width: 60,
      align: "left"
    },
    {
      label: "试题名称",
      prop: "title",
      align: "left"
    },
    {
      label: "年级",
      prop: "student.grade.title",
      align: "left"
    },
    {
      label: "学科",
      prop: "subject.name",
      align: "left"
    },
    {
      label: "学生",
      prop: "student.name"
    },
    {
      label: "得分",
      cellRenderer: ({ row }) => `${row.score}/${row.totalScore}`
    },
    {
      label: "题目对错",
      cellRenderer: ({ row }) =>
        `${row.correctQuestionTotal}/${row.questionTotal}`
    },
    {
      label: "耗时",
      prop: "duration",
      formatter: ({ duration }) => {
        const hours = dayjs.duration(duration).hours();
        const minutes = dayjs.duration(duration).minutes();
        const seconds = dayjs.duration(duration).seconds();
        return `${hours ? `${hours}小时` : ""}${
          minutes ? `${minutes}分钟` : ""
        }${seconds}秒`;
      }
    },
    {
      label: "提交时间",
      width: 180,
      prop: "submitTime",
      formatter: ({ submitTime }) =>
        dayjs(submitTime).format("YYYY-MM-DD HH:mm:ss")
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
