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

module.exports = function (grunt) {

    grunt.registerTask('gruntTimeHookStart', 'Hook to be executed before the first task', function () {
        grunt.config.set('stats.gruntStartTimestamp', Date.now());
    });

    grunt.registerTask('gruntTimeHookEnd', 'Hook to be executed after the last task', function () {
        var started = grunt.config.get('stats.gruntStartTimestamp');
        var finished = Date.now();
        var elapsed = ((finished - started) / 1000).toFixed(2);

        grunt.log.writeln('--------------------------------------------------------------------------------'.bold.green);
        grunt.log.writeln([('All tasks finished!').bold.green, (' (' + elapsed + ' seconds) ').bold.yellow,
                (new Date().toUTCString())].join(''));
        grunt.log.writeln('--------------------------------------------------------------------------------'.bold.green);
    });
};
