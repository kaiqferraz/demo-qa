Feature: Gerenciamento de registros na Web Tables

    Background:
        Given que o usuário visita a pagina web tables

    Scenario: Criar, editar e deletar um registro
        When o usuário cria um novo registro
        And edita o registro criado
        And deleta o registro criado
        Then o registro não deve estar mais listado

    Scenario: Criar múltiplos registros dinamicamente e deletar
        When o usuário cria 12 novos registros
        Then os 12 registros devem estar listados
        And todos os usuários são deletados

