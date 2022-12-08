const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const minify = require("gulp-minify");
const browsersync = require("browser-sync");

const docs = "./docs";

gulp.task("copy-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest(docs))
    .pipe(browsersync.stream());
});

gulp.task("build-ts", () => {
  return gulp
    .src("./src/ts/index.ts")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "index.js",
        },
        watch: false,
        resolve: {
          extensions: [".ts", ".tsx", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              loader: "ts-loader",
            },
          ],
        },
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(docs + "/js"))
    .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(minify())
    .pipe(gulp.dest(docs + "/css"))
    .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
  gulp.src("./src/assets/fonts/**.*").pipe(gulp.dest(docs + "/assets/fonts"));

  return gulp
    .src("./src/assets/images/*.*")
    .pipe(gulp.dest(docs + "/assets/images"))
    .pipe(browsersync.stream());
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./docs/",
    port: 8080,
    notify: true,
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/fonts/**.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/assets/images/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
  gulp.watch("./src/ts/**/*.ts", gulp.parallel("build-ts"));
});

gulp.task(
  "build",
  gulp.parallel("copy-html", "copy-assets", "build-sass", "build-ts")
);

gulp.task("prod", () => {
  gulp.src("./src/index.html").pipe(gulp.dest(docs));
  gulp.src("./src/assets/images/*.*").pipe(gulp.dest(docs + "/assets/images"));
  gulp.src("./src/assets/fonts/**.*").pipe(gulp.dest(docs + "/assets/fonts"));
});

gulp.task("default", gulp.parallel("watch", "build"));
