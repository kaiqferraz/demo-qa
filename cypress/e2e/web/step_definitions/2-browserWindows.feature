Feature: Browser Windows

    Scenario: Usuário abre uma nova janela do browser
        Given que o usuário visita a página de Browser Windows
        When o usuário clica no botão New Window
        Then o sistema abre uma nova janela do browser e a mensagem This is a sample page deve ser exibida
