# knockout.feedbackButton
KnockoutJS Binding for a button with visual feedback. Pull requests welcomed.

## Live Example
[CodePen.IO](https://codepen.io/dallasepperson/pen/XYQdNy?editors=1010)

## Requirements
* KnockoutJS (obviously)
* jQuery

## Features
Provides visual feedback for
* Buttonpress has occurred and triggered some event
  * Button is disabled in this phase
* Event succeeded
* Event failed
* Event ready to be tried again (if applicable)

## Implementation
Give your button a data-bind of `feedbackButton` like so. The `do` parameter might be the initiator of some AJAX call for example.
```HTML
<button type="button" data-bind="feedbackButton: {do: SomeFunction, prior: 'Search', during: 'Searching'}"></button>
```  
  
Add a callback parameter to your function. Example:
```JS
  self.SomeFunction = function(buttonCallback) {
    //Pretend this is some AJAX search call
    setTimeout(function() {self.OnFunctionResult(buttonCallback)}, 5000);
  };
```

Add a callback parameter to your AJAX callback function. Example:
```JS
  self.OnFunctionResult = function(buttonCallback) {
    //Pretend this is some AJAX callback
    buttonCallback(true, true);
  };
```

## Configuration
```JS
// Class(es) added to every feedbackButton
ko.bindingHandlers.feedbackButton.configuration.allClass = "btn waitable-button";

// Class(es) added to button after press but before callback
ko.bindingHandlers.feedbackButton.configuration.inProgressClass = "waitable-button-waiting";

// Class(es) added to button after callback with error != true
ko.bindingHandlers.feedbackButton.configuration.successClass = "waitable-button-success";

// Class(es) added to button after callback with error == true
ko.bindingHandlers.feedbackButton.configuration.failClass = "waitable-button-fail";

// Time to wait (in milliseconds) after callback before resetting button to original state
// (Not applicable unless callback function returns repeatable == true)
ko.bindingHandlers.feedbackButton.configuration.repeatDelayMS = 3000;
```