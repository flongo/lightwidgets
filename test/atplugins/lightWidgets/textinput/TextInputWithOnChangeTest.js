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
    $classpath : "test.atplugins.lightWidgets.textinput.TextInputWithOnChangeTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom", "aria.utils.SynEvents", "aria.utils.Json"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this._data = {
            text : "",
            change : {
                count : 0,
                lastArg : null
            }
        };
        this.setTestEnv({
            template : "test.atplugins.lightWidgets.textinput.TextInputTestTemplate",
            data : this._data
        });
    },
    $destructor : function () {
        this._input = null;
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {

            this._input = this.getWidgetInstance("textInput").getDom();
            this.focus();
            this.synEvent.type(this._input, "a", {
                fn : this._afterFirstType,
                scope : this
            });
        },
        _afterFirstType : function () {
            this.blur();

            this._testChangeCallback(1, "a", "a", "a");
            this.focus();
            this.synEvent.type(this._input, "b[left][delete]", {
                fn : this._afterSecondType,
                scope : this
            });
        },
        _afterSecondType : function () {
            this.blur();

            this._testChangeCallback(1, "a", "a", "a");

            aria.utils.Json.setValue(this._data, "text", "b");
            this._testChangeCallback(1, "a", "b", "b");

            this.focus();
            this.synEvent.type(this._input, "ccc", {
                fn : this._afterThirdType,
                scope : this
            });
        },

        _afterThirdType : function () {
            this.blur();

            this._testChangeCallback(2, "bccc", "bccc", "bccc");
            this.focus();
            this.synEvent.type(this._input, "[left][delete][left][delete][left][delete][left][delete]", {
                fn : this._afterFourthType,
                scope : this
            });
        },

        _afterFourthType : function () {
            this.blur();

            this._testChangeCallback(3, "", "", "");

            this.focus();
            this.synEvent.type(this._input, "write", {
                fn : this._afterFifthType,
                scope : this
            });
        },

        _afterFifthType : function () {

            this.blur();

            this._testChangeCallback(4, "write", "write", "write");

            this.focus();
            this.synEvent.type(this._input, "[left][left][left][left][left][delete]", {
                fn : this._afterSixthType,
                scope : this
            });
        },

        _afterSixthType : function () {

            this.getWidgetInstance("textInput").callChangeListener();
            this._testChangeCallback(5, "rite", "rite", "write");

            this.blur();

            this._testChangeCallback(5, "rite", "rite", "rite");
            this.end();
        },

        focus : function () {
            this.templateCtxt.$focus("textInput");
        },

        blur : function () {
            this.templateCtxt.$focus("linkToBlur");
        },

        _testChangeCallback : function (count, lastArg, value, dataModelValue, msg) {
            this.assertEquals(this._data.change.count, count, msg);
            this.assertEquals(this._data.change.lastArg, lastArg, msg);
            if (!value && this.getWidgetInstance("textInput")._hasPlaceholder) {
                value = "write";
            }
            this.assertEquals(this._input.value, value, msg);
            this.assertEquals(this._data.text, dataModelValue, msg);

        }
    }
});