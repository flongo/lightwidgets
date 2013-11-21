# Light autocomplete and datepicker #

This is a plugin for [Aria Templates](http://ariatemplates.com/ "Aria Templates").
It defines a widget library which is based on the `html` widgets available in the framework. They are completely decoupled from the skinning system of Aria Templates and from the the `aria` widget library.

## Usage ##

To use it, there is a set a scripts that are available after the usual *npm install*:
 - *npm run-script lint* : runs JShint, verifies lowercase and checks files indentation
 - *npm run-script build* : packages the plugin only with [atpackager](https://github.com/ariatemplates/atpackager "atpackager") and put the results in build/output folder
 - *npm run-script test* : run all unit tests in PhantomJS with [attester](http://attester.ariatemplates.com "attester")
 - *npm run-script start* : starts [attester](http://attester.ariatemplates.com "attester") and waits for real browsers to connect
 - *npm run-script sample* : starts a webserver to run the samples (at <http://localhost:8080/> or <http://localhost:8080/index.html?devMode=true> )


## Documentation ##

A new widget library is defined [`LightWidgetLib`](./src/atplugins/lightWidgets/LightWidgetLib.js) which contains the following widgets:
 - `TextInput`: a text input based on the `html` textinput widget. It allows to register a listener to the `change` event in a cross-browser way.
 - `Autocomplete`: an autocomplete which allows to specify a resources handler and a template to print the list of suggestions, just like the standard `aria` autocomplete. [Configuration bean](./src/atplugins/lightWidgets/autocomplete/AutocompleteCfgBeans.js).
 - `DateField`: an input which is able to interpret the input string and turn it into a date (see [here](http://www.ariatemplates.com/usermanual/latest/datefield) for more information on the interpreter). [Configuration bean](./src/atplugins/lightWidgets/datefield/DateFieldCfgBeans.js).
 - `Calendar`: a simple calendar, very similar to the `aria` calendar, but skinless and simpler. [Configuration bean](./src/atplugins/lightWidgets/calendar/CalendarCfgBeans.js).
 - `DatePicker`: it combines the light `DateField` and `Calendar` widgets. [Configuration bean](./src/atplugins/lightWidgets/datepicker/DatePickerCfgBeans.js).

The date-picker and autocomplete expose a `lazy` property in their configuration. If set to true, all dependencies  needed to show the dropdown will be loaded only once the dropdown actually has to be shown.