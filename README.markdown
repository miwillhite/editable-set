EditableSet v0.6.1
==================

EditableSet is a jQuery edit-in-place plugin for editing entire sets of data at once.

Brief Overview
--------------

**EditableSet was designed for Ruby on Rails apps, but it will work with any web application.\*** When activated, it wraps the target object’s inner html with a form, converts all named spans to inputs, then appends “Submit” and “Cancel” buttons. Pressing the “Save” button will submit the form via ajax (PUT). Originally based on and inspired by Mika Tuupola’s [Jeditable](http://www.appelsiini.net/projects/jeditable).

You can play with a sample at [http://editable-set.heroku.com](http://editable-set.heroku.com).


<small>* The default repopulation script will only work if the “name” attributes follow Rails’ conventions. This feature can be overridden.</small>

Requirements
------------

Requires jQuery 1.4.1 or newer.

A modern browser (Tested in Firefox 3.6+, Safari 5+, Chrome 5+, and IE 8+).


Usage
-----
EditableSet is applied to an element that contains a collection of **named spans**. The individual **span's attributes** define the generated input field.


### Anatomy of a span

Because EditableSet was designed for Rails, the `name` attribute of each span must be built the same way (specifically using `_attributes` for associated models and child indices for arrays of objects)

#### Basic Example:

A 'text' input is the default:

    <span name="applicant[address_attributes][city]" class="required">Portland</span>

Generates:
    
    <input type="text" name="customer[address_attributes][city]" value="Portland" class="required" />
    
**Note:** All standard attributes will also apply to the input.


#### Advanced Example:

Select menus and radio buttons can take a special `options` attribute containing a single or two dimensional array:

    <span name="customer[hair_color]" options='[["Brown", "brown"], ["Blonde", "blonde"], ["Red", "red"]]'>Brown</span>
    
Generates: 
    
    <select name="customer[hair_color]">
      <option value="brown" selected="selected">Brown</option>
      <option value="blonde">Blonde</option>
      <option value="red">Red</option>
    </select>
   
      
### Javascript

At its most basic level you can just call:

    $('.editable').editableSet(); // .editable being the element containing the named spans

Of course, chances are you will want to define a form action and various other options:

    $('.editable').editableSet({
      action: '/customer/1',
      dataType: 'json',
      afterSave: function() {
        alert( 'Saved Successfully!' );
      }
    });


### Full Example:

This markup: 

    <html>
      <head>
        <script>
          $(function() {

            $('.editable').editableSet({
              action: '/applicant/1',
              afterSave: function() {
                alert( 'Saved Successfully!' );
              }
            });

          });
        </script>
      </head>
      
      <body>
        <ul class="editable">
          <li>
            <span name="applicant[full_name]">
              Brandon Walsch
            </span>
          </li>          
          
          <li>
            <span name="applicant[former_employers_attributes][2][address_attributes][zipcode]" type="textarea" class="wide">
              90210
            </span>
          </li>
        </ul>
      </body>
    </html>
          
          
Generates when activated:

    <html>
      <head>
        <script>
          $(function() {

            $('.editable').editableSet({
              action: '/applicant/1',
              afterSave: function() {
                alert( 'Saved Successfully!' );
              }
            });

          });
        </script>
      </head>
      
      <body>
        <ul class="editable">
          <li>
            <input name="applicant[full_name]" type="text" value="Brandon Walsch" />
          </li>          
          
          <li>
            <textarea name="applicant[former_employers_attributes][2][address_attributes][zipcode]" class="wide">
              90210
            </textarea>
          </li>
        </ul>
      </body>
    </html>
            
Live examples coming soon…

Options
-------

### Supports the following input types:

Textfield, Textarea, Checkbox, Select, Radio


### Callbacks/Hooks

`beforeLoad()`
Triggers before the form has been generated.

`afterLoad()`
After the form has been generated.

`onCancel()`
When the 'Cancel' button is pressed.

`onSave()`
Before the ajax request is sent, after the 'Submit' button is pressed.

`afterSave()`
After the data has been saved and the data repopulation method has been called.

`onFail()`
If the response from the server indicates a failure, this is called.


### Misc and Experimental

`globalSave`
  **Default:** false  
  Set this to `true` if you want all active forms on the page to submit at once, in one request.

`event`
  **Default:** 'dblclick'  
  Sets the event to trigger the form conversion.
  
`titleElement`
  **Default:** false  
  The title element, when defined, will be placed outside of the generated form. Also, the 'Submit' and 'Cancel' buttons will append to this rather than the form. This is primarily useful for `<fieldsets>` with `<legends>`.
    
`repopulate` 
  **Default:** repopulate _(private)_  
  Overrides the default repopulation method.
  
  
### Other Features
  
#### Dynamically set the `action` attribute of the form

If you set the `rel` attribute on your container element, editableSet will use that for the form action. This is useful if each set needs to submit to a different url but you only need to initialize the plugin once.

  
#### Keyboard Shortcuts (untested)

`ctl/cmd + s` will Save active forms. `esc` will Cancel active forms. 
  
  
#### Default Repopulation

**Important:** Requires the response to be sent back in JSON format. Also requires `ActiveRecord::Base.include_root_in_json` to be set to `true`.

Because EditableSet was designed for Ruby on Rails, the default repopulation method only works with Rails style namings:

    model_name[attribute_name]
    model_name[attribute_modesl_name_attributes][attribute_name]
    model_name[associated_models_name_attributes][0][attribute_name]
    
It works by creating a map of the models. Then using that map to locate the desired value in the returned dataset.


Todos
-----

* Test in more browsers
* Allow repopulation to allow the default rails root\_in\_json
* Test the shortcut key combos
* Update for HTML5
  * Look at new form types
  * Use data-* instead of invalid attributes
* Rethink the globalSave option
* Look at using the form conversion in html5 for future versions
* Make 'rel' attribute an option, require it be turned on


Notes/Disclaimers
-----------------

I have no immediate plans to support older browsers than those listed above.


Note on Patches/Pull Request
----------------------------

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don’t break it in a future version unintentionally.
* Commit, do not mess with rakefile, version, or history. (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.


Contributors
------------

**Matthew Willhite** (miwillhite)  
_Creator, Maintainer_

**David Richards** (davidrichards)  
_Helped fix and rethink the repopulation script_


Copyright (c) 2010 Matthew Willhite, released under the MIT license
