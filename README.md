# gulp-i18n-combine

在大型项目中，为了便于语言包的开发与维护，通常需要将语言包拆分成若干的小文件，这个插件的作用是将这些小文件合并成最终我们需要的单文件语言包。

### install

```
$ npn install gulp-i18n-combine --save-dev
```

### 合并分为两种模式：

#### mod: 1（默认值）

gulpfile.js

```js
var gulp = require('gulp'),
	i18n = require('gulp-i18n-combine');

gulp.task('i18n', ['i18nClean'], function () {
	return gulp.src('./src/**/zh-CN.json')
		.pipe(i18n()) // 默认采用模式1
		.pipe(gulp.dest('./dist/i18n/'));
});

gulp.task('default', ['i18n']);
```

对应源文件目录结构

```
└── src
    ├── components
    │   ├── header.vue
    │   ├── footer.vue
    │   ├── en-US.json
    │   └── zh-CN.json
    └── pages
        ├── home
        │   ├── home.vue
        │   ├── en-US.json
        │   └── zh-CN.json
        ├── foo
        │   ├── foo.vue
        │   ├── en-US.json
        │   └── zh-CN.json
        └── bar
            ├── bar.vue
            ├── en-US.json
            └── zh-CN.json
```

单文件内容

```json
// src/components/zh-CN.json
{
    "header": "头部",
    "footer": "脚部"
}

// src/pages/foo/zh-CN.json
{
    "name": "foo",
    "title": "欢迎来到 Foo"
}
```

#### mod: 2

gulpfile.js

```js
var gulp = require('gulp'),
	i18n = require('gulp-i18n-combine');

gulp.task('i18n', function () {
	return gulp.src('./src/i18n/**/*.json')
		.pipe(i18n({ mod: 2 })) // 采用模式2
		.pipe(gulp.dest('./dist/i18n/'));
});

gulp.task('default', ['i18n']);
```

对应源文件目录结构

```
└── src
    └── i18n
        ├── en-US
        │   ├── components.json
        │   └── pages
        │       ├── home.json
        │       ├── foo.json
        │       └── bar.json
        └── zh-CN
            ├── components.json
            └── pages
                ├── home.json
                ├── foo.json
                └── bar.json
```

单文件内容

```json
// src/i18n/zh-CN/components.json
{
    "header": "头部",
    "footer": "脚部"
}

// src/i18n/zh-CN/pages/foo.json
{
    "name": "foo",
    "title": "欢迎来到 Foo"
}
```

### 最终输出结果

输出后文件目录结构

```
└── dist
    └── i18n
        ├── en-US.json
        └── zh-CN.json
```

输出后文件内容

```json
// zh-CN.json
{
    "components": {
        "header": "头部",
        "footer": "脚部"
    },

    "pages": {
        "home": {
            "name": "home",
            "title": "欢迎来到 Home"
        },
        "foo": {
            "name": "foo",
            "title": "欢迎来到 Foo"
        },
        "bar": {
            "name": "bar",
            "title": "欢迎来到 Bar"
        }
    }
}
```

