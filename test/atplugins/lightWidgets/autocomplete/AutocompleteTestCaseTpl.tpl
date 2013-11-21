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

{Template {
    $classpath : "test.atplugins.lightWidgets.autocomplete.AutocompleteTestCaseTpl",
    $hasScript : true,
    $wlibs : {
      "light" : "atplugins.lightWidgets.LightWidgetLib"
    }
}}

    {macro main()}
      <div id="container" style="width: 200px;height: 200px;">

        {@light:Autocomplete {
            id: "always",
            suggestionsTemplate: "atplugins.lightWidgets.autocomplete.AutocompleteTemplate",
            bind: {
              value: {
                  inside: data,
                  to: "location1"
              }
            },
            resourcesHandler: getAirLinesHandler(),
            attributes: {
              classList: ["dropdown"]
            },
            placeholder: "placeholder",
            autoselect: true,
            preselect: "always"
        } /}

        {@light:Autocomplete {
            id: "none",
            suggestionsTemplate: "atplugins.lightWidgets.autocomplete.AutocompleteTemplate",
            bind: {
              value: {
                  inside: data,
                  to: "location2"
              }
            },
            resourcesHandler: getAirLinesHandler(),
            attributes: {
              classList: ["dropdown"]
            },
            placeholder: "placeholder",
            autoselect: true,
            preselect: "none"
        } /}

        {@light:Autocomplete {
            id: "no_preselect",
            suggestionsTemplate: "atplugins.lightWidgets.autocomplete.AutocompleteTemplate",
            bind: {
              value: {
                  inside: data,
                  to: "location3"
              }
            },
            resourcesHandler: getAirLinesHandler(),
            attributes: {
              classList: ["dropdown"]
            },
            placeholder: "placeholder",
            autoselect: true
        } /}


    </div>
    <div id="outsideDiv">&nbsp;</div>
    {/macro}

{/Template}
