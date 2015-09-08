jQuery(document).ready(function($) {
	var greetings = '09:29 <mr. robot> Olá amigo. Se vieste, vieste por uam razão. Podes não ser capaz de explicar para já, mas há uma parte de ti exausta com este mundo... um mundo que decide onde tu trabalhas, o que tu vês, e como esvazias e enches a tua conta bancária depressiva. Até a ligação de Internet que usas para ler isto te está a custar, desbantando lentamente a tua existẽncia. Há coisas que tu queres dizer. Brevemente eu vou-te dar uma voz. Hoje a tua educação começa.<br/><br/><br/><br/>' +
	'<b>Comandos:</b><br/>' +
	'fsociety<br/>' +
	'informar<br/>' +
	'perguntar<br/>' +
	'acordar<br/>' +
	'entrar<br/><br/>';

	var anim = false;
	 function typed(finish_typing) {
			 return function(term, message, delay, finish) {
					 anim = true;
					 var prompt = term.get_prompt();
					 var c = 0;
					 if (message.length > 0) {
							 term.set_prompt('');
							 var interval = setInterval(function() {
									 term.insert(message[c++]);
									 if (c == message.length) {
											 clearInterval(interval);
											 // execute in next interval
											 setTimeout(function() {
													 // swap command with prompt
													 finish_typing(term, message, prompt);
													 anim = false
													 finish && finish();
											 }, delay);
									 }
							 }, delay);
					 }
			 };
	 }
	 var typed_prompt = typed(function(term, message, prompt) {
			 // swap command with prompt
			 term.set_command('');
			 term.set_prompt(message + ' ');
	 });
	 var typed_message = typed(function(term, message, prompt) {
			 term.set_command('');
			 term.echo(message, {raw: true})
			 term.set_prompt(prompt);
	 });

    $('body').terminal("api.php", {
        login: false,
        greetings: null,
				onInit: function(term) {
            // first question
            typed_message(term, greetings, 20, function() {

            });
        },
				prompt: 'root@fsociety:~#',
        onBlur: function() {
            // the height of the body is only 2 lines initialy
            return false;
        }
    });
});
