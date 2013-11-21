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
    $classpath : "test.atplugins.lightWidgets.autocomplete.AutocompleteBindTestOne",
    $extends : "test.atplugins.lightWidgets.autocomplete.AutocompleteBaseTest",
    $dependencies : ["aria.utils.Dom", "aria.utils.SynEvents", "atplugins.lightWidgets.LazyLoader"],
    $constructor : function () {
        this.$AutocompleteBaseTest.constructor.call(this);
    },
    $destructor : function () {
        this.$AutocompleteBaseTest.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {
            this.setInput();
            this.focus();
            this._type(["a", "[enter]"], {
                fn : this._afterFirstType,
                scope : this
            });
        },

        _afterFirstType : function () {

            this.checkTextValue("a");
            this.checkDataModel("a");
            this._checkChangeLogCount(0);
            this.blur();
            this._checkChangeLogCount(1);

            this._typeADownEnter();

        },

        _typeADownEnter : function () {
            this._type(["[left]", "[delete]", "a", "[down]", "[enter]"], {
                fn : this._afterSecondType,
                scope : this
            });
        },

        _afterSecondType : function () {

            this.checkTextValue(this.getLabel(5));
            this.checkDataModel(5);
            this._checkChangeLogCount(1);
            this.blur();
            this._checkChangeLogCount(2);
            this._testClickOutside();

        },

        _testClickOutside : function () {

            this._type(["a"], {
                fn : this._afterThirdType,
                scope : this
            }, true);
        },

        _afterThirdType : function () {
            this.clickOutside({
                fn : this._afterFirstClickOutside,
                scope : this
            });
        },

        _afterFirstClickOutside : function () {
            this.checkTextValue("a");
            this.checkDataModel("a");
            this._testDropDownOpen(false);

            this._type(["a", "[down][down][down]"], {
                fn : this._afterFourthType,
                scope : this
            }, true);
        },

        _afterFourthType : function () {
            this._testDropDownOpen(true);
            this.clickOutside({
                fn : this._afterSecondClickOutside,
                scope : this
            });
        },

        _afterSecondClickOutside : function () {
            this.checkTextValue(this.getLabel(0));
            this.checkDataModel(0);
            this._testDropDownOpen(false);

            this._testTab();
        },

        _testTab : function () {
            this._type(["a", "[tab]"], {
                fn : this._afterFifthType,
                scope : this
            }, true);
        },

        _afterFifthType : function () {
            this.checkTextValue("a");
            this.checkDataModel("a");
            this._testDropDownOpen(false);

            this._testTabAfterNavigation();
        },

        _testTabAfterNavigation : function () {
            this._type(["a", "[down][down][up][tab]"], {
                fn : this._afterTabAndNavigation,
                scope : this
            }, true);
        },

        _afterTabAndNavigation : function () {
            this.checkTextValue(this.getLabel(5));
            this.checkDataModel(5);
            this._testDropDownOpen(false);
            if (!aria.core.Browser.isIE) {
                this._testPaste();
            } else {
                this.end();
            }
        },

        _testPaste : function () {
            var field = this._input;
            var evt = new Syn("paste", field, function () {
                field.value = "scan";
            });

            aria.core.Timer.addCallback({
                fn : this.onPaste,
                scope : this,
                delay : 1000
            });
        },

        onPaste : function () {
            this.checkTextValue("scan");
            this._testDropDownOpen(true);
            this._testHighlighted(-1);
            this._testNumberOfSuggestions(2);

            this.clickOutside({
                fn : this._afterThirdClickOutside,
                scope : this
            });
        },

        _afterThirdClickOutside : function () {
            this.checkTextValue("scan");
            this._testDropDownOpen(false);

            this._testCut();
        },

        _testCut : function () {
            var field = this._input;
            var evt = new Syn("cut", field, function () {
                field.value = "";
            });

            aria.core.Timer.addCallback({
                fn : this.onCut,
                scope : this,
                delay : 1000
            });
        },

        onCut : function () {
            this.checkTextValue("");
            this._testDropDownOpen(false);

            this.end();
        }
    }
});
