# React / AntDesign 应用

2019/5/22 11:31:13 

根据最近学习React做了一些总结，与大家交流一下学习React的一些经验，简单从 React如何安装、第三方组件库的使用、以及react与vue框架的区别做了一些汇总

> 使用 React 官方推荐的脚手架创建项目

> 阿里 AntDesign 组件库应用

> 阿里 AntDesignPro 开箱即用的 **中台前端/设计解决方案**

> React 与 Vue 差异

> React 学习相关文档地址




## React 安装
### [yarn](https://yarnpkg.com/zh-Hans/)

    $ yarn create react-app antd-demo
	$ cd antd-demo
	$ yarn start

### [npm](https://www.npmjs.com/)
	$ npm init react-app antd-demo
	$ cd antd-demo
	$ npm start


### [UmiJs](https://umijs.org/)
	mkdir react-app && cd react-app
	umi g page index
	umi g page users
	umi dev


## Ant Design
请移步 [阿里开源组件库](https://ant.design/index-cn) 官方文档




## Ant Design Pro
### 前序准备
你的本地环境需要安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。技术栈基于 ES2015+、React、[UmiJS](https://umijs.org/)、[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)、[g2](https://antv.alipay.com/zh-cn/g2/3.x/index.html) 和 [antd](https://ant.design/docs/react/introduce-cn)，需要提前了解和学习这些知识才行。

UmiJS：官方称之为**可插拔的企业级 react 应用框架** 具有如下特点

> 插件化：内部实现就是由大量插件组成   
> 开箱即用：你只需一个 umi 依赖就可启动开发，无需安装 react、preact、webpack、react-router、babel、jest 等等  
> 约定式路由：根据目录约定，无需再维护一份冗余的路由配置，支持权限、动态路由、嵌套路由等等 

Dva：基于 redux、redux-saga 和 react-router 的轻量级前端框架

### 安装
从 GitHub 仓库中直接安装最新的脚手架代码。  
   
	$ git clone --depth=1 https://github.com/ant-design/ant-design-pro.git my-project
	$ cd my-project

安装依赖、启动项目。

	npm install
	npm start

启动完成后会自动打开浏览器访问 *http://localhost:8000* 就代表成功了。


接下来就可以修改代码进行业务开发了，框架内建了典型业务模板、常用业务组件、模拟数据、实时预览、状态管理、国际化、全局路由等，相关使用说明请查看官方文档

### 目录结构
	├── config                   # umi 配置，包含路由，构建等配置
	├── mock                     # 本地模拟数据
	├── public
	│   └── favicon.png          # Favicon
	├── src
	│   ├── assets               # 本地静态资源
	│   ├── components           # 业务通用组件
	│   ├── e2e                  # 集成测试用例
	│   ├── layouts              # 通用布局
	│   ├── models               # 全局 dva model
	│   ├── pages                # 业务页面入口和常用模板
	│   ├── services             # 后台接口服务
	│   ├── utils                # 工具库
	│   ├── locales              # 国际化资源
	│   ├── global.less          # 全局样式
	│   └── global.js            # 全局 JS
	├── tests                    # 测试工具
	├── README.md
	└── package.json


### 添加新页面
1. 在 src/pages 下新建页面的 js 及 less 文件。   
1. 加入菜单和路由  
1. 新增 model、service  




## React 与 Vue 差异
### Css作用域
- Vue 通过在style上添加 scoped 属性来实现  
- React 通过CSS Modules 实现

### 双向绑定
- Vue 双向数据流  
- React 单项数据流

### 路由
- Vue [静态路由](https://router.vuejs.org/zh/)（初始化之前提前配置好）
- React [动态路由](https://reacttraining.com/react-router/web/example/recursive-paths)（运行中创建的路由）

### 组件格式
Vue 组件

    <template>
		<div class="box">{{msg}}</div>
	</template>

	<script>
		export default {
  			data() {
    			return {
					msg:"我是一个Vue组件"
				}
			}
		}
	</script>	

	<style lang="scss" scoped>
		.box{
			color:red;
		}
	</style>

React 组件

	import React, { Component } from 'react';
	import styles from './styles.less';
	
	class List extends PureComponent {
		state = {
		   msg:"我是一个React组件"
		}

		render() {
			return (<div>{this.state.msg}</div>)
		}
	}

生命周期对应  

- componentWillUnmount == beforeDestroy 在卸载和销毁组件之前立即调用
- componentDidMount == mounted 组件插入DOM后立即调用
- componentDidUpdate == updated 组件更新后立即调用

## 相关链接：   
React中文文档：[https://zh-hans.reactjs.org](https://zh-hans.reactjs.org)   
React 生命周期：[http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)  
React Router：[https://reacttraining.com/react-router/web/guides/quick-start](https://reacttraining.com/react-router/web/guides/quick-start)  
Redux：[https://redux.js.org/](https://redux.js.org/)  
Redux-saga：[https://redux-saga.js.org](https://redux-saga.js.org/)  
AntDesign：[https://ant.design/index-cn](https://ant.design/index-cn)   
AntDesign Pro：[https://pro.ant.design/index-cn](https://pro.ant.design/index-cn)  
Es6 教程：[http://es6.ruanyifeng.com](http://es6.ruanyifeng.com)
