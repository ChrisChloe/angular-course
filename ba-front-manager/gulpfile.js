/*
 * Gulp File
 *
 * In development run:
 * > gulp
 * or
 * > gulp watch
 * In production run:
 * > gulp --prod
 *
 * ###############################
 * Send to AWS S3 AMAZON prodution
 * ###############################
 * > gulp --prod
 * > gulp publish
 */
const gulp = require('gulp');
const clean = require('gulp-clean');
const jshint = require('gulp-jshint');
const uglyfly = require('gulp-uglyfly');
const beautify = require('gulp-beautify');
const concat = require('gulp-concat');
const strip = require('gulp-strip-comments');
const stripCssComments = require('gulp-strip-css-comments');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const templateCache = require('gulp-angular-templatecache');
const inject = require('gulp-inject');
//const es = require('event-stream');
const streamqueue = require('streamqueue');
const runSequence = require('run-sequence');
const gulpIf = require('gulp-if');
const expect = require('gulp-expect-file');
const argv = require('yargs').argv;
const awspublish = require('gulp-awspublish');
const config = require('config');
const rename = require("gulp-rename");
const hash = require('gulp-hash');
const connect = require('gulp-connect');
const open    = require('gulp-open');

/*
 * Paths
 */
const paths = {
    scripts:     ['app/**/*.js', '!app/env.default.js', '!app/env.prod.js', 'app/env.js',  '!app/bower_components/**', '!app/libs/**'],
    scriptsProd: ['app/**/*.js', '!app/env.default.js', 'app/env.prod.js',  '!app/env.js', '!app/bower_components/**', '!app/libs/**'],
    images: 'app/images/**/*',
    libStyles: [
        //'app/libs/pace-master/themes/blue/pace-theme-flash.css',
        'app/bower_components/jquery.uniform/dist/css/default.css',
        'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
        'app/bower_components/font-awesome/css/font-awesome.min.css',
        'app/bower_components/offcanvasmenueffects/css/menu_cornerbox.css',
        'app/bower_components/Waves/dist/waves.min.css',
        'app/bower_components/switchery/dist/switchery.min.css',
        'app/bower_components/3d-bold-navigation/css/style.css',
        'app/libs/slidepushmenus/css/component.css',
        'app/bower_components/angular-toastr/dist/angular-toastr.min.css',
        'app/bower_components/morris.js/morris.css',
        'app/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
        'app/bower_components/angular-ui-select/dist/select.min.css',
        /** theme */
        'app/libs/modern/modern.css',
        'app/libs/modern/themes/green.css',
        'app/bower_components/angular-bootstrap-datepicker/dist/angular-bootstrap-datepicker.css',
        'app/bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
        'app/bower_components/angular-datatables/dist/css/angular-datatables.min.css',
        'app/bower_components/textAngular/dist/textAngular.css',
        'node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
        'app/bower_components/angular-bootstrap-colorpicker/css/colorpicker.min.css',
    ],
    styles: [
        'app/css/**/*.css'
    ],
    templates: ['app/views/**/*.html'],
    libsScripts: [
    /** Theme libs */
        'app/bower_components/jquery/dist/jquery.min.js',
        'app/bower_components/jquery-ui/jquery-ui.min.js',
        //'app/libs/pace-master/pace.min.js',Erro upload
        'app/bower_components/blockUI/jquery.blockUI.js',
        'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
        'app/bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
        'app/bower_components/switchery/dist/switchery.min.js',
        'app/bower_components/jquery.uniform/dist/js/jquery.uniform.standalone.js',
        'app/bower_components/offcanvasmenueffects/js/classie.js',
        //'app/bower_components/offcanvasmenueffects/js/main.js',
        'app/bower_components/Waves/dist/waves.min.js',
        'app/bower_components/3d-bold-navigation/js/main.js',
        'app/libs/modern/modern.js',
        'app/bower_components/raphael/raphael.min.js',
        //'app/bower_components/morris.js/morris.min.js',
        'app/bower_components/clipboard/dist/clipboard.min.js',
        'app/bower_components/moment/min/moment.min.js',
        'app/bower_components/moment/locale/pt-br.js',
        'app/bower_components/datatables.net/js/jquery.dataTables.min.js',
        'app/bower_components/highcharts/highstock.js',
        'app/bower_components/highcharts/modules/exporting.js',
        'app/libs/highcharts/locale/pt-br.js',
        'app/libs/notifyjs/notify.js',
    /** Angular libs */
        'app/bower_components/ng-file-upload/ng-file-upload-shim.min.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/textAngular/dist/textAngularSetup.js',
        'app/bower_components/textAngular/dist/textAngular-rangy.min.js',
        'app/bower_components/textAngular/dist/textAngular-sanitize.js',
        'app/bower_components/textAngular/dist/textAngular.js',
        //'node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
        //'node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js',
        'app/bower_components/angular-resource/angular-resource.min.js',
        'app/bower_components/angular-animate/angular-animate.min.js',
        'app/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
        //'app/bower_components/angular-sanitize/angular-sanitize.min.js',
        'app/bower_components/ng-file-upload/ng-file-upload.min.js',
        'app/bower_components/angular-i18n/angular-locale_pt-br.js',
        'app/libs/angular-bootstrap-datepicker/dist/angular-bootstrap-datepicker.min.js',

        'app/bower_components/angular-ui-router/release/angular-ui-router.js',
        'app/bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
        'app/bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js',
        'app/bower_components/chart.js/dist/Chart.min.js',
        'app/bower_components/angular-chart.js/dist/angular-chart.min.js',
        'app/bower_components/angular-datatables/dist/angular-datatables.min.js',
    /** Importação para o Oauth2 */
        'app/bower_components/angular-cookies/angular-cookies.js',
        'app/bower_components/query-string/query-string.js',
        'app/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
        'app/bower_components/angular-oauth2/dist/angular-oauth2.js',
        'app/bower_components/angular-http-auth/src/http-auth-interceptor.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'app/bower_components/angular-bootstrap-confirm/dist/angular-bootstrap-confirm.js',
        'app/bower_components/angular-ui-mask/dist/mask.min.js',
        'app/bower_components/angular-ui-select/dist/select.min.js',
        'app/bower_components/angular-modal-service/dst/angular-modal-service.min.js',
        'app/bower_components/angular-input-masks/angular-input-masks-dependencies.min.js',
        'app/bower_components/angular-input-masks/angular-input-masks.br.min.js',
        //'app/bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',

    ],
    fonts: [
        'app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2',
        'app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff',
        'app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf2',
        'app/bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf',
        'app/bower_components/font-awesome/fonts/fontawesome-webfont.woff',
        'app/bower_components/font-awesome/fonts/fontawesome-webfont.woff2',
        'app/bower_components/font-awesome/fonts/fontawesome-webfont.ttf'
    ]
};

