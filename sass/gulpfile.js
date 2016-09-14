var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass',function(){
	gulp.src('./scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./css'));
});
gulp.task('watch',function(){
	gulp.watch('scss/*.scss',['sass']);
	console.log('compele task');
});
gulp.task('default',['sass','watch']);