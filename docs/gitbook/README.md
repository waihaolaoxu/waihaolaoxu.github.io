# GitBook 使用介绍

首先需要你的系统有node环境及npm工具

## 安装


执行安装命令 

	npm install gitbook-cli -g
	
验证安装成功

	$ gitbook -V
	CLI version: 2.3.2
	GitBook version: 3.2.3

## 常用命令

	gitbook init // 初始化gitbook项目
	gitbook serve // 启动预览模式
	gitbook build // 生成html

### 所有命令

	    build [book] [output]       build a book
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)
        --format                Format to build to (Default is website; Values are website, json, ebook)
        --[no-]timing           Print timing debug information (Default is false)

    serve [book] [output]       serve the book as a website for testing
        --port                  Port for server to listen on (Default is 4000)
        --lrport                Port for livereload server to listen on (Default is 35729)
        --[no-]watch            Enable file watcher and live reloading (Default is true)
        --[no-]live             Enable live reloading (Default is true)
        --[no-]open             Enable opening book in browser (Default is false)
        --browser               Specify browser for opening book (Default is )
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)
        --format                Format to build to (Default is website; Values are website, json, ebook)

    install [book]              install all plugins dependencies
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)

    parse [book]                parse and print debug information about a book
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)

    init [book]                 setup and create files for chapters
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)

    pdf [book] [output]         build a book into an ebook file
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)

    epub [book] [output]        build a book into an ebook file
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)

    mobi [book] [output]        build a book into an ebook file
        --log                   Minimum log level to display (Default is info; Values are debug, info, warn, error, disabled)

## 配置
可以在根目录创建 book.json 配置文件，下面列举常用字段配置：
	
	{
	  "title": "书本的标题",
	  "author": "作者",
	  "description": "描述",
	  "language": "zh-hans",
	  "plugins": ["expandable-chapters"]
	}

**language**  Gitbook使用的语言, 可选的语言如下：

	en, ar, bn, cs, de, en, es, fa, fi, fr, he, it, ja, ko, no, pl, pt, ro, ru, sv, uk, vi, zh-hans, zh-tw

## 问题

windows 下执行 gitbook serve 当文件发生变化后服务直接挂掉导致不能实时预览，解决办法是启动服务后 手动删除目录下自动生成的 _book文件夹即可 