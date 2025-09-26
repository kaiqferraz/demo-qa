Feature: Practice Form

    Scenario: Usuário preenche todos os campos do formulario

        Given que o usuário visita a página do formulário
        When o usuário preenche todos os campos
        Then o sistema valida que o formulário foi preechido com sucesso