#!/usr/bin/env node


var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];
console.log("Running hook: " + path.basename(process.env.CORDOVA_HOOK));

var gulp = require('gulp');
var replace = require('gulp-replace-task');

if (process.env.TARGET) {
    // var srcfile = path.join(rootdir, "config", "config-" + process.env.TARGET + ".js");

    // //do this for each platform
    // var configFilesToReplace = {
    //     "android": "platforms/android/assets/www/js/config.js",
    //     " ios": "platforms/ios/www/js/config.js"
    // };

    // for (var platform in configFilesToReplace) {
    //     console.log("Modifying config for platform " + platform + ", TARGET=" + process.env.TARGET);
    //     var destfile = path.join(rootdir, configFilesToReplace[platform]);

    //     if (!fs.existsSync(srcfile)) {
    //         throw "Missing config file: " + srcfile;
    //     } else {
    //         console.log("copying " + srcfile + " to " + destfile);
    //         fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
    //     }
    // }


    gulp.task('replace', function() {
        gulp.src('platforms/android/assets/www/js/service-api.js')
            .pipe(replace({
                patterns: [{
                    match: /http:\/\/107.170.217.97:3000\//g,
                    replacement: 'https://api.linkagoal.com/'
                },{
                    match: /http:\/\/159.203.252.13:3000\//g,
                    replacement: 'https://i1.linkagoal.com/'
                },{
                    match: /http:\/\/159.203.252.13:1338/g,
                    replacement: 'https://socket.linkagoal.com/'
                }
                ]
            }))
            .pipe(gulp.dest('platforms/android/assets/www/js/service-api.js'));

        gulp.src('platforms/ios/www/js/service-api.js')
            .pipe(replace({
                patterns: [{
                    match: /http:\/\/107.170.217.97:3000\//g,
                    replacement: 'https://api.linkagoal.com/'
                },{
                    match: /http:\/\/159.203.252.13:3000\//g,
                    replacement: 'https://i1.linkagoal.com/'
                },{
                    match: /http:\/\/159.203.252.13:1338/g,
                    replacement: 'https://socket.linkagoal.com/'
                }
                ]
            }))
            .pipe(gulp.dest('platforms/ios/www/js/service-api.js'));
    });

    gulp.run('replace');




} else {
    console.log("TARGET environment variable is not set.  Using default values.");
}
