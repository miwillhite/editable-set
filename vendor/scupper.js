var Scupper = {
  items: {},
  
  init: function(element_id){
    var element = Scupper.jquerize(element_id);
    element.children().each(function(i, elm){
      elm = $(elm);
      Scupper.items[elm.attr('id')] = elm.html();
    });
    element.empty();
  },
  
  retrieve: function(id){
    if(Scupper.items[id] !== undefined){
      return Scupper.items[id];
    }else{
      throw "Requested Scupper element not found with id: " + id;
    }
  },
  
  insert_into: function(source_id, destination_id){
    return Scupper.jquerize(destination_id).append(Scupper.retrieve(source_id));
  },
  
  jquerize: function(elm){
    if(typeof elm == 'string'){
      return $('#' + elm);
    }else{
      return elm;
    }
  }
};