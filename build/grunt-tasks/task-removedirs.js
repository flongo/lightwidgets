/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Recursively remove folders from file system.
 */
module.exports = function (grunt) {

    var fs = require('fs');

    grunt.registerMultiTask('removedirs', 'Remove folders', function () {
        var folders = this.data.folders;
        folders.forEach(function (folderPath) {
            grunt.log.write('Removing the directory: '.cyan + (folderPath + '... ').yellow);
            var removedCount = rmDirRecursive(folderPath);
            if (removedCount > 0) {
                grunt.log.write(removedCount + ' files/directories removed. ');
            }

            // Fail task if errors were logged.
            if (this.errorCount) {
                return false;
            }
            // Otherwise, print a success message
            grunt.log.ok();
        });
    });

    /**
     * Remove directory recursively, if it exists.
     * @param dirPath {String} directory to be removed.
     * @return {Number} no. of files/directories removed
     */
    function rmDirRecursive (dirPath) {
        if (!fs.existsSync(dirPath)) {
            grunt.log.write('Directory ' + dirPath + ' does not exist. ');
            return 0; // fine
        }

        var files;
        try {
            files = fs.readdirSync(dirPath);
        } catch (e) {
            grunt.fatal('Exception when trying to remove folder ' + dirPath);
            grunt.log.writeln(e);
        }

        var count = 0;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                } else {
                    count += rmDirRecursive(filePath);
                }
            }
        }
        fs.rmdirSync(dirPath);
        count += files.length + 1;
        return count;
    }
};
