;(function(global, $) {
  'use strict';

  // 'new' an object
  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }

  // hidden within the scope of the IIFE and never directly accesible
  var supportedLangs = ['en', 'es', 'it', 'ro'];

  // informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Hola',
    it: 'Ciao',
    ro: 'Salut'
  };

  // formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',
    it: 'Salve',
    ro: 'Buna'
  };

  // logger messages
  var logMessages = {
    en: 'Logged in',
    es: 'Iniciò sesiòn',
    it: 'Accesso',
    ro: 'Accessat'
  };

  // prototype holds methods (to save memory space)
  Greetr.prototype = {

    // 'this' refers to the calling object at execution time
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    validate: function() {

      // check that is a validate
      // references the externally inaccessible 'supportedLangs' within the closure
      if(supportedLangs.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },

    // retrieve messages from object by referring to properties using []
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },
    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    // chainable methods return their own containing object
    greet: function(formal) {
      var msg;

      // if undefined or null it will be coerced to 'false'
      if(formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable.
      return this;
    },
    log: function() {
      if(console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
      // make chainable
      return this;
    },
    setLang: function(lang) {
      // if(supportedLangs.indexOf(lang) !== -1) {
      //
      // }

      // set the language
      this.language = lang;
      // validate
      this.validate();
      // make chainable
      return this;
    },
    HTMLgreeting: function(selector, formal) {
      if(!$) {
        throw 'jQuery not loaded.';
      }
      if(!selector) {
        throw 'Selector not found';
      }

      // determine the message
      var msg;
      if(formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // inject the message in the chosen place in the DOM
      $(selector).html(msg);

      // make chainable
      return this;
    }
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function(firstName, lastName, language) {
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();

  }

  // ttrick borrowed from jQuery se we don't have to use the 'new' kewyword
  Greetr.init.prototype = Greetr.prototype;

  // attach our Greetr to the global object, and provide a shorthand 'G$' for ease our poor fingers
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
