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
    $classpath : "test.atplugins.lightWidgets.datepicker.DatePickerTestTwelve",
    $extends : "test.atplugins.lightWidgets.datepicker.DatePickerTestOne",
    $constructor : function () {
        this.$DatePickerTestOne.constructor.call(this);

        this.setTestEnv({
            template : "test.atplugins.lightWidgets.datepicker.DatePickerTestTwoTpl",
            data : this.data
        });
    },
    $destructor : function () {
        this.$DatePickerTestOne.$destructor.call(this);
    },
    $prototype : {
        _afterFirstType : function () {
            this.assertEquals(this.data.dateFieldKeyDown, 2, "on.keydown not properly called on the datefield.");
            this.$DatePickerTestOne._afterFirstType.call(this);
        },

        _afterDownType : function () {
            this.assertEquals(this.data.dateFieldKeyDown, 3, "on.keydown not properly called on the datefield.");
            this.$DatePickerTestOne._afterDownType.call(this);
        },
        _afterCalendarType : function () {
            this.assertEquals(this.data.calendarKeyDown, 0, "on.keydown has been called on the calendar, it should not.");
            this._testDropDownOpen(false);
            var formattedDate = aria.utils.Date.format(aria.utils.Date.interpret("+6"), this.getDatePattern());
            this._checkValue(formattedDate);
            this._checkDataModel(aria.utils.Date.interpret("+6"));
            this.blur();

            this._checkChangeLogCount(1);
            this._checkChangeLog(0, formattedDate);

            this._clickOnExpandButton({
                fn : this._afterFirstClick,
                scope : this
            });
        },

        _afterFirstClick : function () {
            this.assertEquals(this.data.datePickerClick, 1, "on.click not properly called on the date picker.");
            this._randomCalendarClick({
                fn : this._afterCalendarClick,
                scope : this
            });

        },

        _afterCalendarClick : function () {
            this.assertEquals(this.data.calendarClick, 1, "on.click not properly called on the calendar.");

            this.end();
        }
    }
});
