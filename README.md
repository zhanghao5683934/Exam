
<h1 align="center">在线考试答题系统</h1>

<h5 align="center"></h5>
<div align="center">

 [![](https://img.shields.io/badge/QQ群-995910672-red)](https://qm.qq.com/cgi-bin/qm/qr?k=JShAyXeoKqg2lWFEUSElxELImhjeMG4y&jump_from=webapi)

------------------------------------------------------------------------
</div>

#### 项目介绍
本系统可以应用于考试，答题，刷题，知识竞赛，活动答题，题库等场景，满足各种答题刷题的使用！

#### 演示图片
![输入图片说明](wanyue-kaoshi/%E5%BC%80%E6%BA%90%E5%9C%A8%E7%BA%BF%E7%AD%94%E9%A2%98%E9%A6%96%E9%A1%B5.png)
![输入图片说明](wanyue-kaoshi/%E5%BC%80%E6%BA%90%E5%9C%A8%E7%BA%BF%E7%AD%94%E9%A2%98%E9%A1%B5%E9%9D%A2.png)
![输入图片说明](wanyue-kaoshi/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220303152255.png)
![输入图片说明](wanyue-kaoshi/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220303152305.png)
![输入图片说明](wanyue-kaoshi/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220303152331.png)

#### 安装教程

##### 1. 安装Hbuilder编辑工具

uni-app官方推荐的轻量级代码IDE工具, Hbuilder[下载地址](http://www.dcloud.io/hbuilderx.html)，具体安装流程官方网站上写的很详细, 用户可以选择对应您本地系统环境的版本下载.

##### 2. 导入项目
克隆下来之后, 打开Hbuilder编辑器. 选择文件, 导入或打开目录即可.

##### 3.  运行
运行分3种方式, APP运行、小程序、H5

#### 主要特性
  
1. 一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序
1. 依托Dcloud公司强大的生态圈, 开发者无论是拿来直接用还是自己修改后使用都十分的方便, 网上资料/文档齐全,无需担心bug解决不了.
1. 项目占用空间小,全部加起来不到2MB,占用开发者磁盘空间极少.
1. 代码中做了多端适配, 小程序端、H5端、安卓、IOS端样式都做到了样式兼容.
1. vue开发, 保证了样式美观的同时, 规避了nvue样式的兼容问题.
1. 配置方便, 无需安装, 下载之后使用Hbuilder编辑器即可运行查看. 

#### 目录说明
```           
├─.hbuiderx        		// colorui插件依赖
├─.idea              	// 项目相关公共js方法
│	├─amap-wx.js		// 高德地图依赖js
│	├─classify.data.js	// 模拟数据
│	├─geocode-utils.js	// 腾讯地图方法封装
│	├─projectData.js	// 项目模拟数据
│	├─qqmap-wx-jssdk.js	// 腾讯地图依赖js
│	├─request.js		// 数据请求封装
│	└─uiImg.js			// 模拟数据
│
├─components          	// 项目中使用到的功能封装	
│
├─pages      			// 页面入口文件夹
│	├─index				// 首页
│	├─my				// 个人中心
│	├─login				// 登录页面
│	├─notice			// 工作提示
│	├─ranking			// 排行榜
│	├─question			// 在线答题
│	├─answer_history		// 答题记录
│	├─forget			// 修改密码
│	└─my_update			// 展示用户信息
│
├─static            	// 静态资源
├─unpackage
├─util				// 请求接口
├─App.vue				// vue项目入口文件
├─main.js				// 公共js
├─manifest.json			// 基础配置 
├─pages.json			// 页面路由配置页
├─project.config.json			// 项目配置文件
└─uni.scss				// uniapp内置的常用样式变量

```

#### 注意事项

- windows系统用安卓机
- MAC系统用苹果机,
- 小程序需要下载微信开发者工具, 并配置APPID和运行路径
- H5直接运行即可

#### 技术交流

##### 官方QQ技术交流群

> QQ群：995910672
 <img class="kefu_weixin" style="float:left;" src="https://images.gitee.com/uploads/images/2021/0524/181101_c6bda503_2242923.jpeg" width="102" height="102"/>
>
