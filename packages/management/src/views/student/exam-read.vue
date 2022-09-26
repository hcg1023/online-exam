<script setup lang="ts">
import { ref, computed } from "vue";
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
import { getTaskExamAnswer, submitJudge } from "/@/api/teacher";

const props = defineProps<{
  hasJudge: boolean;
}>();

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
const durationTimeStr = ref("");
const answerInfo = ref();
const questionAnswers = computed(() => answerInfo.value?.questionAnswers);

const questionAnswerScores = ref<
  {
    id: number;
    score: number;
  }[]
>([]);

function getQuestionScore(questionId: number) {
  let item = questionAnswerScores.value.find(item => item.id === questionId);
  if (!item) {
    item = {
      id: questionId,
      score: 0
    };
    questionAnswerScores.value.push(item);
  }
  return item.score;
}

function setQuestionScore(questionId: number, score: number) {
  const item = questionAnswerScores.value.find(item => item.id === questionId);
  item.score = score;
}

function getQuestionValue(questionId: number, questionType: QuestionTypeEnum) {
  const item = questionAnswers.value.find(
    item => item.questionId === questionId
  );
  if (questionType === QuestionTypeEnum.SHORT_ANSWER) {
    return item?.answer ?? "";
  }
  return item?.options ?? [];
}

function getQuestionResult(questionId: number) {
  const item = questionAnswers.value.find(
    item => item.questionId === questionId
  );
  return item.correctStatus
    ? item.score < item.question.score
      ? "error"
      : "ok"
    : "todo";
}
const resultFormatter = {
  error: "错误",
  ok: "正确",
  todo: "待批改"
};
function getQuestionResultFormatter(result: string) {
  return resultFormatter[result];
}

function getQuestionAnswer(question) {
  if (question.type === QuestionTypeEnum.SHORT_ANSWER) {
    return question.answer ?? "";
  }
  return (question.correctOptions ?? []).join(",");
}

function computedDuration() {
  const diff = answerInfo.value.duration;
  const hours = dayjs.duration(diff).hours();
  const minutes = dayjs.duration(diff).minutes();
  const seconds = dayjs.duration(diff).seconds();
  return `${hours ? `${hours}小时` : ""}${
    minutes ? `${minutes}分钟` : ""
  }${seconds}秒`;
}

const submitLoading = ref(false);
async function handlerSubmitJudge() {
  if (!props.hasJudge) {
    return;
  }
  submitLoading.value = true;
  await submitJudge({
    answerId: answerInfo.value.id,
    questionAnswers: questionAnswerScores.value
  });
  submitLoading.value = false;
  window.close();
}

(route.query.userId
  ? getTaskExamAnswer(
      route.query.taskId as string,
      route.query.testPaperId as string,
      Number(route.query.userId as string)
    )
  : getTestPaperReadInfo(
      route.query.taskId as string,
      route.query.testPaperId as string
    )
).then(({ data }) => {
  testPaperInfo.value = data.testPaper;
  answerInfo.value = data.answer;
  durationTimeStr.value = computedDuration();
});
</script>

<template>
  <div v-if="testPaperInfo">
    <div class="exam-header">
      <div class="exam-header-title-wrapper">
        <span class="exam-header-title">{{ testPaperInfo.title }}</span>
        <div>
          <div>得分：{{ answerInfo.score }}/{{ testPaperInfo.totalScore }}</div>
          <div>耗时：{{ durationTimeStr }}</div>
        </div>
      </div>
    </div>
    <div class="exam-main">
      <div
        class="exam-main-group"
        v-for="questionGroup in testPaperInfo.questionGroups"
        :key="questionGroup.id"
      >
        <div class="exam-main-group-title">{{ questionGroup.title }}</div>
        <div class="exam-main-group-questions">
          <template
            v-for="(question, questionIndex) in questionGroup.questions"
            :key="question.id"
          >
            <div class="exam-main-group-question">
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
            <div class="exam-main-group-question-item">
              <span>正确答案：</span>
              <span>{{ getQuestionAnswer(question) }}</span>
            </div>
            <div class="exam-main-group-question-item">
              <span>结果：</span>
              <span
                :class="[
                  'exam-main-group-question-item-status',
                  `exam-main-group-question-item-status-${getQuestionResult(
                    question.id,
                    question.type
                  )}`
                ]"
                >{{
                  getQuestionResultFormatter(
                    getQuestionResult(question.id, question.type)
                  )
                }}</span
              >
            </div>
            <div class="exam-main-group-question-item">
              <span>难度：</span>
              <span>
                <el-rate disabled v-model="question.difficulty" />
              </span>
            </div>
            <div class="exam-main-group-question-item">
              <span>解析：</span>
              <span>{{ question.analyze }}</span>
            </div>
            <div
              v-if="hasJudge && getQuestionResult(question.id) === 'todo'"
              class="exam-main-group-question-item"
            >
              <span>批改：</span>
              <span>
                <el-input-number
                  :max="question.score"
                  :min="0"
                  :model-value="getQuestionScore(question.id)"
                  @change="$event => setQuestionScore(question.id, $event)"
                />
              </span>
            </div>
          </template>
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
                `exam-main-right-group-answer-status-${getQuestionResult(
                  question.id
                )}`
              ]"
              >{{ index + 1 }}</span
            >
          </div>
        </div>
        <div v-if="hasJudge" class="exam-main-right-bottom">
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="handlerSubmitJudge"
            >批改完成</el-button
          >
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
      margin-bottom: 12px;
      &-order {
        padding-right: 16px;
        font-size: 18px;
      }
      .question {
        flex: 1;
      }
    }
    &-question-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      span:first-child {
        margin-right: 16px;
      }
      &-status {
        padding: 3px 6px;
        border: 1px solid;
        border-radius: 4px;
        font-size: 14px;
        &-error {
          background-color: #ffeded;
          border-color: #ffdbdb;
          color: #ff4949;
        }
        &-ok {
          background-color: #e7faf0;
          border-color: #d0f5e0;
          color: #13ce66;
        }
        &-todo {
          background-color: #fdf6ec;
          border-color: #faecd8;
          color: #e6a23c;
        }
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
          &.exam-main-right-group-answer-status-ok {
            background-color: #f0f9eb;
            border-color: #e1f3d8;
            color: #67c23a;
          }
          &.exam-main-right-group-answer-status-error {
            background-color: #ffeded;
            border-color: #ffdbdb;
            color: #ff4949;
          }
          &.exam-main-right-group-answer-status-todo {
            background-color: #fdf6ec;
            border-color: #faecd8;
            color: #e6a23c;
          }
        }
      }
    }
    &-bottom {
      position: absolute;
      bottom: 16px;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
