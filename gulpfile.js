const gulp = require("gulp");
const clean = require("gulp-clean");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const minify = require("gulp-minify");
const browsersync = require("browser-sync");
const ghPages = require("gh-pages");
const path = require("path");

const outputDir = "./docs";
const deployDir = "docs";

const src = {
  htmlDir: "./src/index.html",
  fontsDir: "./src/assets/fonts/**.*",
  imagesDir: "./src/assets/images/*.*",
  stylesDir: "./src/scss/**/*.scss",
  tsDir: "./src/ts/**/*.ts",
};

const build = {
  htmlDir: outputDir,
  fontsDir: outputDir + "/assets/fonts",
  imagesDir: outputDir + "/assets/images",
  stylesDir: outputDir + "/css",
  jsDir: outputDir + "/js",
};

gulp.task("copy-html", () => {
  return gulp
    .src(src.htmlDir)
    .pipe(gulp.dest(build.htmlDir))
    .pipe(browsersync.stream());
});

gulp.task("copy-fonts", () => {
  return gulp
    .src(src.fontsDir)
    .pipe(gulp.dest(build.fontsDir))
    .pipe(browsersync.stream());
});

gulp.task("copy-images", () => {
  return gulp
    .src(src.imagesDir)
    .pipe(gulp.dest(build.imagesDir))
    .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
  return gulp
    .src(src.stylesDir)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(minify())
    .pipe(gulp.dest(build.stylesDir))
    .pipe(browsersync.stream());
});

gulp.task("build-ts", () => {
  return gulp
    .src(src.tsDir)
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
    .pipe(gulp.dest(build.jsDir))
    .pipe(browsersync.stream());
});

// gulp.task("clean", () => {
//   console.log("Clean all files in build folder...");
//   return gulp
//     .src(outputDir, { read: false })
//     .pipe(clean({ force: true, allowEmpty: true }))
//     .pipe(gulp.dest(outputDir));
// });

gulp.task("start-server", () => {
  browsersync.init({
    server: outputDir,
    port: 8080,
    notify: true,
  });
});

gulp.task(
  "build",
  // gulp.series(
  // "clean",
  gulp.parallel(
    "copy-html",
    "copy-fonts",
    "copy-images",
    "build-sass",
    "build-ts"
  )
  // )
);

gulp.task("watch", () => {
  gulp.watch(src.htmlDir, gulp.parallel("copy-html"));
  gulp.watch(src.fontsDir, gulp.parallel("copy-fonts"));
  gulp.watch(src.imagesDir, gulp.parallel("copy-images"));
  gulp.watch(src.stylesDir, gulp.parallel("build-sass"));
  gulp.watch(src.tsDir, gulp.parallel("build-ts"));
});

gulp.task("dev", gulp.parallel("start-server", "build", "watch"));

gulp.task(
  "deploy",
  gulp.parallel("build", function (cb) {
    ghPages.publish(path.join(process.cwd(), deployDir), cb);
  })
);
