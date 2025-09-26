Feature: Validar Progress Bar

    Scenario: Iniciar e validar progress bar até 25% e depois até 100%
        Given que o usuário acessa a página da progress bar
        When o usuário clica no botão Start
        Then a barra deve ser menor ou igual a 25%
        When o usuário clica no botão Start novamente
        Then a barra deve chegar até 100% e resetar