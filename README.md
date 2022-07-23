# monorepo project

## 使用这个模板

1. 点击 Use this template
2. 修改 package.json 的 repository 信息
3. 如果需要使用 github actions，需要在仓库的设置`Settings/Actions/General/Workflow permissions`中选择`Read and write permissions`和`Allow GitHub Actions to create and approve pull requests`

4. 非特殊情况不要在 main 分支开发，而是通过 feature 分支 pull request 合并到 main 分支
5. 在 github apps 仓库中安装 changeset-bot，并使它对当前仓库生效
6. 使用 github actions 自动部署 gh-pages，需要检查`.github/workflows/deploy.yml`和`.github/workflows/publish.yml`中的环境变量，是否是指定的项目
7. 第一次部署，请检查 GitHub Pages 是设置了对应的 Source 分支和目录，分支是 gh-pages 分支，目录一般是根目录
8. 如果需要 npm 功能，请在仓库的设置`settings/Secrets/Actions`中添加 NPM_TOKEN，点击`New repository secret`按钮添加即可

## 工作流

1. 使用 feature 分支开发
2. 提交 pull request 到 main 分支
3. 合并 pull request 到 main 分支
4. 此时 changesets-bot 会创建一个**Release From Changeset**的 pull request
5. 如果需要继续开发，请继续其他的开发，重复 1-3 步骤
6. 开发完成，需要发布 npm，就将**Release From Changeset**的 pull request 合并到 main 分支
7. 此时会自动发布到 npm 以及 gh-pages
8. 如果在其它时间想要发布 gh-pages，可以在 Actions 中手动点击 deploy 的 run workflow 按钮

## package.json 命令详解

### preinstall

必须使用 pnpm 进行安装，否则会报错

### prepare

初始化 husky

### test

单元测试

### lint

eslint 代码校验

### lint:style

stylelint 代码校验

### prettier

prettier 代码格式化

### lint-staged

提供给 husky 配置的 pre-commit hook

### commitlint

提供给 husky 配置的 commit-msg hook

### pack-version

在 github action ci 中使用 changesets 构建版本号

### release

使用 pnpm 发布 npm 包，并且使用 changesets 构建 tag 和 release 版本号

### publish-success

发布 npm 包成功之后的 hook
