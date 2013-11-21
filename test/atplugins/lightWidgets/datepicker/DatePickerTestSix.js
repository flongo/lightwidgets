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
    $classpath : "test.atplugins.lightWidgets.datepicker.DatePickerTestSix",
    $extends : "test.atplugins.lightWidgets.datepicker.DatePickerTestOne",
    $prototype : {

        _afterFirstType : function () {
            this._checkValue(this._initialText);
            this._checkChangeLogCount(0);
            this.lazyLoad({
                fn : this._afterLazyLoad,
                scope : this
            });
        },
        _afterLazyLoad : function () {
            this._clickOnExpandButton({
                fn : this._afterFirstClick,
                scope : this
            }, "datepicker", true);
        },

        _afterFirstClick : function () {
            this._testDropDownOpen(true);

            this._clickOnExpandButton({
                fn : this._afterSecondClick,
                scope : this
            });
        },
        _afterSecondClick : function () {
            this._testDropDownOpen(false);

            this._clickOnExpandButton({
                fn : this._afterThirdClick,
                scope : this
            });
        },

        _afterThirdClick : function () {
            this._testDropDownOpen(true);
            this._typeInCalendar(null, {
                type : ["[right]"],
                cb : {
                    fn : this._clickAgain,
                    scope : this
                }
            });
        },

        _clickAgain : function () {
            this._clickOnExpandButton({
                fn : this._afterCalendarType,
                scope : this
            });
        },
        _afterCalendarType : function () {
            this._testDropDownOpen(false);
            var formattedDate = aria.utils.Date.format(aria.utils.Date.interpret("+5"), this.getDatePattern());
            this._checkValue(formattedDate);
            this._checkDataModel(aria.utils.Date.interpret("+5"));
            this.blur();

            this._checkChangeLogCount(1);
            this._checkChangeLog(0, formattedDate);

            this.end();
        }
    }
});
