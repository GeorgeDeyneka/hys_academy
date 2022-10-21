const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const minify = require("gulp-minify");
const browsersync = require("browser-sync");

const dist = "./dist";

gulp.task("copy-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
  return gulp
    .src("./src/js/index.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "index.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                  plugins: ["@babel/plugin-proposal-class-properties"],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(dist + "/js"))
    .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(minify())
    .pipe(gulp.dest(dist + "/css"))
    .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
  gulp.src("./src/assets/fonts/**.*").pipe(gulp.dest(dist + "/assets/fonts"));

  return gulp
    .src("./src/assets/images/*.*")
    .pipe(gulp.dest(dist + "/assets/images"))
    .pipe(browsersync.stream());
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true,
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/fonts/**.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/assets/images/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task(
  "build",
  gulp.parallel("copy-html", "copy-assets", "build-sass", "build-js")
);

gulp.task("prod", () => {
  gulp.src("./src/index.html").pipe(gulp.dest(dist));
  gulp.src("./src/assets/images/*.*").pipe(gulp.dest(dist + "/assets/images"));
  gulp.src("./src/assets/fonts/**.*").pipe(gulp.dest(dist + "/assets/fonts"));
});

gulp.task("default", gulp.parallel("watch", "build"));
