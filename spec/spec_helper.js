// =========================
// = Set up some test data =
// =========================

$.fn.testData = {
  "id"                : "2",
  "street1"           : "456 Real St.",
  "notes"             : "Is actually broke.",
  "gender"            : "Male",
  "personality"       : "Outrageous",
  "level_of_interest" : "Extremely",
  "eye_color"         : "Hazel",
  "hair_color"        : "Red",
  "is_alive"          : "false",
  "is_dead"           : "true",
  "address" : {
    "street1" : "Address 456 Real St."
  },
  "employer" : {
    "address" : {
      "street1" : "Employer Address 456 Real St."
    }
  },
  "employers" : [
    { 
      "address" : {
        "street1" : "Employers Address 456 Real St."
      }
    }
  ],
  "more_employers" : [
    { 
      "addresses" : [
        { "streetx" : "123 Fail St." },
        { "street1" : "Employers Addresses 456 Real St." },
      ]
    }
  ],
  "spouses" : [
    {
      "employers" : [
        {
          "addresses" : [
            {
              "street1" : "123 Fail St."          
            }
          ]
        },
        {
          "addresses" : [
            {
              "streetx" : "123 Fail St."          
            },
            {
              "streetx" : "123 Fail Again St."          
            },
            {
              "street1" : "Spouses Employers Addresses 456 Real St."          
            }
          ]
        }
      ]     
    }
  ],
  "spouse" : {
    "employer" : {
      "address" : {
        "street1" : "Spouse Employer Address 456 Real St."          
      }
    },
  }
};


// ============================================
// = Override jquery's ajax so we can mock it =
// ============================================

// Setup a standard success call
$.ajax = function(opts) {
  opts.success.call( opts && opts.context, $.fn.testData, 'success' );
};

// Setup our ajax remock for easy customization
var remockAjax = function(code) {
  
  // Store the original mock
  var originalAjax = $.ajax;
  
  // Reset after
  this.after( function() { $.ajax = originalAjax } );
  
  $.ajax = function(opts) {
    code.call(this, opts);    
  };
};