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
    $classpath : "test.atplugins.lightWidgets.datepicker.DatePickerTestEight",
    $extends : "test.atplugins.lightWidgets.datepicker.DatePickerTestOne",
    $prototype : {

        _afterDownType : function () {

            this._typeInCalendar(null, {
                type : ["[right]"],
                cb : {
                    fn : this._clickOnCalendar,
                    scope : this
                }
            });
        },

        _clickOnCalendar : function () {
            this._randomCalendarClick({
                fn : this._afterCalendarClick,
                scope : this
            });
        },

        _afterCalendarClick : function (date) {
            this._testDropDownOpen(false);
            var formattedDate = aria.utils.Date.format(date, this.getDatePattern());
            this._checkValue(formattedDate);
            this._checkDataModel(date);
            this.blur();

            this._checkChangeLogCount(1);
            this._checkChangeLog(0, formattedDate);

            this.end();

        }
    }
});
