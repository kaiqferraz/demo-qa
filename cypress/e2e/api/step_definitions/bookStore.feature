Feature: Book Store API V1
    Como usuário da API
    Quero cadastrar usuários, gerar token, alugar livros e verificar detalhes
    Para garantir que a API funciona corretamente

    Scenario: Gerenciar usuário e livros
        Given que eu criei um usuário aleatório
        When eu gero um token para o usuário
        Then o usuário deve estar autorizado
        And eu listo os livros disponíveis
        And eu alugo dois livros
        And eu verifico os livros alugados do usuário