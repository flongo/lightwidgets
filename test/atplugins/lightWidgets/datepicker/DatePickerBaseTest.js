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
    $classpath : "test.atplugins.lightWidgets.datepicker.DatePickerBaseTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom", "aria.utils.SynEvents", "atplugins.lightWidgets.LazyLoader", "aria.utils.Date"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.apply(this, arguments);
        this._synEvents = aria.utils.SynEvents;
        this.data = {
            value : null,
            changeLogs : [],
            minValue : null,
            maxValue : null,
            pattern : null,
            dateFieldKeyDown : 0,
            calendarKeyDown : 0,
            calendarClick : 0,
            datePickerClick : 0
        };

    },
    $prototype : {

        setInput : function (id) {
            this._input = this._input || this.getDatePickerInput(id);
        },

        resetInput : function (id) {
            id = id || "datepicker";
            this._input = this.getDatePickerInput(id);
        },

        focus : function (id) {
            this.templateCtxt.$focus(id);
        },

        blur : function () {
            this.templateCtxt.$focus("blurElement");
        },

        clickOutside : function (cb) {
            this._synEvents.click(aria.utils.Dom.getElementById(this.templateCtxt.$getId("blurElement")), cb);
        },

        getDatePickerInput : function (id) {
            var widget = this.getWidgetInstance(id);
            return widget._domElt.children[0];
        },

        _checkValue : function (value) {
            this.assertEquals(this._input.value, value, "Value expected to be " + value + ". " + this._input.value
                    + " found instead.");
        },

        _checkChangeLogCount : function (n) {
            this.assertEquals(this.data.changeLogs.length, n, "On change has been called "
                    + this.data.changeLogs.length + " times instead of " + n + ".");
        },

        lazyLoad : function (cb) {
            atplugins.lightWidgets.LazyLoader.load("atplugins.lightWidgets.datepicker.DatePicker", cb);
        },

        _checkChangeLog : function (index, value) {
            this.assertEquals(this.data.changeLogs[index], value, "On change has been called with argument "
                    + this.data.changeLogs[index] + " instead of " + value + ".");
        },

        _checkDataModel : function (date) {
            this.assertTrue(aria.utils.Date.compare(date, this.data.value) === 0, "Data model is not correctly updated");

        },

        _getActiveElement : function () {
            return Aria.$window.Aria.$window.document.activeElement;
        },

        _typeInCalendar : function (res, args) {
            var toType = args.type, cb = args.cb;
            if (toType.length === 0) {
                this.$callback(cb);
            } else {
                var oneType = toType.splice(0, 1);
                this._synEvents.type(this._getActiveElement(), oneType[0], {
                    fn : this._typeInCalendar,
                    scope : this,
                    args : {
                        type : toType,
                        cb : cb
                    }
                });
            }
        },

        _clickOnExpandButton : function (cb, id, blur) {
            id = id || "datepicker";
            var widget = this.getWidgetInstance(id);
            var expandButton = widget._domElt.children[1];
            if (blur) {
                this._input.blur();
            }
            this._synEvents.click(expandButton, cb);

        },

        _testDropDownOpen : function (open, id) {
            id = id || "datepicker";
            var widget = this.getWidgetInstance(id);
            var isOpen = widget._dropdown ? widget._dropdown.isOpen() : false;
            this.assertEquals(isOpen, open, "Dropdown is not in the expected state");
        },

        _randomCalendarClick : function (cb, id) {
            id = id || "datepicker";

            var calendarDiv = this.getWidgetInstance(id)._dropdown._calendar._domElt;
            var element = this._lookForValidDiv(calendarDiv);
            var wrapper = new aria.templates.DomElementWrapper(element);
            var date = wrapper.getData("date");
            wrapper.$dispose();
            var self = this;
            this._synEvents.click(element, function () {
                self.$callback.apply(self, [cb, new Date(parseInt(date, 10))]);
                self = null;

            });
        },

        _lookForValidDiv : function (element) {
            var wrapper = new aria.templates.DomElementWrapper(element);
            var date = wrapper.getData("date");
            wrapper.$dispose();
            if (date) {
                return element;
            }

            var children = element.children;

            for (var i = 0, length = children.length; i < length; i++) {
                element = this._lookForValidDiv(children[i]);
                if (element) {
                    return element;
                }

            }
        },

        getDatePattern : function () {
            return this.data.pattern || "d/M/y";
        },

        _testFocus : function (id, focused) {

            id = id || "datepicker";
            var widget = this.getWidgetInstance(id);
            if (focused === false) {
                this.assertFalse(this._getActiveElement() == widget._dateField._domElt, "Widget " + id
                        + " should not have focus.");

            } else {
                this.assertTrue(this._getActiveElement() == widget._dateField._domElt, "Widget " + id
                        + " should have focus.");
            }
        }

    }
});
