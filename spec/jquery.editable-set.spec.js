describe( "EditableSet", function() {  
  
  beforeEach(function() {
    // ============================
    // = Register custom matchers =
    // ============================
    
    this.addMatchers({
      toExist: function( expected ) { return this.actual.length >= 1 },
      toBeVisible: function( expected ) { return this.actual.is(':visible') === true },
      toHaveAttribute: function( expected ) {
        // First check to see if the expected is a string or an object
        // See if it matches any of the attributes from the actual element
        if( expected.constructor === String ) {
            return this.actual[0].getAttribute(expected) ? true : false;
        } else {          
          for ( attribute in expected ) {          
            return this.actual[0].getAttribute(attribute) === expected[attribute] ? true : false;
          }
        }              
      },
      toHaveOptions: function( expected ) {
        // First check to see if it's a multi-dimensional array or single
        if( expected.constructor === Array && expected[0].constructor === Array ) {
          for ( var i=0; i <= expected.length; i++ ) {
            var text  = this.actual.children()[i].text === expected[i][0] ? true : false;
            var value = this.actual.children()[i].value === expected[i][1] ? true : false;
            return value && text;
          }
        } else {
          for ( var i=0; i <= expected.length; i++ ) {
            return this.actual.children()[i].value === expected[0] ? true : false;
          }          
        }
      }
    });    
  });
  
  
  // ========================
  // = Converting to a form =
  // ========================
  
  describe( "when converting to a form", function() {
    
    beforeEach(function() {
      // ======================================
      // = Reset the dom, reload the snippets =
      // ======================================
      
      $( '#test' ).html( '' );
      Scupper.init( 'snippets' );
      Scupper.insert_into( 'editable_snippet', 'test' );


      // ======================================
      // = Set up the options for editableSet =
      // ======================================
      
      $('.editable').editableSet({ titleElement: 'h3' });

      
      // =======================
      // = Activate the plugin =
      // =======================
      
      $('.editable').trigger( 'dblclick' );
    });
    
    
    // =====================
    // = Creating the form =
    // =====================
    
    describe( "building the form", function() {
      
      it( "should wrap the contents with a form element", function() {
        expect( $('.editable').has('form') ).toExist();        
      });
      
      it( "should move the +title element+ out of the form if it exists", function() {
        expect( $('.editable').children().first().is('h3') ).toBeTruthy();
        expect( $('.editable').children().first().next().is('form') ).toBeTruthy();
      });
      
      it( "should automatically assign the POST method", function() {
        expect( $('form', '.editable').attr('method') ).toEqual('POST');
      });
      
      
      // ============================================
      // = Creating the "Save" and "Cancel" buttons =
      // ============================================
      
      describe( "'Save' and 'Cancel' buttons", function() {
        
        it( "should create a 'Save' button", function() {
          expect( $('.form_submit') ).toExist();
        });

        it( "should create a 'Cancel' button after the 'Save' button", function() {
          expect( $('.form_cancel') ).toExist();
          expect( $('.form_cancel').prev().hasClass('form_submit') ).toBeTruthy();
        });
        
        it( "should append the buttons to the title", function() {
          expect( $('.form_submit').parent().is('h3') ).toBeTruthy();
        });

        it( "should append the buttons to the form if no title exists", function() {
          
          // Reset and remove the header
          $( '#test' ).html( '' );
          Scupper.init( 'snippets' );
          Scupper.insert_into( 'editable_snippet', 'test' );
          $('.editable').find('h3').remove();
          $('.editable').editableSet().trigger('dblclick');
          
          expect( $('.form_submit').parent().is('form') ).toBeTruthy();
          
        });
      });
            
    });
    
    
    // ===========================
    // = Working with text input = 
    // ===========================
    
    describe( "when converting to a text field", function() {
      var input;
      
      beforeEach(function() {
        input = $('input[name="customer[street1]"]');
      });

      it( "should generate an input", function() {           
        expect( input ).toExist();
      });
    
      it( "should have the same key attributes", function() {
        expect( input ).toHaveAttribute( { name: "customer[street1]" } );
      });
    
      it( "should have default to a 'text' type", function() {
        expect( input ).toHaveAttribute( { type: "text" } );
      });
      
      it( "should have the same value as the span's text", function() {
        expect( input.val() ).toEqual('123 Fake St.');
      });
    
    });


    // ============================
    // = Working with email input = 
    // ============================
    
    describe( "when converting to an email field", function() {
      var input;
      
      beforeEach(function() {
        input = $('input[name="customer[email]"]');
      });
    
      it( "should generate an input", function() {   
        expect( input ).toExist();
      });
    
      it( "should have the same key attributes", function() {
        expect( input ).toHaveAttribute( { name: "customer[email]" } );
      });
    
      it( "should have an 'email' type", function() {
        expect( input ).toHaveAttribute( { type: "email" } );
      });
      
      it( "should have the same value as the span's text", function() {
        expect( input.val() ).toEqual('john.doe@google.com');
      });
    
    });


    // ============================
    // = Working with url input = 
    // ============================
    
    describe( "when converting to a url field", function() {
      var input;
      
      beforeEach(function() {
        input = $('input[name="customer[url]"]');
      });
    
      it( "should generate an input", function() {   
        expect( input ).toExist();
      });
    
      it( "should have the same key attributes", function() {
        expect( input ).toHaveAttribute( { name: "customer[url]" } );
      });
    
      it( "should have a 'url' type", function() {
        expect( input ).toHaveAttribute( { type: "url" } );
      });
      
      it( "should have the same value as the span's text", function() {
        expect( input.val() ).toEqual('http://editable-set.heroku.com');
      });
    
    });


    // ============================
    // = Working with number input = 
    // ============================
    
    describe( "when converting to a number field", function() {
      var input;
      
      beforeEach(function() {
        input = $('input[name="customer[age]"]');
      });
    
      it( "should generate an input", function() {   
        expect( input ).toExist();
      });
    
      it( "should have the same key attributes", function() {
        expect( input ).toHaveAttribute( { name: "customer[age]" } );
        expect( input ).toHaveAttribute( { min: "0" } );
        expect( input ).toHaveAttribute( { max: "120" } );
        expect( input ).toHaveAttribute( { step: "1" } );
      });
    
      it( "should have a 'number' type", function() {
        expect( input ).toHaveAttribute( { type: "number" } );
      });
      
      it( "should have the same value as the span's text", function() {
        expect( input.val() ).toEqual('25');
      });
    
    });


    // ============================
    // = Working with range input = 
    // ============================
    
    describe( "when converting to a range field", function() {
      var input;
      
      beforeEach(function() {
        input = $('input[name="customer[rage]"]');
      });
    
      it( "should generate an input", function() {   
        expect( input ).toExist();
      });
    
      it( "should have the same key attributes", function() {
        expect( input ).toHaveAttribute( { name: "customer[rage]" } );
        expect( input ).toHaveAttribute( { min: "0" } );
        expect( input ).toHaveAttribute( { max: "10" } );
        expect( input ).toHaveAttribute( { step: "10" } );
      });
    
      it( "should have a 'range' type", function() {
        expect( input ).toHaveAttribute( { type: "range" } );
      });
      
      it( "should have the same value as the span's text", function() {
        expect( input.val() ).toEqual('10');
      });
    
    });
    
    
    // ==============================
    // = Working with hidden inputs =
    // ==============================
    
    describe( "when converting to a hidden input", function() {
      var input;
      
      beforeEach(function() {
        input = $('input[name="customer[id]"]');
      });
      
      it( "should generate an input", function() {   
        expect( input ).toExist();
      });
    
      it( "should have the same key attributes, plus a 'value' attribute", function() {
        expect( input ).toHaveAttribute( { name: "customer[id]" } );
        // Because the following line causes issues in IE, we'll just test the visibility
        // expect( input ).toHaveAttribute( { style: "display: none;" } );
        expect( input.is(':visible') ).toBeFalsy();
        expect( input ).toHaveAttribute( { value: "1" } );
      });
    
      it( "should have a 'hidden' type", function() {
        expect( input ).toHaveAttribute( { type: "hidden" } );
      });
      
      it( "should have the same value as the span's text", function() {
        expect( input.val() ).toEqual('1');
      });
    
    });


    // ==========================
    // = Working with textareas =
    // ==========================
    
    describe( "when converting to a textarea", function() {
      var textarea;
      
      beforeEach(function() {
        textarea = $('textarea[name="customer[notes]"]');
      });
      
      it( "should generate a textarea", function() {   
        expect( textarea ).toExist();
      });
    
      it( "should have the same key attributes", function() {
        expect( textarea ).toHaveAttribute( { name: "customer[notes]" } );
      });
    
      it( "should have _not_ have a 'type' attribute", function() {
        expect( textarea ).not.toHaveAttribute( ['type'] );
      });
      
      it( "should have the same value as the span's text", function() {
        expect( textarea.val() ).toEqual('Has a lot of money.');
      });
    
    });
    
    
    // =============================
    // = Working with select menus =
    // =============================
    
    describe( "when converting to a select menu", function() {
      var selectMenu;
      
      beforeEach(function() {
        selectMenu = $('select[name="customer[gender]"]');
      });
      
      it( "should generate a select menu", function() {   
        expect( selectMenu ).toExist();
      });
    
      it( "should have the same key attributes", function() {
        expect( selectMenu ).toHaveAttribute( { name: "customer[gender]" } );
      });
    
      it( "should have _not_ have a 'type', 'value' or 'options' attributes", function() {
        expect( selectMenu ).not.toHaveAttribute( 'type' );
        expect( selectMenu ).not.toHaveAttribute( 'value' );
        expect( selectMenu ).not.toHaveAttribute( 'options' );
      });
      
      it( "should have the same selected value as the span's text", function() {
        expect( selectMenu.val() ).toEqual('Unknown');        
      });
      
      describe( "when populating the options", function() {
        
        it( "should be able to accept a simple array", function() {
          expect( selectMenu ).toHaveOptions( ["Male", "Female", "Unknown"] );
        });

        it( "should be able to accept a two-level multidimensional array", function() {
          expect( $('select[name="customer[personality]"]') ).toHaveOptions( [["Calm", "calm"], ["Excitable", "excitable"], ["Outrageous", "outrageous"]] );
        });
        
        it( "should generate a custom prompt when asked to", function() {
          expect( $('select[name="customer[level_of_interest]"]') ).toHaveOptions( [["How are interested are you?", ""], ["Not at all", "Not at all"], ["Somewhat", "Somewhat"], ["Extremely", "Extremely"]] );
        });
      });
    
    });
    
    
    // ==============================
    // = Working with radio buttons =
    // ==============================
    
    describe( "when converting to a radio button", function() {
      var radioButtonSet;
      
      beforeEach(function() {
        radioButtonSet = $('input[name="customer[eye_color]"]');
      });
      
      it( "should generate a set of radio buttons", function() {
        expect( radioButtonSet.length ).toEqual(3);
      });
      
      it( "should generate a set of wrapping labels for each radio", function() {
        expect( radioButtonSet.length ).toEqual( radioButtonSet.parent('label').length );
      });
      
      it( "should have the same key attributes", function() {
        expect( radioButtonSet ).toHaveAttribute( { name: 'customer[eye_color]' } );
        expect( radioButtonSet ).toHaveAttribute( { type: 'radio' } );
      });
      
      it( "should have the same selected value as the span's text", function() {
        // In this example the second radio button should be selected or 'checked'
        expect( $(radioButtonSet[1]).attr('checked') ).toBeTruthy();        
      });
      
      it( "should be able to accept a simple array", function() {
        // Radio Values
        expect( radioButtonSet[0].value ).toEqual('Blue');
        expect( radioButtonSet[1].value ).toEqual('Brown');
        expect( radioButtonSet[2].value ).toEqual('Hazel');
        
        // Corresponding Label Values
        expect( $(radioButtonSet.parent('label')[0]).text() ).toEqual('Blue');
        expect( $(radioButtonSet.parent('label')[1]).text() ).toEqual('Brown');
        expect( $(radioButtonSet.parent('label')[2]).text() ).toEqual('Hazel');
      });
      
      it( "should be able to accept a two-level multidimensional array", function() {
        // Radio Values
        expect( $('input[name="customer[hair_color]"]')[0].value ).toEqual('brown');
        expect( $('input[name="customer[hair_color]"]')[1].value ).toEqual('blonde');
        expect( $('input[name="customer[hair_color]"]')[2].value ).toEqual('red');
        
        // Corresponding Label Values
        expect( $($('input[name="customer[hair_color]"]').parent('label')[0]).text() ).toEqual('Brown');
        expect( $($('input[name="customer[hair_color]"]').parent('label')[1]).text() ).toEqual('Blonde');
        expect( $($('input[name="customer[hair_color]"]').parent('label')[2]).text() ).toEqual('Red');
      });
            
      it("should generate unique ids based on the value", function(){
        expect( $(radioButtonSet[0]).attr('id') ).toEqual('customer_eye_color_blue');
        expect( $(radioButtonSet[1]).attr('id') ).toEqual('customer_eye_color_brown');
        expect( $(radioButtonSet[2]).attr('id') ).toEqual('customer_eye_color_hazel');        
      });
    });
    
    
    // ===========================
    // = Working with checkboxes =
    // ===========================
    
    describe( "when converting to a checkbox", function() {
      var truthyCheckbox, falsyCheckbox, hiddenCheckbox;
      
      beforeEach(function() {
        truthyCheckbox = $('input[name="customer[is_alive]"][type="checkbox"]');
        falsyCheckbox = $('input[name="customer[is_dead]"][type="checkbox"]')
        hiddenCheckbox = $('input[name="customer[is_alive]"][type="hidden"]');
      });
      
      it( "should generate a checkbox", function() {
        expect( truthyCheckbox ).toExist();
      });
      
      it( "should generate a preceding hidden input", function() {
        expect( hiddenCheckbox ).toExist();
        // Test to make sure the following dom element (rather than jquery object, hence the [0]) is indeed the actual checkbox
        expect( hiddenCheckbox.next()[0] ).toEqual( truthyCheckbox[0] );
      });
      
      it( "should have the same key attributes", function() {
        expect( truthyCheckbox ).toHaveAttribute( { name: "customer[is_alive]" } );
        expect( truthyCheckbox ).toHaveAttribute( { type: "checkbox" } );
      });

      it( "should have the same key attributes in the hidden input, including the falsy value", function() {
        expect( hiddenCheckbox ).toHaveAttribute( { name: "customer[is_alive]" } );
        expect( hiddenCheckbox ).toHaveAttribute( { value: "false" } );
      });
      
      it( "should always be true", function() {
        expect( truthyCheckbox.val() ).toEqual('true');        
        expect( falsyCheckbox.val() ).toEqual('true');        
      });
      
      it( "should be checked if the span's text is truthy", function() {
        expect( truthyCheckbox.attr('checked') ).toBeTruthy();        
      });

      it( "should _not_ be checked if the span's text is falsy", function() {
        expect( falsyCheckbox.attr('checked') ).toBeFalsy();        
      });
    });
    
    
    // =========================================
    // = Working with a non-existant form type =
    // =========================================
    
    describe( "when attempting to conver to a non-existant form type", function() {
      it( "should skip form elements with non-existant form types", function() {
        expect( $('input[name="customer[is_confused]"]') ).not.toExist();
      });
    });
    
  });
  
  
  // =============================
  // = Dealing with the response =
  // =============================
  
  describe( "after the form is submitted", function(){
    
    beforeEach(function() {
      // ======================================
      // = Reset the dom, reload the snippets =
      // ======================================
      
      $( '#test' ).html( '' );
      Scupper.init( 'snippets' );
      Scupper.insert_into( 'editable_snippet', 'test' );


      // ======================================
      // = Set up the options for editableSet =
      // ======================================
      
      $('.editable').editableSet({ titleElement: 'h3' });

      
      // =======================
      // = Activate the plugin =
      // =======================
      
      $('.editable').trigger( 'dblclick' );
      
      
      // ===================
      // = Submit the form =
      // ===================
      
      $(':submit', '.editable').trigger('click');
    });
    
    
    // ====================
    // = Form is disabled =
    // ====================
    
    it( "should disable all of the fields and buttons", function() {
      
      // Make sure each of the inputs is disabled
      var inputs = $(':input', '#test');
      for ( var i=0; i < inputs.length; i++ ) {        
        expect( $(inputs[i]).attr('disabled') ).toBeTruthy();
      }      
    });
    
    
    // =====================
    // = Data Repopulation =
    // =====================
    
    describe( "populates the DOM with the new values", function(){
      
      // textfield with no association
      it( "should correctly populate a textfield with no association", function() {
        expect( $('span[data-name="customer[street1]"]').text() ).toEqual('456 Real St.');       
      });

      // email field with no association
      it( "should correctly populate an email field with no association", function() {
        expect( $('span[data-name="customer[email]"]').text() ).toEqual('george.bluth@gmail.com');       
      });
      
      // url field with no association
      it( "should correctly populate a url field with no association", function() {
        expect( $('span[data-name="customer[url]"]').text() ).toEqual('http://github.com/miwillhite/editable-set');       
      });
      
      // number field with no association
      it( "should correctly populate a number field with no association", function() {
        expect( $('span[data-name="customer[age]"]').text() ).toEqual('119');       
      });
      
      // range field with no association
      it( "should correctly populate a range field with no association", function() {
        expect( $('span[data-name="customer[rage]"]').text() ).toEqual('0');       
      });
      
      // textfield with simple asssociation 
      it( "should correctly populate a textfield with simple asssociation", function() {
        expect( $('span[data-name="customer[address_attributes][street1]"]').text() ).toEqual('Address 456 Real St.');        
      });

      // textfield with deeply nested asssociation 
      it( "should correctly populate a textfield with deeply nested asssociation", function() {
        expect( $('span[data-name="customer[employer_attributes][address_attributes][street1]"]').text() ).toEqual('Employer Address 456 Real St.');        
      });

      // textfield with deeply nested asssociation, has many relationship 
      it( "should correctly populate a textfield with deeply nested asssociation, has many relationship", function() {
        expect( $('span[data-name="customer[employers_attributes][0][address_attributes][street1]"]').text() ).toEqual('Employers Address 456 Real St.');        
      });

      // textfield with deeply nested asssociation, two has many relationships 
      it( "should correctly populate a textfield with deeply nested asssociation, two has many relationships", function() {
        expect( $('span[data-name="customer[more_employers_attributes][0][addresses_attributes][1][street1]"]').text() ).toEqual('Employers Addresses 456 Real St.');        
      });

      // textfield with extremely deeply nested asssociation, three has many relationships 
      it( "should correctly populate a textfield with extremely deeply nested asssociation, three has many relationships", function() {
        expect( $('span[data-name="customer[spouses_attributes][0][employers_attributes][1][addresses_attributes][2][street1]"]').text() ).toEqual('Spouses Employers Addresses 456 Real St.');        
      });

      // textfield with extremely deeply nested asssociation, three has one relationships 
      it( "should correctly populate a textfield with extremely deeply nested asssociation, three has one relationships", function() {
        expect( $('span[data-name="customer[spouse_attributes][employer_attributes][address_attributes][street1]"]').text() ).toEqual('Spouse Employer Address 456 Real St.');        
      });

      // hidden field 
      it( "should correctly populate a hidden field", function() {
        expect( $('span[data-name="customer[id]"]').text() ).toEqual('2');        
      });

      // textarea 
      it( "should correctly populate a textarea", function() {
        expect( $('span[data-name="customer[notes]"]').text() ).toEqual('Is actually broke.');        
      });

      // select menu, single-dimensional array 
      it( "should correctly populate a select menu, single-dimensional array", function() {
        expect( $('span[data-name="customer[gender]"]').text() ).toEqual('Male');        
      });

      // select menu, multi-dimensional array 
      it( "should correctly populate a select menu, multi-dimensional array", function() {
        expect( $('span[data-name="customer[personality]"]').text() ).toEqual('Outrageous');        
      });

      // select menu, with custom prompt 
      it( "should correctly populate a select menu, with custom prompt", function() {
        expect( $('span[data-name="customer[level_of_interest]"]').text() ).toEqual('Extremely');        
      });

      // radio, single-dimensional array 
      it( "should correctly populate a radio, single-dimensional array", function() {
        expect( $('span[data-name="customer[eye_color]"]').text() ).toEqual('Hazel');        
      });

      // radio, multi-dimensional array 
      it( "should correctly populate a radio, multi-dimensional array", function() {
        expect( $('span[data-name="customer[hair_color]"]').text() ).toEqual('Red');        
      });

      // checkbox 
      it( "should correctly populate a checkbox", function() {
        expect( $('span[data-name="customer[is_alive]"]').text() ).toEqual('false');        
        expect( $('span[data-name="customer[is_dead]"]').text() ).toEqual('true');
      });
      
    });
    
  });
  
  
  // =======================================
  // = Messing with defaults and overrides =
  // =======================================
  
  describe( "messing with the defaults", function() {
    
    beforeEach(function() {
      // Reset the dom, reload the snippets
      $('#test').html( '' );
      Scupper.init( 'snippets' );
      Scupper.insert_into( 'editable_snippet', 'test' );
    });
    
    
    // =========
    // = event =
    // =========
    
    it( "should allow for different activation events", function() {
          
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        event: 'click'
      });      
      
      // Activate the plugin      
      $('.editable').trigger( 'click' );
            
      // Expectations
      expect( $('.editable').hasClass('active') ).toBeTruthy();
    });
    
    
    // ==============
    // = beforeLoad =
    // ==============
    
    it( "should allow for a custom function to be fired before the spans are converted", function() {
      // Initialize
      var spanCount, inputCount;
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        beforeLoad: function() {
          spanCount = $('span', this).length;
          inputCount = $(':input', this).length;
        }
      });      
      
      // Activate the plugin      
      $('.editable').trigger( 'dblclick' );
      
      // If we have any spans and no inputs we know that the callback was triggered prior to the conversion
      expect( spanCount > 0 ).toBeTruthy();
      expect( inputCount === 0 ).toBeTruthy();
    });
    
    
    // =============
    // = afterLoad =
    // =============

    it( "should allow for a custom function to be fired after the spans are converted", function() {
      // Initialize
      var inputCount;
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        afterLoad: function() {
          inputCount = $(':input', this).length;
        }
      });      
      
      // Activate the plugin      
      $('.editable').trigger( 'dblclick' );
      
      // If we have any inputs we know that the callback was triggered after the conversion
      expect( inputCount > 0 ).toBeTruthy();
    });
    
    
    // ============
    // = onCancel =
    // ============

    it( "should allow for a custom function to be fired after the form has been cancelled", function() {
      // Initialize
      var originalHtml = $('#test').html(), resetHtml;
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        onCancel: function() {
          resetHtml = $('#test').html();
        }
      });      
      
      // Activate the plugin and click 'Cancel'
      $('.editable').trigger( 'dblclick' );
      $('.form_cancel', '.editable').trigger( 'click' );
      
      // FIXME: IE doesn't like the comparison below
      expect( originalHtml === resetHtml ).toBeTruthy();
    });
    
    
    // ==========
    // = onSave =
    // ==========
    
    it( "should allow for a custom function to be fired after the form has been submitted, prior to the ajax call", function() {
      // Initialize
      var inputCount;
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        onSave: function() {
          inputCount = $(':input', this).length;
        }
      });      
      
      // Activate the plugin and click 'Submit'
      $('.editable').trigger( 'dblclick' );
      $(':submit', '.editable').trigger( 'click' );
      
      // If we have inputs then we know that the script fired prior to the repopulation script
      expect( inputCount > 0 ).toBeTruthy();
    });
    
    
    // =============
    // = afterSave =
    // =============

    it( "should allow for a custom function to be fired after the form has been submitted, post ajax call", function() {
      // Initialize
      var spanCount;
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        afterSave: function() {
          spanCount = $('span', this).length;
        }
      });      
      
      // Activate the plugin and click 'Submit'
      $('.editable').trigger( 'dblclick' );
      $(':submit', '.editable').trigger( 'click' );
      
      // If we have spans then we know that the script fired after the repopulation script
      expect( spanCount > 0 ).toBeTruthy();
    });
    
    
    // ==========
    // = onError =
    // ==========

    it( "should allow for a custom function to be fired after the form has been submitted, post failed ajax response", function() {
      
      // Re-mock the ajax call
      remockAjax.call(this, function(opts) {
        opts.error.call( opts && opts.context, "Fail", "ajaxError" );
      });
      
      // Initialize
      var inputCount;
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        onError: function() {          
          inputCount = $(':input', this).length;
        }
      });
      
      // Activate the plugin and click 'Submit'
      $('.editable').trigger( 'dblclick' );
      $(':submit', '.editable').trigger( 'click' );
      
      // If we have inputs then we know that the script never fired the repopulation script 
      // and the fact that we have a count indicates that the onFail method was actually called
      expect( inputCount > 0 ).toBeTruthy();
    });
    
    
    // ==============
    // = repopulate =
    // ==============
    
    it( "should allow for a custom repopulation script", function() {
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        repopulate: function( editable, data, opts ) {
          $.each(editable, function( i, span ) {
            $(span).text( 'Overridden' );
          });
        } 
      });      
      
      // Activate the plugin      
      $('.editable').trigger( 'dblclick' );
      
      // Trigger the save
      $(':submit', '.editable').trigger( 'click' );
      
      // Expectation
      var editableSpans = $('span', '.editable');
      for ( var i=0; i < editableSpans.length; i++ ) {        
        expect($(editableSpans[i]).text()).toEqual('Overridden');
      }

    });
    
    
    // ============
    // = dataType =
    // ============

    it( "should default to the 'script' dataType", function() {
      // Initialize
      var dataType;
      
      // Re-mock the ajax call
      remockAjax.call(this, function(opts) {
        dataType = opts.dataType;
      });
      
      // Set up the options for editableSet
      $('.editable').editableSet();
      
      // Activate the plugin and click 'Submit'
      $('.editable').trigger( 'dblclick' );
      $(':submit', '.editable').trigger( 'click' );
      
      // If we have inputs then we know that the script never fired the repopulation script 
      // and the fact that we have a count indicates that the onFail method was actually called
      expect( dataType === 'script' ).toBeTruthy();
    });

    it( "should allow user to override dataType", function() {
      // Initialize
      var dataType;
      
      // Re-mock the ajax call
      remockAjax.call(this, function(opts) {
        dataType = opts.dataType;
      });      
            
      // Set up the options for editableSet
      $('.editable').editableSet( { dataType: 'json' } );
      
      // Activate the plugin and click 'Submit'
      $('.editable').trigger( 'dblclick' );
      $(':submit', '.editable').trigger( 'click' );
      
      // If we have inputs then we know that the script never fired the repopulation script 
      // and the fact that we have a count indicates that the onFail method was actually called
      expect( dataType === 'json' ).toBeTruthy();
    });
    
    
    // ==========
    // = action =
    // ==========
    
    it( "should allow for a custom action attribute", function() {
      $('.editable').editableSet( { action: '/foo/bar/1' } );
      
      // Activate the plugin and click 'Submit'
      $('.editable').trigger( 'dblclick' );
      
      expect( $('form', '.editable').attr('action') ).toEqual('/foo/bar/1');
    });
    
    
    // =====================
    // = invalid callbacks =
    // =====================
    
    it( "should fail silently if the callbacks aren't actually callable functions", function() {
      $('.editable').editableSet({ 
        beforeLoad        : 'fail',
        afterLoad         : 'fail',
        onCancel          : 'fail',
        onSave            : 'fail',
        afterSave         : 'fail',
        onFail            : 'fail',
        repopulate        : 'fail'
      });
      
      // Activate the plugin and click 'Submit'
      $('.editable').trigger( 'dblclick' );
      
      expect( $('form', '.editable') ).toExist();
    });
        
  });
  
  
  // =========================================
  // = Saving multiple editable sets at once =
  // =========================================
  
  describe( "saving multiple editable sets at once", function() {

    it( "should be able to save multiple editable sets with one click", function() {
      // Reset the dom, reload the snippets
      $('#test').html( '' );
      Scupper.init( 'snippets' );
      Scupper.insert_into( 'editable_snippet', 'test' );
            
      // Create another container for the new set
      $('<div />').attr('id', 'test2').addClass('editable').insertAfter($('#test'));
      
      // Split up the form so that we have multiple sets to work with
      var spans = $('span', '#test');
      for( var i=0; i < spans.length/2; i++ ) {
        $(spans[i]).appendTo($('#test2'));
      }
      
      // Set up the options for editableSet
      $('.editable').editableSet({ 
        globalSave: true
      });
      
      // Activate the plugin
      $('.editable').trigger( 'dblclick' );
      
      // Cleanup
      this.after( function() { $('#test2').remove() } );
      
      // Trigger the save
      $(':submit', '#test').trigger( 'click' );
      
      // Check to see if there are any inputs let, if not, pass
      expect( $(':input', '#test, #test2').length === 0 ).toBeTruthy();
      expect( $('span', '#test, #test2').length > 0 ).toBeTruthy();
    });
    
  });
  
  
  // ===========================
  // = Chaining methods/events =
  // ===========================
  
  describe( "chaining methods/events", function() {
    
    it( "should be chainable", function() {
      
      // Reset the dom, reload the snippets =      
      $( '#test' ).html( '' );
      Scupper.init( 'snippets' );
      Scupper.insert_into( 'editable_snippet', 'test' );

      // Set up the options for editableSet =      
      $('.editable').editableSet().live('click', function() {
        $(this).hide();
      });
      
      // Trigger the chained event =
      $('.editable').trigger('click');
      
      // Expectation
      expect( $('.editable') ).not.toBeVisible();
      
    });
  });
  
});