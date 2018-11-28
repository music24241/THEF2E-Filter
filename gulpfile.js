var gulp=require('gulp');
var compass=require('gulp-compass');
var jade=require('gulp-jade');
var plumber=require('gulp-plumber');

const paths = {
    src: './src',
    dist: './dist', 
    cssdir: './dist/css',  
    sassdir: './src/sass'  
  };
  
gulp.task('template',function(){
    const YOUR_LOCALS={};
    return gulp.src([`${paths.src}/partial/*.jade`,`${paths.src}/*.jade`])
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(`${paths.dist}`));
})

gulp.task('sass',function(){
    return gulp.src([`${paths.sassdir}/**/*.sass`,`${paths.sassdir}/**/*.scss`])
        .pipe(plumber())
        .pipe(compass({
            css: paths.cssdir,  
            sass: paths.sassdir,  
            sourcemap: true,  
            comments: false,  
            outputStyle: 'nested',
        }))
        .pipe(gulp.dest(paths.cssdir));
})

gulp.task('watch',function(){
    gulp.watch('./src/sass/**/*.sass',gulp.series('sass'));
    gulp.watch('./src/**/*.jade',gulp.series('template'));
})

gulp.task('default',gulp.series(['template', 'sass','watch']));
