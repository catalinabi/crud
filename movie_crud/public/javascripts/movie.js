script(src='/javascripts/jquery-1.4.4.js')
script(src='/javascripts/jquery-ui.js')
script(type='text/javascript')
   $(function(){
       function initDate() {
          $('#mdate').datepicker({dateFormat: 'yyyy-mm-dd'});
       }
   });

input(type='text', name='mdate', id='mdate')