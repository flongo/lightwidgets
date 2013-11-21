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
    $classpath : "test.atplugins.lightWidgets.datepicker.DatePickerTestOne",
    $extends : "test.atplugins.lightWidgets.datepicker.DatePickerBaseTest",
    $constructor : function () {
        this.$DatePickerBaseTest.constructor.call(this);
        this.data.minValue = aria.utils.Date.interpret("-50");
        this.data.maxValue = aria.utils.Date.interpret("+50");
        this._initialText = "+5";

        this.setTestEnv({
            template : "test.atplugins.lightWidgets.datepicker.DatePickerTestOneTpl",
            data : this.data
        });
    },
    $destructor : function () {
        this.$DatePickerBaseTest.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {
            this.setInput("datepicker");
            this.focus("datepicker");
            this._synEvents.type(this._input, this._initialText, {
                fn : this._afterFirstType,
                scope : this
            });

        },
        _afterFirstType : function () {
            this._checkValue(this._initialText);
            this._checkChangeLogCount(0);
            this._synEvents.type(this._input, "[down]", {
                fn : this._lazyLoad,
                scope : this
            });

        },
        _lazyLoad : function () {
            this.lazyLoad({
                fn : this._afterDownType,
                scope : this
            });
        },

        _afterDownType : function (res, args) {
            args = args || {
                logCount : 0
            };
            var formattedDate = aria.utils.Date.format(aria.utils.Date.interpret(this._initialText), this.getDatePattern());
            this._checkValue(formattedDate);
            this._checkChangeLogCount(args.logCount);
            this._checkDataModel(aria.utils.Date.interpret(this._initialText));
            this._testDropDownOpen(true);

            this._typeInCalendar(null, {
                type : ["[right]", "[enter]"],
                cb : {
                    fn : this._afterCalendarType,
                    scope : this,
                    args : {
                        focused : true
                    }
                }
            });
        },
        _afterCalendarType : function (res, args) {
            args = args || {};
            this._testDropDownOpen(false);
            this._testFocus(args.id, args.focused);
            var formattedDate = aria.utils.Date.format(aria.utils.Date.interpret("+6"), this.getDatePattern());
            this._checkValue(formattedDate);
            this._checkDataModel(aria.utils.Date.interpret("+6"));
            this.blur();

            this._checkChangeLogCount(1);
            this._checkChangeLog(0, formattedDate);

            this.end();
        }
    }
});
