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

Aria.classDefinition({
    $classpath : "test.atplugins.lightWidgets.lazyloader.LazyLoaderTest",
    $extends : "aria.jsunit.TestCase",
    $dependencies : ["atplugins.lightWidgets.LazyLoader"],

    $constructor : function () {
        this.$TestCase.constructor.call(this);
        this._cbCount = {};

    },
    $destructor : function () {
        this.$TestCase.$destructor.call(this);
    },
    $prototype : {

        testAsyncLoad : function () {

            var lazyLoader = atplugins.lightWidgets.LazyLoader;
            var dep = {
                classes : ["test.atplugins.lightWidgets.lazyloader.dependencies.ClassOne"],
                templates : ["test.atplugins.lightWidgets.lazyloader.dependencies.TemplateOne"]
            };
            lazyLoader.load("doesnotexist", {
                fn : this._loadCallback,
                args : "one",
                resIndex : -1
            });
            lazyLoader.register("one", dep);
            lazyLoader.load("one", {
                fn : this._loadOneCallback,
                scope : this
            });
            lazyLoader.load("one", {
                fn : this._loadOneCallback,
                scope : this
            });
            lazyLoader.load("one", {
                fn : this._loadOneCallback,
                scope : this
            });

        },

        _loadOneCallback : function () {
            this._cbCount.one = this._cbCount.one || 0;
            this._cbCount.one++;
            if (this._cbCount.one == 3) {
                this._afterOneLoad();
            }
            if (this._cbCount.one == 4) {
                this._afterOneLoadTwice();
            }
        },

        _afterOneLoad : function () {
            var lazyLoader = atplugins.lightWidgets.LazyLoader;
            this.assertTrue(lazyLoader.isLoaded("one"), "First dependencies not loaded correctly");
            lazyLoader.load("one", {
                fn : this._loadOneCallback,
                scope : this
            });
        },

        _afterOneLoadTwice : function () {
            var lazyLoader = atplugins.lightWidgets.LazyLoader;

            var dep = {
                classes : ["test.atplugins.lightWidgets.lazyloader.dependencies.ClassTwo",
                        "test.atplugins.lightWidgets.lazyloader.dependencies.ClassThree"],
                templates : ["test.atplugins.lightWidgets.lazyloader.dependencies.TemplateTwo"]
            };

            lazyLoader.register("two", dep);
            lazyLoader.load("two", {
                fn : this._endTestAsyncLoad,
                scope : this
            });

        },

        _endTestAsyncLoad : function () {
            this.notifyTestEnd("testAsyncLoad");
        }

    }
});