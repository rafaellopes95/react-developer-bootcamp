# EventLoop

- EventLoop é uma fila de execução que controla a concorrência da aplicação.

- Stack: é o event loop que enfilera a sequência de ações a serem executadas.
- Background: enfileiradas as ações de API nativas (como timer).
- Task Queue: macro task, que é a execução de ações enfileiradas em background.
- Micro Task Queue: ações de promises, que tem precedência sobre a macro task.
- A execução acontece de fato quando a ação chega na Stack (EventLoop).
