const del = require('del');
const gulp = require('gulp');

const cleanCss = require('gulp-clean-css');
const connect = require('gulp-connect');
const eslint = require('gulp-eslint');
const minify = require('gulp-babel-minify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');

////////////////////////////////////////////////////////////////////////////////

function cleanup() {
	return del('dist');
}

////////////////////////////////////////////////////////////////////////////////

function buildBundle() {
	const webpackConfig = require('./webpack.config.js');
	return new Promise((resolve, reject) => {
		webpack(webpackConfig, (err, stats) => {
			if (err) {
				return reject(err);
			}
			if (stats.hasErrors()) {
				return reject(new Error(stats.compilation.errors.join('\n')));
			}
			resolve();
		});
	});
}

const buildJsSrc = ['src/**/*.js', 'src/**/*.mjs'];
function buildJs() {
	return gulp.src(buildJsSrc, { since: gulp.lastRun(buildJs) })
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(sourcemaps.init())
		.pipe(minify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'));
}
function watchJs() {
	gulp.watch(buildJsSrc, (gulp.series(buildJs, buildBundle)));
}

const buildScripts = gulp.parallel(gulp.series(buildJs, buildBundle));
const watchScripts = gulp.parallel(watchJs);

////////////////////////////////////////////////////////////////////////////////

const buildStyleCssSrc = ['src/**/*.css'];
function buildStyleCss() {
	return gulp.src(buildStyleCssSrc, { since: gulp.lastRun(buildStyleCss) })
		.pipe(sourcemaps.init())
		.pipe(cleanCss())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'));
}
function watchStyleCss() {
	gulp.watch(buildStyleCssSrc, buildStyleCss);
}

const buildStyleScssSrc = ['src/**/*.scss'];
function buildStyleScss() {
	return gulp.src(buildStyleScssSrc, { since: gulp.lastRun(buildStyleScss) })
		.pipe(sass())
		.pipe(sourcemaps.init())
		.pipe(cleanCss())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'));
}
function watchStyleScss() {
	gulp.watch(buildStyleScssSrc, buildStyleScss);
}

const buildStyles = gulp.parallel(buildStyleCss, buildStyleScss);
const watchStyles = gulp.parallel(watchStyleCss, watchStyleScss);

////////////////////////////////////////////////////////////////////////////////

const buildHtmlSrc = ['src/**/*.html'];
function buildHtml() {
	return gulp.src(buildHtmlSrc, { since: gulp.lastRun(buildHtml) })
		.pipe(gulp.dest('dist'));
}
function watchHtml() {
	gulp.watch(buildHtmlSrc, buildHtml);
}

const buildDocuments = gulp.parallel(buildHtml);
const watchDocuments = gulp.parallel(watchHtml);

////////////////////////////////////////////////////////////////////////////////

exports.default = gulp.series(cleanup, gulp.parallel(buildScripts, buildStyles, buildDocuments));

const watch = gulp.parallel(watchScripts, watchStyles, watchDocuments);
exports.watch = gulp.series(exports.default, watch);

function serve() {
	connect.server({
		livereload: true,
		port: 8080,
		root: '.'
	});
}
exports.serve = gulp.series(exports.default, gulp.parallel(serve, watch));
