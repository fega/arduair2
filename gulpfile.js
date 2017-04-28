const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const mocha = require('gulp-mocha')
// const istanbul = require('gulp-istanbul')
const plumber = require('gulp-plumber')
const src = gulp.src
const watch = gulp.watch

gulp.task('nodemon', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('test', (cb) => {
  let mochaErr
  src('./test/server/ServerSpec.js', {read: false})
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    // .pipe(istanbul.writeReports())
    .on('error', (err) => { mochaErr = err })
    .on('end', () => cb(mochaErr))
})

gulp.task('default', ['nodemon', 'test'], function () {
  watch('./**/*.js', ['test'])
})
