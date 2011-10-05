// JavaScript Document
(function($){
  // **Item class**: The atomic part of our Model. A model is basically a Javascript object, i.e. key-value pairs, with some helper functions to handle event triggering, persistence, etc.
  var Item = Backbone.Model.extend({
    defaults: {
      firstname: '',
      lastname: ''
    }
  });     
 
  // **List class**: A collection of `Item`s. Basically an array of Model objects with some helper functions.
  var List = Backbone.Collection.extend({
    model: Item
  });
 
  var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#add': 'addItem'
    },
    // `initialize()` now instantiates a Collection, and binds its `add` event to own method `appendItem`. (Recall that Backbone doesn't offer a separate Controller for bindings...).
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); // remember: every function that uses 'this' as the current object should be in here
     
      this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder
 
      this.counter = 0;
      this.render();     
    },
    render: function(){
    $(this.el).append("<script type='IN/Login'></script>");
    $(this.el).append("<p>Basic test of the People Search API via Connect<br/>");
    $(this.el).append("<form name='searchform' id='formadd' onsubmit='return false;'>");
  $(this.el).append("First Name:&nbsp;<input type='text' name='firstName'><br/>");
  $(this.el).append("Last Name:&nbsp;<input type='text' name='lastName'><br/>");
  $(this.el).append("Company:&nbsp;<input type='text' name='company'><br/>");
  $(this.el).append(" <button id='add'>LinkedIn search</button>");
$(this.el).append("</form>");

   
 
 
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){ // in case collection is not empty
        appendItem(item);
      }, this);
    },
    // `addItem()` now deals solely with models/collections. View updates are delegated to the `add` event listener `appendItem()` below.
    addItem: function(){
    
    alert('here');
     var item = new Item();
     var fn;
     var ln;
    
    if (!IN.ENV.auth.oauth_token) {
    alert("You must login w/ LinkedIn to use the Search functionality!");
    return;
  }
 
  IN.API.PeopleSearch()
    .fields("id", "firstName", "lastName")
    .params({
      "first-name": this.$('[name=firstName]').val(),
      "last-name": this.$('[name=lastName]').val(),
      "company": this.$('[name=company]').val(),
    })
    .result(function(result, metadata,item) {
      setSearchResults(result, metadata,);
    });

 
function setSearchResults(result, metadata,item) {


alert("inside");
     for (i in result.people.values) {
item.set({
        firstname: result.people.values[i].firstName,
        lastname: result.people.values[i].lastName// modify item defaults
      });
      }
      
      
 /* searchHTML = "Search Results (" + result.numResults + "):<ul>";
  console.log(result.people.values);
  for (i in result.people.values) {
    searchHTML = searchHTML + "<li>";
    searchHTML = searchHTML + result.people.values[i].firstName + " ";
    searchHTML = searchHTML + result.people.values[i].lastName + " ";
    searchHTML = searchHTML + " (memberToken: " + result.people.values[i].id + ")</li>";
  
  */
    
  }
 
   
   this.collection.add(item); 
    
     /* this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter // modify item defaults
      });
      this.collection.add(item); // add item to collection; view is updated via event 'add'
   
   */ },
    
    
    
    // `appendItem()` is triggered by the collection event `add`, and handles the visual update.
    appendItem: function(item){
      $('ul', this.el).append("<li>"+item.get('firstname')+" "+item.get('lastname')+"</li>");
    }
  });
 
  var listView = new ListView();
})(jQuery);
