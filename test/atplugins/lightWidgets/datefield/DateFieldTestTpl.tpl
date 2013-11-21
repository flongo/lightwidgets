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
  $classpath : "test.atplugins.lightWidgets.datefield.DateFieldTestTpl",
  $hasScript : false,
  $wlibs : {
    "light" : "atplugins.lightWidgets.LightWidgetLib"
  }

}}

  {macro main()}

    {@light:DateField {
      id : "datefield_one",
      bind : {
        "value" : {
          to : "date",
          inside : data
        }
      },
      pattern : "dd-MM-yyyy",
      minValue : new Date(2013, 0, 1),
      maxValue : new Date(2013, 3, 1)
    }/}

    {@light:DateField {
      id : "datefield_two",
      bind : {
        "value" : {
          to : "date",
          inside : data
        }
      },
      pattern : "dd MMM yy",
      minValue : new Date(2013, 0, 1),
      maxValue : new Date(2013, 3, 1)
    }/}

    <a href="#" {id "linkToBlur" /}>link</a>
  {/macro}

{/Template}