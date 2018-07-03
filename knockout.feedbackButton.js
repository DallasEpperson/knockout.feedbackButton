ko.bindingHandlers.feedbackButton = {
    configuration: {
      allClass: "btn waitable-button",
      inProgressClass: "waitable-button-waiting",
      successClass: "waitable-button-success",
      failClass: "waitable-button-fail",
      repeatDelayMS: 3000
    },
    init: function (element, valueAccessor, allBindingsAccessor) {
      var params = allBindingsAccessor().feedbackButton;
      var priorText = params.prior? params.prior: allBindingsAccessor().text;
      var duringText = params.during? params.during : priorText;
      var successText = params.success? params.success : priorText;
      var failText = params.fail? params.fail : priorText;
      var config = ko.bindingHandlers.feedbackButton.configuration;
      $(element).addClass(config.allClass);
      $(element).html("<i></i>" + priorText);
      
      var btnCallback = function(error, repeatable) {
        $(element).removeClass(config.inProgressClass);
        if(error){
          $(element).addClass(config.failClass);
          $(element).html("<i></i>" + failText);
        }else{
          $(element).addClass(config.successClass);
          $(element).html("<i></i>" + successText);
        }
        if(!repeatable) return;
        
        setTimeout(function() {
          $(element).removeClass(config.successClass);
          $(element).removeClass(config.failClass);
          $(element).html("<i></i>" + priorText);
          $(element).attr("disabled", false);
        }, config.repeatDelayMS);
      };
      
      $(element).on("click", function () {
        $(element).html("<i></i>" + duringText);
        $(element).addClass(config.inProgressClass);
        $(element).attr("disabled", true);
        params.do(btnCallback);
      });
    }
  };