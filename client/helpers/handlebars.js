UI.registerHelper('pluralize', function(n, thing){
  if( n === 1){
    return '1 ' + thing;
  }
  if (n === 0){
    return 'no ' + thing;
  }
  else {
    return n + ' ' + thing + 's';
  }
});