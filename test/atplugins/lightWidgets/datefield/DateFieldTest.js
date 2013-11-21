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
    $classpath : "test.atplugins.lightWidgets.datefield.DateFieldTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom", "aria.utils.SynEvents", "aria.utils.Json"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this._data = {
            date : new Date(2013, 1, 10)
        };
        this.setTestEnv({
            template : "test.atplugins.lightWidgets.datefield.DateFieldTestTpl",
            data : this._data
        });
    },
    $destructor : function () {
        this._inputOne = null;
        this._inputTwo = null;
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {

            this._inputOne = this.getWidgetInstance("datefield_one").getDom();
            this._inputTwo = this.getWidgetInstance("datefield_two").getDom();

            this.assertEquals(this._inputOne.value, "10-02-2013", "Value in the data model not correctly output in datefield one.");
            this.assertEquals(this._inputTwo.value, "10 Feb 13", "Value in the data model not correctly output in datefield two.");
            aria.utils.Json.setValue(this._data, "date", null);
            this.focus("datefield_one");

            this.synEvent.type(this._inputOne, "09032013", {
                fn : this._afterFirstType,
                scope : this
            });
        },
        _afterFirstType : function () {
            this.blur();
            this.assertEquals(this._inputOne.value, "09-03-2013", "Value in the data model not correctly output in datefield one.");
            this.assertEquals(this._inputTwo.value, "09 Mar 13", "Value in the data model not correctly output in datefield two.");

            aria.utils.Json.setValue(this._data, "date", null);
            this.focus("datefield_two");

            this.synEvent.type(this._inputTwo, "09032012", {
                fn : this._afterSecondType,
                scope : this
            });
        },
        _afterSecondType : function () {
            this.blur();
            this.assertEquals(this._inputOne.value, "");
            this.assertEquals(this._inputTwo.value, "09032012");
            this.assertEquals(this._data.date, null, "Invalid value is set inside the data model");

            aria.utils.Json.setValue(this._data, "date", null);
            this.focus("datefield_one");

            this.synEvent.type(this._inputOne, "aaa", {
                fn : this._afterThirdType,
                scope : this
            });
        },

        _afterThirdType : function () {
            this.blur();
            this.assertEquals(this._inputOne.value, "aaa");
            this.assertEquals(this._inputTwo.value, "09032012");
            this.assertEquals(this._data.date, null, "Invalid value is set inside the data model");
            aria.utils.Json.setValue(this._data, "date", null);
            this.focus("datefield_one");

            this.synEvent.type(this._inputOne, "[left][left][left][delete][delete][delete]09032014", {
                fn : this._afterFourthType,
                scope : this
            });
        },

        _afterFourthType : function () {
            this.blur();
            this.assertEquals(this._inputOne.value, "09032014");
            this.assertEquals(this._inputTwo.value, "09032012");
            this.assertEquals(this._data.date, null, "Invalid value is set inside the data model");

            this.end();
        },

        focus : function (widgetId) {
            this.templateCtxt.$focus(widgetId);
        },

        blur : function () {
            this.templateCtxt.$focus("linkToBlur");
        }
    }
});