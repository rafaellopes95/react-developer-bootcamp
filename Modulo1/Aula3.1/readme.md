# Promises

- Veio no ES6
- JS é single thread, o que fica suscetível a travar a aplicação se operações síncronas demorarem para finalizar

Fluxo:

- pending
  - fulfill
    - settled
      - async actions
      - pending (encadeamento de promise)
  - reject
    - error handling
    - pending (encadeamento de promise)
