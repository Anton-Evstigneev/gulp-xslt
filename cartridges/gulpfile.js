const gulp = require('gulp'),
    // 2.5 > python < 3.0 needed as system default to install a package
    // For Win users: install python, run "py -2" command in console and restart terminal, then run
    // npm install gulp-xslt2 --save
    xslt = require('gulp-xslt2').init({
        searchPaths: process.cwd(),
        extensionsToTransform: ['.xml', '.xsl']
    }),
    FileHound = require('filehound'),
    path = require('path'),
    rename = require('gulp-rename');

gulp.task('forms', function() {
    const XSLFilesList = FileHound.create()
        .paths('./cartridge_name/cartridge/forms/src')
        .ext('xsl')
        .discard('components')
        .findSync();

    XSLFilesList.forEach(function (XSLFilePath) {
        const fileName = path.basename(XSLFilePath, '.xsl'),
            fileDir = path.dirname(XSLFilePath),
        locale = fileDir.substring(fileDir.lastIndexOf('\\') + 1);

        gulp.src('./cartridge_name/cartridge/forms/src/components/default.xml')
            .pipe(xslt(XSLFilePath))
            .pipe(rename(fileName + '.xml'))
            .pipe(gulp.dest('./cartridge_name/cartridge/forms/' + locale))
    });
});

gulp.task('watch', ['forms'], function() {
    gulp.watch(['cartridge_name/cartridge/forms/src/**/*.xsl'], ['forms']);
});