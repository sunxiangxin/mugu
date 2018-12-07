// 引入gulp自动化构建工具模块
const gulp = require("gulp");
// 引入服务器模块
const connect = require("gulp-connect");
// 引入反向代理模块，处理跨域问题
const proxy = require("http-proxy-middleware");
// 引入压缩css及编译sass文件模块
const scssToCss = require("gulp-sass");

// 压缩并编译sass
// gulp.task("scssToCss", function () {
//     gulp.src("src/sass/**/*")
//         .pipe(scssToCss({
//             // sass编译后转换成的样式，开发阶段此处暂不压缩
//             outputStyle: "expanded"
//         }))
//         // sass编译之后的输出位置
//         .pipe(gulp.dest("src/css/index"));
// });

// 监听sass文件变化
// gulp.task("watch-scss", function () {
//     gulp.watch("src/sass/**/*", ["scssToCss"]);
// });

// 开启服务器：端口号为6060
gulp.task("startServer", function () {
    connect.server({
        // 根路径
        root: "./src",
        // 端口号
        port: 6060,
        // 是否更新
        livereload: true,
        middleware: function () {
            return [

                // 反向代理，把端口号代理到官网的接口https://api.mogujie.com/h5/mwp.shopappservice.goodsAll/1
                proxy("/h5", {
                    target: "https://api.mogujie.com",
                    // target: "https://www.newegg.cn",
                    changeOrigin: true
                }),
            ];
        }
    });
});

// 监听总开关
gulp.task("F5", ["startServer"]);