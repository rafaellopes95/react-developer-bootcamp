# Manipuladores de Evento

Existem 3 tipos de manipuladores:

1. in-line
2. propriedades dos elementos
3. métodos DOM 2: addEventListener() e removeEventListener()

Dentre as opções acima, o addEventListener() é o melhor em questão de reutilização de código já que os outros dois são aplicados diretamente na declaração de cada elemento (1) ou atribuído às propriedades de um elemento específico (2).

# Arquitetura de eventos

## Propagação

Existem dois tipos de propagação:

1. Bubbling: é quando o evento acontece primeiramente no elemento target, e ele propaga aos elementos ancestrais que possuem o mesmo evento seguindo a order da árvore de elementos no DOM até o window. Os manipuladores in-line são sempre bubbling.
2. Capture: é quando o evento acontece primeiramente nos elementos ancestrais, e ele propaga em direção ao elemento target. Para que esta propagação possa ser utilizada, o addEventListener deve ser utilizado.

## Interface Event

É a inteface base para todos os eventos. A MouseEvent é um exemplo de especificação desta interface, e no MDN Web Docs é possível ver detalhes sobre suas propriedades: https://developer.mozilla.org/pt-BR/docs/Web/Events.
