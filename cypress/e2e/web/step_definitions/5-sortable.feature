Feature: Ordenar elementos da lista no Sortable

    Scenario: Desordenar e depois organizar a lista em ordem crescente
        Given que o usuário acessa a página de Sortable
        When o usuário desordena a lista movendo o Six para o topo
        And o usuário reorganiza a lista em ordem crescente
        Then a lista deve estar na ordem correta
