const autoprefixer = require('gulp-autoprefixer')
const fs = require('fs')
const chalk = require('chalk')
const clean = require('gulp-clean')
const copy = require('copy')
const gulp = require('gulp')
const path = require('path')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const webpack = require('webpack-stream')
const BrowserSync = require('browser-sync').create()
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const BUILD_DIR  = path.resolve(__dirname, 'build')
const SOURCE_DIR = path.resolve(__dirname, 'src')
const LIBS_DIR   = path.resolve(__dirname, 'lib')

const JS_FILES = `${SOURCE_DIR}/**/*.js`
const SASS_FILES = `${SOURCE_DIR}/**/*.sass`
const HTML_FILES = `${SOURCE_DIR}/**/*.html`

function getBundle(folder) {
  if (folder === '.DS_Store') return false

  // Create bundle map
  const bundle = {}
  fs.readdirSync(`./src/${folder}`).map(file => {
    if (file === '.DS_Store') return
    bundle.folder = folder
    if (file.includes('.js')) bundle.js = file
    if (file.includes('.sass')) bundle.css = file
    if (file.includes('.html')) bundle.html = true
    if (file.includes('images')) bundle.images = true
  })

  return bundle
}

function buildPrototype(bundle) {
  if (!bundle) return
  compileCSS(bundle, false)
  compileJS(bundle, false)
  copyImages(bundle)
  copyHtml(bundle)
}

function compileCSS(bundle, minify) {
  const { folder, css } = bundle
  const SASS_ENTRY = `${SOURCE_DIR}/${folder}/${css}`
  const OUTPUT_DIR = `${BUILD_DIR}/${folder}`
  const OUTPUT_FILENAME = `${BUILD_DIR}/${folder}/${css}`
  const BROWSER_LIST  = ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']

  const opts = minify ? {outputStyle: 'compressed'} : {}
  gulp.src(SASS_ENTRY)
    .pipe(sassGlob())
    .pipe(sass(opts).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: BROWSER_LIST,
      cascade: false
    }))
    .pipe(gulp.dest(OUTPUT_DIR))

  setTimeout(() => gulp.src(OUTPUT_FILENAME).pipe(clean()), 500)
}

function compileJS(bundle, minify) {
  const { folder, js } = bundle
  const ES6_ENTRY = `${SOURCE_DIR}/${folder}/${js}`
  const OUTPUT_DIR = `${BUILD_DIR}/${folder}`
  const OUTPUT_FILENAME = js
  webpack({
    entry: ES6_ENTRY,
    output: {
      path: OUTPUT_DIR,
      filename: OUTPUT_FILENAME
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }]
    },
    plugins: minify ? [ new UglifyJSPlugin() ] : [],
    devtool: minify ? '' : 'source-map',
    quiet: true
  }).pipe(gulp.dest(OUTPUT_DIR))
}

function copyImages(bundle) {
  if (!bundle.images) return
  const { folder } = bundle
  const IMAGES_DIR = `${SOURCE_DIR}/${folder}/images`
  const OUTPUT_DIR = `${BUILD_DIR}/${folder}/images`
  copy(`${IMAGES_DIR}/**`, OUTPUT_DIR, () => {})
}

function copyHtml(bundle) {
  if (!bundle.html) return
  const { folder } = bundle
  const HTML_DIR = `${SOURCE_DIR}/${folder}`
  const OUTPUT_DIR = `${BUILD_DIR}/${folder}`
  copy(`${HTML_DIR}/**`, OUTPUT_DIR, () => {})
}

function copyOfflineLibs() {
  const OUTPUT_DIR = `${BUILD_DIR}/lib`
  copy(`${LIBS_DIR}/**`, OUTPUT_DIR, () => {})
}

function createBuildIndex(bundles) {
  const prototypeLinks = bundles.map(bundle => `<div><a href="/${bundle.folder}">${bundle.folder}</a></div>`).join('')
  fs.writeFileSync(`${BUILD_DIR}/index.html`, `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, height=device-height">
      <title>Prototypes!</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Product+Sans:100,300,500" rel="stylesheet">
      <style>
        * { font-family: Product Sans, sans-serif; }
        ul { list-style-type: none; }
      </style>
    </head>
    <body>
      <h1>Prototypes!</h1>
      ${prototypeLinks}
    </body>
    </html>
  `)
}

function getBundleFromChangeEvent(e) {
  const file = e.path.split(SOURCE_DIR)[1]
  const [ folder ] = file.substr(1).split('/')
  return getBundle(folder)
}


gulp.task('build', () => {
  // For each prototype, create a unique bundle
  const bundles = fs.readdirSync('./src').map(getBundle).filter(b => b)

  // Create build files
  bundles.map(buildPrototype)

  // Copy offline libs into build directory
  copyOfflineLibs()

  // Create a table of contents
  setTimeout(() => createBuildIndex(bundles), 500)
})

gulp.task('watch', () => {

  // Watch JS files to compile ES6
  gulp.watch(JS_FILES, e => {
    const bundle = getBundleFromChangeEvent(e)
    compileJS(bundle, false)
  })

  // Watch SASS files to compile CSS
  gulp.watch(SASS_FILES, e => {
    const bundle = getBundleFromChangeEvent(e)
    compileCSS(bundle, false)
  })

  // Watch HTML files to copy
  gulp.watch(HTML_FILES, e => {
    const bundle = getBundleFromChangeEvent(e)
    copyHtml(bundle)
  })
})

gulp.task('serve', () => {
  BrowserSync.init({
    files: './build/**/*',
    server: './build',
    open: true
  })
})

gulp.task('default', [ 'build', 'watch', 'serve'])