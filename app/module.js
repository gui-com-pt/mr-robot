(function(){
	angular
	.module('mrrobot', ['vtortola.ng-terminal', 'ng-terminal-example.command.tools']);


	angular
	.module('mrrobot')
	.config(['terminalConfigurationProvider', 'commandBrokerProvider', function (terminalConfigurationProvider, commandBrokerProvider) {

    terminalConfigurationProvider.config('modern').outputDelay = 10;
    terminalConfigurationProvider.config('modern').allowTypingWriteDisplaying = false;
    terminalConfigurationProvider.config('modern').typeSoundUrl ='example/content/type.wav';
    terminalConfigurationProvider.config('modern').startSoundUrl ='example/content/start.wav';
		terminalConfigurationProvider.config('modern').promptConfiguration.user ='friend';

		commandBrokerProvider.appendCommandHandler({
        command: 'fsociety',
        description: ['FSociety.'],
        handle: function (session) {
					session.output.push({ output: true, text: ['Estás a procura da FSociety? http://www.whoismrrobot.com/fsociety/'], breakLine: true });
        }
    });

		commandBrokerProvider.appendCommandHandler({
        command: 'informar',
        description: ['FSociety.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Queres começar a tua jornada? Não é fácil mas estamos cá para te ajudar. Para teres uma introdução ao mundo da programação visita o site português http://codigo.ovh'], breakLine: true });
        }
    });

		commandBrokerProvider.appendCommandHandler({
        command: 'perguntar',
        description: ['FSociety.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Ninguém nasce ensinado. Aprendemos com os outros. Envia todas as tuas questões para 420@marijuana.ovh'], breakLine: true });
        }
    });

		commandBrokerProvider.appendCommandHandler({
        command: 'acordar',
        description: ['FSociety.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['E se nada disto te faz sentido? Não sabes o que é hacking, não tens noção do verdadeiro estado do nosso planeta, para ti nada de mal está a ocorrer. Não és o único.', 'Acorda! 420@marijuana.ovh'], breakLine: true });
        }
    });
}])
	.provider('$ga', function () {

    window['GoogleAnalyticsObject'] = 'ga';
    window['ga'] = window['ga'] || function () { (window['ga'].q = window['ga'].q || []).push(arguments) }
    window['ga'].l = 1 * new Date();
    var script = document.createElement('script');
    var prevScript = document.getElementsByTagName('script')[0];
    script.async = 1;
    script.src = '//www.google-analytics.com/analytics_debug.js';
    prevScript.parentNode.insertBefore(script, prevScript);

    var provider = function () {
        var me = {};

        me.$get = function () {
            ga('send', 'pageview');
            return function () {
                return window.ga.apply(window, arguments);
            }
        };

        me.ga = function () {
            return window.ga.apply(window, arguments);
        };

        return me;
    };

    return provider();
})
	.controller('console',['$scope','$ga','commandBroker','$rootScope', function ($scope, $ga, commandBroker, $rootScope) {

    $rootScope.theme = 'modern';

    setTimeout(function () {
        $scope.$broadcast('terminal-output', {
            output: true,
            text: ['Olá amigo. Se vieste, vieste por uma razão. Podes não ser capaz de explicar para já, mas há uma parte de ti exausta com este mundo... um mundo que decide onde tu trabalhas, o que tu vês, e como esvazias e enches a tua conta bancária depressivamente. Até a ligação de Internet que usas para ler isto te está a custar, devastando lentamente a tua existẽncia. Há coisas que tu queres dizer. Brevemente eu vou-te dar uma voz. Hoje a tua educação começa.',
                   '',
                   "Comandos disponíveis",
								 	"fsociety",
									"informar",
									"perguntar",
									"acordar"],
            breakLine: true
        });
        $scope.$apply();
    }, 100);

    $scope.gitHub = function () {
        $ga('send', 'event', 'ng-terminal-emulator', 'click', 'GitHub');
    };

    $scope.unitTests = function () {
        $ga('send', 'event', 'ng-terminal-emulator', 'click', 'UnitTest');
    };

    $scope.session = {
        commands: [],
        output: [],
        $scope:$scope
    };

    $scope.$watchCollection(function () { return $scope.session.commands; }, function (n) {
        for (var i = 0; i < n.length; i++) {
            $ga('send', 'event', 'Console', 'Command', JSON.stringify(n[i]));
            $scope.$broadcast('terminal-command', n[i]);
        }
        $scope.session.commands.splice(0, $scope.session.commands.length);
        $scope.$$phase || $scope.$apply();
    });

    $scope.$watchCollection(function () { return $scope.session.output; }, function (n) {
        for (var i = 0; i < n.length; i++) {
            $ga('send', 'event', 'Console', 'Output', JSON.stringify(n[i]));
            $scope.$broadcast('terminal-output', n[i]);
        }
        $scope.session.output.splice(0, $scope.session.output.length);
        $scope.$$phase || $scope.$apply();
    });

    $scope.$on('$viewContentLoaded', function (event) {
        $ga('send', 'pageview');
    });

    $scope.$on('terminal-input', function (e, consoleInput) {
        var cmd = consoleInput[0];

        $ga('send', 'event', 'Console', 'Input', cmd.command );
        try {
            if ($scope.session.context) {
                $scope.session.context.execute($scope.session, cmd.command);
            }
            else {
                commandBroker.execute($scope.session, cmd.command);
            }
        } catch (err) {
            $scope.session.output.push({ output: true, breakLine: true, text: [err.message] });
        }
    });
}])
})();
