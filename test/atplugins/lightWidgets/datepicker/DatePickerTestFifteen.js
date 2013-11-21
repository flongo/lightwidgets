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
    $classpath : "test.atplugins.lightWidgets.datepicker.DatePickerTestFifteen",
    $extends : "test.atplugins.lightWidgets.datepicker.DatePickerTestOne",
    $prototype : {

        _afterDownType : function () {

            this._clickOnMonthTitle({
                fn : this.$DatePickerTestOne._afterDownType,
                scope : this,
                args : {
                    logCount : 0
                }
            });
        },

        _clickOnMonthTitle : function (cb) {
            var calendarDiv = this.getWidgetInstance("datepicker")._dropdown._calendar._domElt;
            var monthDiv = aria.utils.Dom.getDomElementsChildByTagName(calendarDiv, "table")[0];
            var monthTitle = aria.utils.Dom.getDomElementsChildByTagName(monthDiv, "div")[0];
            this._synEvents.click(monthTitle, {
                fn : this._afterMonthTitleClick,
                scope : this,
                args : {
                    cb : cb,
                    element : monthTitle
                }
            });
        },

        _afterMonthTitleClick : function (res, args) {
            aria.core.Timer.addCallback({
                fn : this._afterMonthTitleClickWait,
                scope : this,
                args : args,
                delay : 200
            });
        },

        _afterMonthTitleClickWait : function (args) {
            // This test should be enabled at some point
            // this._testFocus("datepicker", false);
            this.$callback(args.cb);
        },

        _afterCalendarType : function (res, args) {
            args = args || {};
            this._testDropDownOpen(false);
            this._testFocus(args.id, args.focused);
            var formattedDate = aria.utils.Date.format(aria.utils.Date.interpret("+6"), this.getDatePattern());
            this._checkValue(formattedDate);
            this._checkDataModel(aria.utils.Date.interpret("+6"));
            this._checkChangeLogCount(1);

            this.end();
        }
    }
});
