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
    $classpath : "test.atplugins.lightWidgets.autocomplete.AutocompleteBindTestFive",
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
            aria.utils.Json.setValue(this.data, "value", {
                label : "Air Canada",
                code : "AC"
            });
            this.checkTextValue("Air Canada");
            this.checkDataModel({
                label : "Air Canada",
                code : "AC"
            });

            this.focus();
            aria.core.Timer.addCallback({
                fn : this._afterFocus,
                scope : this,
                delay : 100
            });

        },

        _afterFocus : function () {

            this.checkTextValue("Air Canada");
            this.checkDataModel({
                label : "Air Canada",
                code : "AC"
            });
            this.blur();
            this.checkTextValue("Air Canada");
            this.checkDataModel({
                label : "Air Canada",
                code : "AC"
            });
            this.end();
        }
    }
});
