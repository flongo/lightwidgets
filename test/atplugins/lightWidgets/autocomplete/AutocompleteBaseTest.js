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
    $classpath : "test.atplugins.lightWidgets.autocomplete.AutocompleteBaseTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom", "aria.utils.SynEvents", "atplugins.lightWidgets.LazyLoader", "aria.utils.Type",
            "aria.core.Browser"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this._synEvents = aria.utils.SynEvents;
        this.data = {
            cfg : {
                preselect : null,
                placeholder : null
            },
            changeLogs : [],
            value : null,
            suggestions : [{
                        label : "Air France",
                        code : "AF"
                    }, {
                        label : "Air France2",
                        code : "AF"
                    }, {
                        label : "Air Canada",
                        code : "AC"
                    }, {
                        label : "Finnair",
                        code : "XX"
                    }, {
                        label : "Qantas",
                        code : "--"
                    }, {
                        label : "American Airlines",
                        code : "AA"
                    }, {
                        label : "Emirates",
                        code : "EK"
                    }, {
                        label : "Scandinavian Airlines System",
                        code : "SK"
                    }, {
                        label : "Scandinavian Airlines System2",
                        code : "SK"
                    }]
        };
        this._suggestions = this.data.suggestions.slice(0);
        this.setTestEnv({
            template : "test.atplugins.lightWidgets.autocomplete.AutocompleteTestBaseTpl",
            data : this.data
        });
    },
    $destructor : function () {
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {

        setInput : function (id) {
            id = id || "autocomplete";
            this._input = this._input || this.getWidgetInstance(id).getDom();
        },

        resetInput : function (id) {
            id = id || "autocomplete";
            this._input = this.getWidgetInstance(id).getDom();
        },

        focus : function (id) {
            id = id || "autocomplete";
            this.templateCtxt.$focus(id);
        },

        blur : function () {
            this.templateCtxt.$focus("blurElement");
        },

        clickOutside : function (cb) {
            this._synEvents.click(aria.utils.Dom.getElementById(this.templateCtxt.$getId("blurElement")), cb);
        },

        checkTextValue : function (text) {
            this.assertEquals(this._input.value, text, "Input value should be " + text + ". It is " + this._input.value
                    + " instead.");
        },

        checkDataModel : function (value) {

            if (value === null || aria.utils.Type.isString(value)) {
                this.assertEquals(this.data.value, value, "Data model should be " + value + ". It is "
                        + this.data.value + " instead.");
            } else if (aria.utils.Type.isObject(value)) {
                this.assertJsonEquals(this.data.value, value);
            } else {
                this._assertRightSuggestion(value);
            }
        },

        _assertRightSuggestion : function (index) {
            var sugg = this._suggestions[index];
            var isEqual = true;
            var dmValue = this.data.value;
            isEqual = isEqual && aria.utils.Type.isObject(dmValue);
            isEqual = isEqual && (dmValue.label == sugg.label);
            isEqual = isEqual && (dmValue.code == sugg.code);
            this.assertTrue(isEqual, "Value in the data model does not correspond to suggestion " + index);
        },

        _lazyLoad : function (cb) {
            atplugins.lightWidgets.LazyLoader.load("atplugins.lightWidgets.autocomplete.Autocomplete", cb);
        },

        _type : function (textArray, cb, del) {
            this.focus();
            if (del) {
                var count = this._input.value ? this._input.value.length : 0, toType = "";
                for (var i = 0; i < count; i++) {
                    toType += "[left][delete]";

                }
                textArray[0] = toType + textArray[0];
            }

            textArray = aria.utils.Type.isArray(textArray) ? textArray : [textArray];
            var text = textArray.splice(0, 1)[0];
            var self = this;
            this._synEvents.type(this._input, text, {
                fn : function () {

                    self._lazyLoad({
                        fn : function () {
                            aria.core.Timer.addCallback({
                                fn : function () {
                                    if (textArray.length > 0) {
                                        self._type(textArray, cb);
                                    } else {
                                        self.$callback(cb);
                                    }
                                },
                                scope : self,
                                delay : 100
                            });
                        },
                        scope : self
                    });

                },
                scope : this
            });
        },

        _checkChangeLogCount : function (n) {
            if (!aria.core.Browser.isIE) {
                this.assertEquals(this.data.changeLogs.length, n, "On change has been called "
                        + this.data.changeLogs.length + " times instead of " + n + ".");
            }
        },

        _checkChangeLog : function (index, value) {
            this.assertEquals(this.data.changeLogs[index], value, "On change has been called with argument"
                    + this.data.changeLogs[index] + " instead of " + value + ".");
        },

        refresh : function () {

            this.templateCtxt.$refresh();
            this.resetInput();
        },

        getLabel : function (index) {
            return this._suggestions[index].label;
        },

        _testDropDownOpen : function (open, id) {
            id = id || "autocomplete";
            var widget = this.getWidgetInstance(id);
            var isOpen = widget._dropdown ? widget._dropdown.isOpen() : false;
            this.assertEquals(isOpen, open, "Dropdown is not in the expected state.");
        },

        _testHighlighted : function (index) {
            var instance = this.getWidgetInstance("autocomplete");
            var highlightedIndex = instance.data.highlightedIdx;
            this.assertEquals(highlightedIndex, index, "Highlighted index equal to " + highlightedIndex
                    + ". It should be " + index + " instead.");
        },

        _testNumberOfSuggestions : function (num) {
            var instance = this.getWidgetInstance("autocomplete");
            var numOfSuggestions = instance.suggestionController.data.suggestions.length;
            this.assertEquals(numOfSuggestions, num, "The number of suggestions is equal to " + numOfSuggestions
                    + ". It should be " + num + " instead.");
        }

    }
});
