
var g = G$('John', 'Doe');

$('#login').click(function() {
  var loginGrtr = G$('John', 'Doe');

  loginGrtr.setLang($('#lang').val()).HTMLgreeting('#greeting').log();
});
