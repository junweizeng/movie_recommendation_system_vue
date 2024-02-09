# 电影推荐系统（前端）

## 前言

总项目名称：`电影推荐系统`

项目采用`前后端分离`：

1. 前端：
   - 仓库地址：[movie_recommendation_system_vue](https://github.com/jun-wei-zeng/movie_recommendation_system_vue)
   - 技术栈：`Vue3` + `Element Plus` + `axios`等
2. 后端：
   - 仓库地址：[movie_recommendation_system_server](https://github.com/jun-wei-zeng/movie_recommendation_system_server)
   - 技术栈：`Spring Boot` + `Spring Security` + `Redis` + `MyBatis-Plus`等
3. 数据爬虫：
   - 简介：爬取项目所需的电影基本信息数据和用户评价数据等并存储。
   - 仓库地址：[douban_movie_spider_mrs](https://github.com/jun-wei-zeng/douban_movie_spider_mrs/tree/master)
   - 技术栈：`requests` + `lxml`

系统功能模块总览：

![系统功能模块.png](README_IMG/系统功能模块.png)

## 项目启动和编译

### 项目启动

Compiles and hot-reloads for development: 

```
npm run serve
```

### 项目编译

Compiles and minifies for production: 

```
npm run build
```

## 前端技术

- Vue3框架
- Element Plus组件库（基于 Vue 3，面向设计师和开发者的组件库）
- Axios库（一个基于 promise 的网络请求库）
- Echarts库（一个基于 JavaScript 的开源可视化图表库）
- vue-copper库（基于vue的优雅图片裁剪插件）
- ...

## 功能模块前端界面展示

### 基础功能模块

主要是游客可以查看的页面信息。

1. 主页面

![系统主页.png](README_IMG/系统主页.png)

2. 电影分类

![电影分类.png](README_IMG/电影分类.png)

3. 搜索电影

![搜索电影.png](README_IMG/搜索电影.png)

5. 查看电影详情

![查看电影详情.png](README_IMG/查看电影详情.png)

### 用户模块

主要包括用户登录、注册、修改个人信息、账号设置、查看电影评价、进行电影评价等功能。

1. 用户登录

![用户登录.png](README_IMG/用户登录.png)

2. 用户注册

![用户注册.png](README_IMG/用户注册.png)

3. 修改个人信息（包括头像、昵称、性别、电影特征偏好等）

![修改个人信息.png](README_IMG/修改个人信息.png)

4. 账号设置（包括密码修改、绑定邮箱等）

![img.png](README_IMG/账号设置.png)

5. 查看电影评价

    - 用户点赞：点赞功能在前端通过节流，来防止用户恶意点击。
    - 滚动置底加载：当滚轮滚动至底部时，加载新的评论。

![img.png](README_IMG/查看电影评价.png)

7. 进行电影评价

![img.png](README_IMG/进行电影评价.png)

8. 用户主页

![img.png](README_IMG/用户主页.png)

### 特色功能展示

1. 电影星球

主要展示用户看过电影和系统推荐电影之间的关系，用户可以点击电影结点，查看电影的详情页面。

![img.png](README_IMG/电影星球.png)

2. 评论词云图

将电影评论进行分词后，去除无关符号和词语，通过词云图展示电影的一些关键字信息。

![img.png](README_IMG/评论词云图.png)

### 界面自适应实现

1. 手机端展示

<div style="text-align: center;">
   <img src="README_IMG/手机端自适应_1.png" width=240 alt="手机端自适应_1" />
   <img src="README_IMG/手机端自适应_2.png" width=240 alt="手机端自适应_2" />
   <img src="README_IMG/手机端自适应_3.png" width=240 alt="手机端自适应_3" />
</div>

2. 平板端展示

<div style="text-align: center;">
   <img src="README_IMG/平板端自适应_1.png" width=390 alt="手机端自适应_1" />
   <img src="README_IMG/平板端自适应_2.png" width=390 alt="手机端自适应_2" />
</div>

<div style="text-align: center;">
   <img src="README_IMG/平板端自适应_3.png" width=390 alt="手机端自适应_1" />
   <img src="README_IMG/平板端自适应_4.png" width=390 alt="手机端自适应_2" />
</div>
