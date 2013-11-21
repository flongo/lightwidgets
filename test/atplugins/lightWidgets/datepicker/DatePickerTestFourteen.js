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
    $classpath : "test.atplugins.lightWidgets.datepicker.DatePickerTestFourteen",
    $extends : "test.atplugins.lightWidgets.datepicker.DatePickerBaseTest",
    $constructor : function () {
        this.$DatePickerBaseTest.constructor.call(this);
        this.data.minValue = aria.utils.Date.interpret("-50");
        this.data.maxValue = aria.utils.Date.interpret("+50");

        this.setTestEnv({
            template : "test.atplugins.lightWidgets.datepicker.DatePickerTestThreeTpl",
            data : this.data
        });
    },
    $destructor : function () {
        this.$DatePickerBaseTest.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {
            this.setInput("datepickerTwo");

            this._clickOnExpandButton({
                fn : this._afterExpand,
                scope : this
            }, "datepickerTwo");

        },
        _afterExpand : function () {
            this.resetInput("datepicker");

            this._synEvents.click(this._input, {
                fn : this._afterClick,
                scope : this
            });
        },

        _afterClick : function () {
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

        _afterDownType : function () {
            this._testDropDownOpen(true, "datepicker");
            // this._testDropDownOpen(false, "datepickerTwo");
            this.end();
        }
    }
});
