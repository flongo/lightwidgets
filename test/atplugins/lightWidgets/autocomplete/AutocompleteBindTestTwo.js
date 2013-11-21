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
    $classpath : "test.atplugins.lightWidgets.autocomplete.AutocompleteBindTestTwo",
    $extends : "test.atplugins.lightWidgets.autocomplete.AutocompleteBindTestOne",
    $dependencies : ["aria.utils.Dom", "aria.utils.SynEvents", "atplugins.lightWidgets.LazyLoader"],
    $constructor : function () {
        this.$AutocompleteBindTestOne.constructor.call(this);
        this.data.cfg.preselect = "always";
    },
    $destructor : function () {
        this.$AutocompleteBindTestOne.$destructor.call(this);
    },
    $prototype : {

        _afterFirstType : function () {

            this.checkTextValue(this.getLabel(5));
            this.checkDataModel(5);
            this._checkChangeLogCount(0);
            this.blur();
            this._checkChangeLogCount(1);

            this._typeADownEnter();

        },

        _typeADownEnter : function () {
            this._type(["a", "[down]", "[enter]"], {
                fn : this._afterSecondType,
                scope : this
            }, true);
        },

        _afterSecondType : function () {
            this.checkTextValue(this.getLabel(1));
            this.checkDataModel(1);
            this._checkChangeLogCount(1);

            this._testClickOutside();
        },

        _afterFirstClickOutside : function () {
            this.checkTextValue(this.getLabel(5));
            this.checkDataModel(5);
            this._testDropDownOpen(false);

            this._type(["a", "[down][down][down]"], {
                fn : this._afterFourthType,
                scope : this
            }, true);
        },

        _afterSecondClickOutside : function () {
            this.checkTextValue(this.getLabel(2));
            this.checkDataModel(2);
            this._testDropDownOpen(false);

            this._testTab();
        },

        _afterFifthType : function () {
            this.checkTextValue(this.getLabel(5));
            this.checkDataModel(5);
            this._testDropDownOpen(false);

            this._testTabAfterNavigation();
        },

        _afterTabAndNavigation : function () {
            this.checkTextValue(this.getLabel(1));
            this.checkDataModel(1);
            this._testDropDownOpen(false);

            if (!aria.core.Browser.isIE) {
                this._testPaste();
            } else {
                this.end();
            }
        },

        onPaste : function () {
            this.checkTextValue("scan");
            this._testDropDownOpen(true);
            this._testHighlighted(0);
            this._testNumberOfSuggestions(2);

            this.clickOutside({
                fn : this._afterThirdClickOutside,
                scope : this
            });
        },

        _afterThirdClickOutside : function () {
            this._testDropDownOpen(false);

            this._testCut();
        },

        onCut : function () {
            this.checkTextValue("");
            this._testDropDownOpen(false);

            this.end();
        }
    }
});
