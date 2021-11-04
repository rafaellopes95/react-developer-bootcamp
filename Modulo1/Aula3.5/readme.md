# Generators

- Funções Geradoras: funções que são iteradas, havendo pausas na sua execução. Cada chamada dela é resumida através do next(), e retorna um yield até quando não houver mais.
- Funções Normais: executam do início ao fim sem interrupção, ao menos que haja algum tipo de exceção.

- Exemplo de uso: função para gerar ID numérico auto incrementado, sendo que a cada chamada desta função ela incrementará o count - o seu estado permanece salvo.
