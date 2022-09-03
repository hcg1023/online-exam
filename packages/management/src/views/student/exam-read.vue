<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/zh-cn";
import { getTestPaperReadInfo } from "/@/api/student";
import {
  JudgeQuestion,
  MultipleChoice,
  ReplyQuestion,
  ShortAnswer,
  SingleChoice
} from "../components/questions";
import { QuestionTypeEnum } from "/@/enums";

const components = {
  [QuestionTypeEnum.JUDGE_QUESTION]: JudgeQuestion,
  [QuestionTypeEnum.MULTIPLE_CHOICE]: MultipleChoice,
  [QuestionTypeEnum.SINGLE_CHOICE]: SingleChoice,
  [QuestionTypeEnum.REPLY_QUESTION]: ReplyQuestion,
  [QuestionTypeEnum.SHORT_ANSWER]: ShortAnswer
};

const route = useRoute();

dayjs.extend(duration); // 使用插件
dayjs.locale("zh-cn");

const testPaperInfo = ref();
const endTime = ref();
const timer = ref();
const durationTimeStr = ref("");
const answerInfo = ref();
const questionAnswers = computed(() => answerInfo.value?.questionAnswers);

function getQuestionValue(questionId: number, questionType: QuestionTypeEnum) {
  const item = questionAnswers.value.find(
    item => item.questionId === questionId
  );
  if (questionType === QuestionTypeEnum.SHORT_ANSWER) {
    return item?.answer ?? "";
  }
  return item?.options ?? [];
}

function judgeQuestionAnswer(
  questionId: number,
  questionType: QuestionTypeEnum
) {
  const item = questionAnswers.value.find(
    item => item.questionId === questionId
  );
  if (!item) {
    return false;
  }
  if (questionType === QuestionTypeEnum.SHORT_ANSWER) {
    return item?.answer !== "";
  }
  return item?.options?.length !== 0;
}

function computedDuration() {
  const diff = endTime.value.diff(dayjs());
  const hours = dayjs.duration(diff).hours();
  const minutes = dayjs.duration(diff).minutes();
  const seconds = dayjs.duration(diff).seconds();
  return `${hours ? `${hours}小时` : ""}${
    minutes ? `${minutes}分钟` : ""
  }${seconds}秒`;
}

getTestPaperReadInfo(
  route.query.taskId as string,
  route.query.testPaperId as string
).then(({ data }) => {
  testPaperInfo.value = data.testPaper;
  answerInfo.value = data.answer;
});
onMounted(() => {
  timer.value = setInterval(() => {
    if (endTime.value) {
      durationTimeStr.value = computedDuration();
    }
  }, 500);
});
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div v-if="testPaperInfo">
    <div class="exam-header">
      <div class="exam-header-title-wrapper">
        <span class="exam-header-title">{{ testPaperInfo.title }}</span>
        <div>
          <div>得分：{{ testPaperInfo.totalScore }}</div>
          <div>耗时：{{ testPaperInfo.minute }}分钟</div>
        </div>
      </div>
      <div class="exam-header-ddl">{{ durationTimeStr }}</div>
    </div>
    <div class="exam-main">
      <div
        class="exam-main-group"
        v-for="questionGroup in testPaperInfo.questionGroups"
        :key="questionGroup.id"
      >
        <div class="exam-main-group-title">{{ questionGroup.title }}</div>
        <div class="exam-main-group-questions">
          <div
            class="exam-main-group-question"
            v-for="(question, questionIndex) in questionGroup.questions"
            :key="question.id"
          >
            <span class="exam-main-group-question-order"
              >{{ questionIndex + 1 }}.</span
            >
            <component
              :is="components[question.type]"
              :question="question"
              :value="getQuestionValue(question.id, question.type)"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="exam-main-right">
        <div
          class="exam-main-right-group"
          v-for="questionGroup in testPaperInfo.questionGroups"
          :key="questionGroup.id"
        >
          <div class="exam-main-right-group-title">
            {{ questionGroup.title }}
          </div>
          <div class="exam-main-right-group-answer">
            <span
              v-for="(question, index) in questionGroup.questions"
              :key="question.id"
              :class="[
                'exam-main-right-group-answer-status',
                {
                  'exam-main-right-group-answer-status-active':
                    judgeQuestionAnswer(question.id, question.type)
                }
              ]"
              >{{ index + 1 }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exam-header {
  padding: 0 10px;
  height: 60px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-title-wrapper {
    display: flex;
    align-items: center;
  }
  &-title {
    font-weight: bold;
    font-size: 20px;
    margin-right: 20px;
  }
  &-ddl {
    color: red;
  }
}
.exam-main {
  border-radius: 6px;
  margin-top: 20px;
  position: relative;
  padding-right: 200px;
  &-group {
    background: #fff;
    border-radius: 6px;
    & + & {
      margin-top: 10px;
    }
    &-title {
      font-size: 18px;
      line-height: 25px;
      padding: 10px;
      background: #fafafa;
      border-top: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
    }
    &-questions {
      padding: 16px;
    }
    &-question {
      display: flex;
      width: 100%;
      &-order {
        padding-right: 16px;
        font-size: 18px;
      }
      .question {
        flex: 1;
      }
    }
  }
  &-right {
    position: fixed;
    top: 180px;
    right: 24px;
    background: #fff;
    width: 180px;
    min-height: 300px;
    &-group {
      &-title {
        font-size: 14px;
        padding: 10px;
        background: #fafafa;
        border-top: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
      }
      &-answer {
        display: grid;
        padding: 10px;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 10px;
        &-status {
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 4px;
          background-color: #f4f4f5;
          border-color: #e9e9eb;
          color: #909399;
          &.exam-main-right-group-answer-status-active {
            background-color: #f0f9eb;
            border-color: #e1f3d8;
            color: #67c23a;
          }
        }
      }
    }
  }
}
</style>
