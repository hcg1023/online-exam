<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { IdentityEnum } from '@online-exam/contants'

const userInfo = reactive({
  name: '',
  password: '',
  identity: IdentityEnum.STUDENT,
})

const handlerLogin = () => {
  console.log(userInfo)
}
</script>

<template>
  <a-layout h="100%">
    <a-layout-content flex items-center justify-center>
      <div w="380px" h="380px" flex bg-white shadow shadow-gray shadow-xl>
        <a-card w="100%" text-center title="晨光在线考试系统" bordered>
          <a-card-body>
            <a-form layout="vertical">
              <a-form-item label="选择您的身份">
                <a-radio-group
                  v-model:value="userInfo.identity"
                  size="large"
                  button-style="solid"
                  flex
                  w="100%"
                >
                  <a-radio-button :value="IdentityEnum.STUDENT" flex-auto
                    >学生</a-radio-button
                  >
                  <a-radio-button :value="IdentityEnum.TEACHER" flex-auto
                    >老师</a-radio-button
                  >
                  <a-radio-button :value="IdentityEnum.ADMIN" flex-auto
                    >管理员</a-radio-button
                  >
                </a-radio-group>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model:value="userInfo.name"
                  size="large"
                  prefix-icon="user"
                  placeholder="请输入用户名"
                >
                  <template #prefix>
                    <user-outlined type="user" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input-password
                  v-model:value="userInfo.password"
                  size="large"
                  prefix-icon="lock"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <lock-outlined />
                  </template>
                </a-input-password>
              </a-form-item>
            </a-form>
          </a-card-body>
          <a-card-footer>
            <div>
              <a-button type="primary" w="100%" @click="handlerLogin"
                >登录</a-button
              >
            </div>
          </a-card-footer>
        </a-card>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<route lang="yaml">
meta:
layout: home
</route>
