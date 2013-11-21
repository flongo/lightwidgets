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
    $classpath : "test.atplugins.lightWidgets.autocomplete.AutocompleteTestCase",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom", "aria.utils.SynEvents", "atplugins.lightWidgets.LazyLoader"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
    },
    $destructor : function () {
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {
            var document = Aria.$window.document;
            var autocompletes = document.getElementsByTagName("input");

            this.firstAutocomplete = autocompletes[0];
            this.secondAutocomplete = autocompletes[1];
            this.thirdAutocomplete = autocompletes[2];

            aria.utils.SynEvents.click(this.firstAutocomplete, {
                fn : this.afterFirstClickFirstWidget,
                scope : this
            });
        },

        afterFirstClickFirstWidget : function () {
            if (!atplugins.lightWidgets.LazyLoader.isLoaded("atplugins.lightWidgets.autocomplete.Autocomplete")) {
                atplugins.lightWidgets.LazyLoader.load("atplugins.lightWidgets.autocomplete.Autocomplete", {
                    fn : this._continue,
                    scope : this
                });
            }
        },

        _continue : function () {
            aria.utils.SynEvents.type(this.firstAutocomplete, "a", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstTypeFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFirstTypeFirstWidget : function () {
            var firstWidget = this.getWidgetInstance("always");
            this.firstDM = firstWidget.data;

            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.firstDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 4, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.firstAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstCancFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFirstCancFirstWidget : function () {
            this.assertFalse(this.firstDM.popupOpen, "Autocomplete popup is open");
            aria.utils.SynEvents.type(this.firstAutocomplete, "ai", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondTypeFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterSecondTypeFirstWidget : function () {
            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.firstDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.firstAutocomplete, "[down][down]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterKBDownFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterKBDownFirstWidget : function () {
            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.firstDM.highlightedIdx, 2, "The first element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.firstAutocomplete, "[up]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterKBUpFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterKBUpFirstWidget : function () {
            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.firstDM.highlightedIdx, 1, "The first element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.firstAutocomplete, "\r", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterEnterFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterEnterFirstWidget : function () {
            this.assertFalse(this.firstDM.popupOpen, "Autocomplete popup is open");
            this.assertEquals(this.firstAutocomplete.value, "Air France", "The HTML element value is not equals to Air France");

            aria.utils.SynEvents.type(this.firstAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondCancFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterSecondCancFirstWidget : function () {
            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.firstDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 2, "The suggestions are not been loaded");

            /*
             * Test for the escape key, that is not working because there is maybe a problem with aria.utils.SynEvents.type with [escape]
             *
             * aria.utils.SynEvents.type(this.firstAutocomplete, "[escape]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterKBEscFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
            },

            afterKBEscFirstWidget : function () {
            debugger;
            this.assertFalse(this.firstDM.popupOpen, "Autocomplete popup is open");
            this.assertEquals(this.firstAutocomplete.value, "Air Franc", "The HTML element value is not equals to Air Franc");*/

            aria.utils.SynEvents.type(this.firstAutocomplete, "e", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterThirdTypeFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterThirdTypeFirstWidget : function () {
            var document = Aria.$window.document;
            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.firstDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 2, "The suggestions are not been loaded");
            this.assertEquals(this.firstAutocomplete.value, "Air France", "The HTML element value is not equals to Air France");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            var start = aria.utils.Dom.calculatePosition(items[0], false);
            var end = aria.utils.Dom.calculatePosition(items[1], false);

            aria.utils.SynEvents.move({
                from : {
                    clientX : start.left,
                    clientY : start.top
                },
                to : {
                    clientX : end.left,
                    clientY : end.top
                },
                duration : 100
            }, items[0], {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterMoveFirstWidget,
                        scope : this,
                        delay : 300
                    });
                },
                scope : this
            });
        },

        afterMoveFirstWidget : function () {
            var document = Aria.$window.document;
            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.highlightedIdx, 1, "The second element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 2, "The suggestions are not been loaded");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            aria.utils.SynEvents.click(items[1], {
                fn : this.afterClickOnItemFirstWidget,
                scope : this
            });
        },

        afterClickOnItemFirstWidget : function () {
            this.assertFalse(this.firstDM.popupOpen, "Autocomplete popup is open");
            this.assertEquals(this.firstAutocomplete.value, "Air France2", "The HTML element value is not equals to Air France2");

            aria.utils.SynEvents.click(this.firstAutocomplete, {
                fn : this.afterSecondClickFirstWidget,
                scope : this
            });
        },

        afterSecondClickFirstWidget : function () {
            aria.utils.SynEvents.type(this.firstAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterThirdCancFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterThirdCancFirstWidget : function () {
            aria.utils.SynEvents.type(this.firstAutocomplete, "a", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFourthTypeFirstWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFourthTypeFirstWidget : function () {
            this.assertTrue(this.firstDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.firstDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.firstDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.firstDM.items.length, 4, "The suggestions are not been loaded");

            var outside = aria.utils.Dom.getElementById("outsideDiv");

            aria.utils.SynEvents.click(outside, {
                fn : this.afterClickOutside,
                scope : this
            });
        },

        afterClickOutside : function () {
            this.assertFalse(this.firstDM.popupOpen, "Autocomplete popup is open");

            aria.utils.SynEvents.click(this.secondAutocomplete, {
                fn : this.afterFirstClickSecondWidget,
                scope : this
            });
        },

        afterFirstClickSecondWidget : function () {
            aria.utils.SynEvents.type(this.secondAutocomplete, "a", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstTypeSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFirstTypeSecondWidget : function () {
            var secondWidget = this.getWidgetInstance("none");
            this.secondDM = secondWidget.data;

            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.selectedIdx, null, "The first element is selected");
            this.assertEquals(this.secondDM.highlightedIdx, -1, "The first element is highlighted");
            this.assertEquals(this.secondDM.items.length, 4, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.secondAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstCancSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFirstCancSecondWidget : function () {
            this.assertFalse(this.secondDM.popupOpen, "Autocomplete popup is open");

            aria.utils.SynEvents.type(this.secondAutocomplete, "ai", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondTypeSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterSecondTypeSecondWidget : function () {
            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.selectedIdx, null, "The first element is selected");
            this.assertEquals(this.secondDM.highlightedIdx, -1, "The first element is highlighted");
            this.assertEquals(this.secondDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.secondAutocomplete, "[down][down]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterKBDownSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterKBDownSecondWidget : function () {
            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.selectedIdx, null, "The second element is not selected");
            this.assertEquals(this.secondDM.highlightedIdx, 1, "The second element is not highlighted");
            this.assertEquals(this.secondDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.secondAutocomplete, "[up]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterKBUpSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterKBUpSecondWidget : function () {
            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.secondDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.secondDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.secondAutocomplete, "\r", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterEnterSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterEnterSecondWidget : function () {
            this.assertFalse(this.secondDM.popupOpen, "Autocomplete popup is open");
            this.assertEquals(this.secondAutocomplete.value, "Air France2", "The HTML element value is not equals to Air France2");

            aria.utils.SynEvents.type(this.secondAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondCancSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterSecondCancSecondWidget : function () {
            var document = Aria.$window.document;
            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.selectedIdx, null, "The first element is selected");
            this.assertEquals(this.secondDM.highlightedIdx, -1, "The first element is highlighted");
            this.assertEquals(this.secondDM.items.length, 2, "The suggestions are not been loaded");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            var start = aria.utils.Dom.calculatePosition(this.secondAutocomplete, false);
            var end = aria.utils.Dom.calculatePosition(items[1], false);

            aria.utils.SynEvents.move({
                from : {
                    clientX : start.left,
                    clientY : start.top
                },
                to : {
                    clientX : end.left,
                    clientY : end.top
                },
                duration : 100
            }, this.secondAutocomplete, {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstMoveSecondWidget,
                        scope : this,
                        delay : 300
                    });
                },
                scope : this
            });
        },

        afterFirstMoveSecondWidget : function () {
            var document = Aria.$window.document;

            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.highlightedIdx, 1, "The second element is not highlighted");
            this.assertEquals(this.secondDM.items.length, 2, "The suggestions are not been loaded");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            var start = aria.utils.Dom.calculatePosition(items[1], false);
            var end = aria.utils.Dom.calculatePosition(items[0], false);

            aria.utils.SynEvents.move({
                from : {
                    clientX : start.left,
                    clientY : start.top
                },
                to : {
                    clientX : end.left,
                    clientY : end.top
                },
                duration : 100
            }, items[1], {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondMoveSecondWidget,
                        scope : this,
                        delay : 300
                    });
                },
                scope : this
            });

        },

        afterSecondMoveSecondWidget : function () {
            var document = Aria.$window.document;

            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.highlightedIdx, 0, "The second element is not highlighted");
            this.assertEquals(this.secondDM.items.length, 2, "The suggestions are not been loaded");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            aria.utils.SynEvents.click(items[0], {
                fn : this.afterClickOnItemSecondWidget,
                scope : this
            });
        },

        afterClickOnItemSecondWidget : function () {
            this.assertFalse(this.secondDM.popupOpen, "Autocomplete popup is open");
            this.assertEquals(this.secondAutocomplete.value, "Air France", "The HTML element value is not equals to Air France");

            aria.utils.SynEvents.click(this.secondAutocomplete, {
                fn : this.afterSecondClickSecondWidget,
                scope : this
            });
        },

        afterSecondClickSecondWidget : function () {
            aria.utils.SynEvents.type(this.secondAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterThirdCancSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterThirdCancSecondWidget : function () {
            aria.utils.SynEvents.type(this.secondAutocomplete, "a", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFourthTypeSecondWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFourthTypeSecondWidget : function () {
            this.assertTrue(this.secondDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.secondDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.secondDM.highlightedIdx, -1, "The first element is not highlighted");
            this.assertEquals(this.secondDM.items.length, 4, "The suggestions are not been loaded");

            var outside = aria.utils.Dom.getElementById("outsideDiv");

            aria.utils.SynEvents.click(outside, {
                fn : this.afterSecondClickOutside,
                scope : this
            });
        },

        afterSecondClickOutside : function () {
            this.assertFalse(this.secondDM.popupOpen, "Autocomplete popup is open");

            aria.utils.SynEvents.click(this.thirdAutocomplete, {
                fn : this.afterFirstClickThirdWidget,
                scope : this
            });
        },

        afterFirstClickThirdWidget : function () {
            aria.utils.SynEvents.type(this.thirdAutocomplete, "a", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstTypeThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFirstTypeThirdWidget : function () {
            var thirdWidget = this.getWidgetInstance("no_preselect");
            this.thirdDM = thirdWidget.data;

            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is selected");
            this.assertEquals(this.thirdDM.highlightedIdx, -1, "The first element is highlighted");
            this.assertEquals(this.thirdDM.items.length, 4, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.thirdAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstCancThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFirstCancThirdWidget : function () {
            this.assertFalse(this.thirdDM.popupOpen, "Autocomplete popup is open");

            aria.utils.SynEvents.type(this.thirdAutocomplete, "ai", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondTypeThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterSecondTypeThirdWidget : function () {
            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is selected");
            this.assertEquals(this.thirdDM.highlightedIdx, -1, "The first element is highlighted");
            this.assertEquals(this.thirdDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.thirdAutocomplete, "[down][down]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterKBDownThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterKBDownThirdWidget : function () {
            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The second element is not selected");
            this.assertEquals(this.thirdDM.highlightedIdx, 1, "The second element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.thirdAutocomplete, "[up]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterKBUpThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterKBUpThirdWidget : function () {
            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.thirdDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.thirdAutocomplete, "\r", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterEnterThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterEnterThirdWidget : function () {
            this.assertFalse(this.thirdDM.popupOpen, "Autocomplete popup is open");
            this.assertEquals(this.thirdAutocomplete.value, "Air France2", "The HTML element value is not equals to Air France2");

            aria.utils.SynEvents.type(this.thirdAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondCancThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterSecondCancThirdWidget : function () {
            var document = Aria.$window.document;

            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is selected");
            this.assertEquals(this.thirdDM.highlightedIdx, -1, "The first element is highlighted");
            this.assertEquals(this.thirdDM.items.length, 2, "The suggestions are not been loaded");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            var start = aria.utils.Dom.calculatePosition(this.thirdAutocomplete, false);
            var end = aria.utils.Dom.calculatePosition(items[1], false);

            aria.utils.SynEvents.move({
                from : {
                    clientX : start.left,
                    clientY : start.top
                },
                to : {
                    clientX : end.left,
                    clientY : end.top
                },
                duration : 100
            }, this.thirdAutocomplete, {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFirstMoveThirdWidget,
                        scope : this,
                        delay : 300
                    });
                },
                scope : this
            });
        },

        afterFirstMoveThirdWidget : function () {
            var document = Aria.$window.document;

            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.highlightedIdx, 1, "The second element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 2, "The suggestions are not been loaded");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            var start = aria.utils.Dom.calculatePosition(items[1], false);
            var end = aria.utils.Dom.calculatePosition(items[0], false);

            aria.utils.SynEvents.move({
                from : {
                    clientX : start.left,
                    clientY : start.top
                },
                to : {
                    clientX : end.left,
                    clientY : end.top
                },
                duration : 100
            }, items[1], {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondMoveThirdWidget,
                        scope : this,
                        delay : 300
                    });
                },
                scope : this
            });

        },

        afterSecondMoveThirdWidget : function () {
            var document = Aria.$window.document;

            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.highlightedIdx, 0, "The second element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 2, "The suggestions are not been loaded");

            var divCont = aria.utils.Dom.getElementById("autocomplete_container");

            if (document.getElementsByClassName) {
                var items = divCont.getElementsByClassName("item");
            } else if (document.querySelectorAll) {
                var items = divCont.querySelectorAll(".item");
            } else {
                if (document.all) {
                    var allElements = document.all;
                } else {
                    var allElements = document.getElementsByTagName("div");
                }

                // Empty placeholder to put in the found elements with the class name
                var foundElements = [];

                for (var i = 0, ii = allElements.length; i < ii; i++) {
                    if (allElements[i].className.match(/^item$/)) {
                        foundElements[foundElements.length] = allElements[i];
                    }
                }

                var items = [];
                items.push(foundElements[foundElements.length - 2]);
                items.push(foundElements[foundElements.length - 1]);
            }

            aria.utils.SynEvents.click(items[0], {
                fn : this.afterClickOnItemThirdWidget,
                scope : this
            });
        },

        afterClickOnItemThirdWidget : function () {
            this.assertFalse(this.thirdDM.popupOpen, "Autocomplete popup is open");
            this.assertEquals(this.thirdAutocomplete.value, "Air France", "The HTML element value is not equals to Air France");

            aria.utils.SynEvents.click(this.thirdAutocomplete, {
                fn : this.afterSecondClickThirdWidget,
                scope : this
            });
        },

        afterSecondClickThirdWidget : function () {
            aria.utils.SynEvents.type(this.thirdAutocomplete, "\b", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterThirdCancThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterThirdCancThirdWidget : function () {
            aria.utils.SynEvents.type(this.thirdAutocomplete, "a", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFourthTypeThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFourthTypeThirdWidget : function () {
            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.thirdDM.highlightedIdx, -1, "The first element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 4, "The suggestions are not been loaded");

            var outside = aria.utils.Dom.getElementById("outsideDiv");

            aria.utils.SynEvents.click(outside, {
                fn : this.afterThirdClickOutside,
                scope : this
            });
        },

        afterThirdClickOutside : function () {
            this.assertFalse(this.thirdDM.popupOpen, "Autocomplete popup is open");

            aria.utils.SynEvents.click(this.thirdAutocomplete, {
                fn : this.afterThirdClickThirdWidget,
                scope : this
            });
        },

        afterThirdClickThirdWidget : function () {
            aria.utils.SynEvents.type(this.thirdAutocomplete, "Air", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterFifthTypeThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterFifthTypeThirdWidget : function () {
            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.thirdDM.highlightedIdx, -1, "The first element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 3, "The suggestions are not been loaded");

            var outside = aria.utils.Dom.getElementById("outsideDiv");

            aria.utils.SynEvents.click(outside, {
                fn : this.afterFourthClickOutside,
                scope : this
            });
        },

        afterFourthClickOutside : function () {
            this.assertFalse(this.thirdDM.popupOpen, "Autocomplete popup is open");

            aria.utils.SynEvents.click(this.thirdAutocomplete, {
                fn : this.afterFourthClickThirdWidget,
                scope : this
            });
        },

        afterFourthClickThirdWidget : function () {
            aria.utils.SynEvents.type(this.thirdAutocomplete, "[down]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterSecondDownThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterSecondDownThirdWidget : function () {
            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.thirdDM.highlightedIdx, -1, "The first element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 3, "The suggestions are not been loaded");

            aria.utils.SynEvents.type(this.thirdAutocomplete, "[down]", {
                fn : function () {
                    aria.core.Timer.addCallback({
                        fn : this.afterThirdDownThirdWidget,
                        scope : this,
                        delay : 100
                    });
                },
                scope : this
            });
        },

        afterThirdDownThirdWidget : function () {
            this.assertTrue(this.thirdDM.popupOpen, "Autocomplete popup is closed");
            this.assertEquals(this.thirdDM.selectedIdx, null, "The first element is not selected");
            this.assertEquals(this.thirdDM.highlightedIdx, 0, "The first element is not highlighted");
            this.assertEquals(this.thirdDM.items.length, 3, "The suggestions are not been loaded");

            var outside = aria.utils.Dom.getElementById("outsideDiv");

            aria.utils.SynEvents.click(outside, {
                fn : this.afterFifthClickOutside,
                scope : this
            });
        },

        afterFifthClickOutside : function () {
            this.assertFalse(this.thirdDM.popupOpen, "Autocomplete popup is open");
            this.end();
        }
    }
});
