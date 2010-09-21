EditableSet v0.6.2
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

For more examples and information about features/callbacks please check out the [Wiki](http://wiki.github.com/miwillhite/editable-set/).

## Supports the following input types:

Text, Email, Url, Number, Range, Textarea, Checkbox, Select, Radio


Todos
-----

* Convert docs to jsdoc
* Test in more browsers
* Test checked and unchecked values for checkboxes
* Allow repopulation to allow the default rails root\_in\_json
* Test the shortcut key combos
* Test the add input method
* Rethink the globalSave option
* Look at using the form conversion in html5 for future versions
* Make 'rel' attribute an option, require it be turned on
* Update data-* retrieval with jQuery's new data() method when available


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
