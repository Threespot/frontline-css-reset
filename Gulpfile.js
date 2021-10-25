'use strict';
// -----------------------------------------------------------------------------
// Sass
// -----------------------------------------------------------------------------
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const pixrem = require('gulp-pixrem');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');
const notify = require('gulp-notify');

//------------------------------------------------------------------------
// Error handling
//------------------------------------------------------------------------
const handleErrors = function(errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') {
    this.emit('end');
  }
};

//------------------------------------------------------------------------
// Build
//------------------------------------------------------------------------
gulp.task('sass', function() {
  return gulp.src('*.scss')
  .pipe( sass({
      outputStyle: 'expanded',
      precision: 6
    }))
    .on('error', handleErrors)
    // Add rem fallbacks using pixrem
    .pipe( pixrem() )// options https://github.com/robwierzbowski/node-pixrem#options
    .on('error', handleErrors)
    .pipe( autoprefixer({ cascade: false }) )
    .on('error', handleErrors)
    .pipe( gulp.dest('./dist'))
    // Minify
    .pipe( minifyCSS({
      advanced: false,
      // TODO: urlQuotes does not seem to be working
      compatibility: {
        '*': {
          properties: {
            urlQuotes: true// Required for inline SVGs
          }
        }
      }
    }))
    .pipe( rename({ suffix: '.min' }) )
    .pipe( gulp.dest('./dist'))
});

// -----------------------------------------------------------------------------
// Lint
// -----------------------------------------------------------------------------
const sassLint = require('gulp-sass-lint');

gulp.task('lint', function() {
  return gulp.src('*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------
gulp.task('default', gulp.series('sass', 'lint'));