/*
 * Clear dist folder
 */
gulp.task('clean', function () {
    return gulp.src('./dist/*').pipe(clean());
});

/*
 * Verify *.js
 */
gulp.task('jshint', function () {
    gulp.src(paths.scripts)
        .pipe(expect(paths.scripts))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*
 * Angular *.js
 */
gulp.task('fonts', function () {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('scripts-clean', function () {
    return gulp.src('./dist/js/scripts.*.js').pipe(clean());
});

/*
 * Angular *.js
 */
gulp.task('scripts', function () {

    var scripts = paths.scripts;

    if(argv.prod){
        scripts = paths.scriptsProd;
    }

    return gulp.src(scripts)
        .pipe(expect(scripts))
        .pipe(concat('scripts.min.js'))
        .pipe(hash())
        //.pipe(gulpIf(!!argv.prod, uglyfly(), beautify()))
        .pipe(uglyfly())
        .pipe(strip({trim: true}))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('libs-clean', function () {
    return gulp.src('./dist/js/libs.*.js').pipe(clean());
});

/*
 * Libs *.js
 */
gulp.task('libs', function () {
    return gulp.src(paths.libsScripts)
        .pipe(expect(paths.libsScripts))
        //.pipe(gulpIf(!argv.prod, beautify()))
        //.pipe(strip({trim: true}))
        .pipe(concat('libs.min.js'))
        .pipe(hash())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles-clean', function () {
    return gulp.src('./dist/css/*.css').pipe(clean());
});

/*
 *
 */
gulp.task('styles', function () {

    var libs = gulp.src(paths.libStyles)
        .pipe(expect(paths.libStyles));

    var styles = gulp.src(paths.styles)
        .pipe(expect(paths.styles))
        .pipe(stripCssComments({preserve: false}))
        .pipe(cleanCss());

    return streamqueue({objectMode: true}, libs, styles)
        .pipe(concat('all.min.css'))
        .pipe(hash())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('templates-clean', function () {
    return gulp.src('./dist/views/*.js').pipe(clean());
});

gulp.task('templates', function () {
    return gulp.src('app/views/**/*.html')
        .pipe(strip({trim: true}))
        //.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache({module: 'managerApp', root:'views/'}))
        .pipe(hash())
        .pipe(gulp.dest('./dist/views'));
});

/*
 * Task Images comprime
 */
gulp.task('images', function () {
    gulp.src(paths.images)
        .pipe(gulp.dest('./dist/images'));
});

/*
 * Task only for index
 */
gulp.task('index', function () {
    var sources = gulp.src(['dist/**/*.css', './dist/js/scripts.min-*.js', './dist/views/templates-*.js'], {read: false});
    var sourcesLibs = gulp.src('dist/js/libs.min-*.js', {read: false});

     var stream = gulp.src('app/index.html')
        .pipe(inject(sources, {
            ignorePath: '/dist',
            addRootSlash: false
        }))
        .pipe(inject(sourcesLibs, {
            ignorePath: '/dist',
            addRootSlash: false,
            name: 'vendor'
        }))
        .pipe(strip({trim: true}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));

    if(!argv.prod){
        stream.pipe(connect.reload());
    }

    return stream;
});

/*
 * Default Task for:
 * DEV
 * PROD
 */
gulp.task('default', function (cb) {
    return runSequence('clean', ['jshint', 'libs', 'scripts', 'styles', 'templates', 'images', 'fonts'], 'index', cb);
});

/*
 *Return the task when a file changes
 */
gulp.task('watch', function () {
    gulp.watch('app/index.html', ['index']);
    gulp.watch(paths.scripts, function(){ runSequence('jshint', 'scripts-clean', 'scripts', 'index')});
    gulp.watch(paths.libsScripts, function(){ runSequence('libs-clean', 'libs', 'index')});
    gulp.watch(paths.styles, function(){ runSequence('styles-clean', 'styles', 'index')});
    gulp.watch(paths.templates, function(){ runSequence('templates-clean', 'templates', 'index')});
});

gulp.task('connect', function () {

    var server = connect.server({
        root: './dist',
        port: 8001,
        livereload: true
    });

    return gulp.src('./dist')
        .pipe(open({
            uri: 'http://' + server.host + ':' + server.port
        }));
});

gulp.task('serve', function(cb){
    return runSequence('clean', ['jshint', 'libs', 'scripts', 'styles', 'templates', 'images', 'fonts'], 'index', 'connect', 'watch', cb);
});

/**
 * Publish system in production
 */
gulp.task('publish', function() {

    var s3Config = config.get('s3');

    var publisher = awspublish.create({
        region: s3Config.region,
        params: {
            Bucket: s3Config.bucket
        },
        httpOptions: { timeout: 300000 },
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
        signatureVersion: s3Config.signatureVersion
    }, {
        //cacheFileName: './'
    });

    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    return gulp.src('./dist/**')
        // publisher will add Content-Length, Content-Type and headers specified above
        // If not specified it will set x-amz-acl to public-read by default
        .pipe(publisher.publish(headers))
        // create a cache file to speed up consecutive uploads
        .pipe(publisher.cache())
        // print upload updates to console
        .pipe(awspublish.reporter());
});
