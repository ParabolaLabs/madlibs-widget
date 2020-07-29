const gulp = require('gulp');
const fileInline = require('gulp-file-inline');
const liveServer = require('live-server');

function build() {
  return gulp
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
};

function watch() {
  liveServer.start({
    root: 'dist/',
  })
  gulp.watch('src/*', build);
}

exports.watch = watch;
exports.build = build
