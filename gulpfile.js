const gulp = require('gulp');
const fileInline = require('gulp-file-inline');
const liveServer = require('live-server');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function css(cb) {
  console.log('css?');
  gulp
    .src('src/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
  cb();
}

function inline(cb) {
  gulp
    .src('src/index.html')
    .pipe(fileInline({
      css: {
        minify: true,
      },
      js: {
        minify: false, // breaks because of uglify's parser
      },
    }))
    .pipe(gulp.dest('dist/'));
  cb();
};

function watch() {
  liveServer.start({
    root: 'dist/',
  })
  gulp.watch('src/*', gulp.series(css, inline));
}

exports.watch = watch;
exports.build = gulp.series(css, inline);
