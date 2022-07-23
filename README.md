# monorepo project

## 使用这个模板
1. 点击Use this template
2. 修改package.json的repository信息
3. 如果需要使用github actions，需要在仓库的设置`Settings/Actions/General/Workflow permissions`中选择`Read and write permissions`和`Allow GitHub Actions to create and approve pull requests`

4. 非特殊情况不要在main分支开发，而是通过feature分支pull request合并到main分支
5. 在github apps仓库中安装changeset-bot，并使它对当前仓库生效
6. 使用github actions自动部署gh-pages，需要检查`.github/workflows/deploy.yml`和`.github/workflows/publish.yml`中的环境变量，是否是指定的项目
7. 第一次部署，请检查GitHub Pages是设置了对应的Source分支和目录，分支是gh-pages分支，目录一般是根目录
8. 如果需要npm功能，请在仓库的设置`settings/Secrets/Actions`中添加NPM_TOKEN，点击`New repository secret`按钮添加即可

## 工作流
1. 使用feature分支开发
2. 提交pull request到main分支
3. 合并pull request到main分支
4. 此时changesets-bot会创建一个**Release From Changeset**的pull request
5. 如果需要继续开发，请继续其他的开发，重复1-3步骤
6. 开发完成，需要发布npm，就将**Release From Changeset**的pull request合并到main分支
7. 此时会自动发布到npm以及gh-pages
8. 如果在其它时间想要发布gh-pages，可以在Actions中手动点击deploy的run workflow按钮

## package.json命令详解
### preinstall
必须使用pnpm进行安装，否则会报错
### prepare
初始化husky
### test
单元测试
### lint
eslint代码校验
### lint:style
stylelint代码校验
### prettier
prettier代码格式化
### lint-staged
提供给husky配置的pre-commit hook
### commitlint
提供给husky配置的commit-msg hook
### pack-version
在github action ci中使用changesets构建版本号
### release
使用pnpm发布npm包，并且使用changesets构建tag和release版本号
### publish-success
发布npm包成功之后的hook
