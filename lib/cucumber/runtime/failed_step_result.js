var FailedStepResult = function(failureException, stepName) {
  var self = {
    isSuccessful: function isSuccessful() { return false; },
    isPending:    function isPending()    { return false; },
    isFailed:     function isFailed()     { return true; },

    getName:      function getName()      { return stepName; },
    getFailureException: function getFailureException() {
      return failureException;
    }
  };
  return self;
};
module.exports = FailedStepResult;
