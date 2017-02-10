在大型项目中，为了便于语言包的开发与维护，通常需要将语言包拆分成若干的小文件，这个插件的作用是将这些小文件合并成最终我们需要的单文件语言包。

### install

```
$ npn install gulp-i18n-combine --save-dev
```

### Example

```js
var gulp = require('gulp'),
	i18n = require('gulp-i18n-combine'),
	clean = require('gulp-clean');

gulp.task('i18n', function () {
	gulp.src('./dist/i18n', { read: false })
		.pipe(clean());

	gulp.src('./src/i18n/**/*.json')
		.pipe(i18n())
		.pipe(gulp.dest('./dist/i18n'));
});

gulp.task('default', ['i18n']);
```

### File structure

```
├── src
│   └── i18n
│       ├── en
│       │   ├── menu.json
│       │   └── home.json
│       └── zh
│           ├── menu.json
│           └── home.json
└── dist
    └── i18n
        ├── en.json
        └── zh.json
```

### Json structure

```json
// menu.json
{
	"menu1": "菜单1",
	"menu2": "菜单2"
}

// home.json
{
	"home": "首页",
	"welcome": "欢迎"
}

// zh.json
{
	"menu": {
		"menu1": "菜单1",
		"menu2": "菜单2"
	},

	"home": {
		"home": "首页",
		"welcome": "欢迎"
	}
}
```

