# agenda-react

## Autenticação

O backend da aplicação possui os seguintes endpoints:

- GET /auth/user -> obtém informações do usuário logado se houver sessão, caso contrário retorna erro 401 (unauthorized).
- POST /auth/login -> verifica email e senha e cria uma sessão no backend. O ID da sessão é armazenado em um cookie HttpOnly (httpOnly é uma medida de segurança onde a app javascript não tem acesso ao cookie, assim ele é introduzido na requisição ao ser chamado o endpoint que o gerou).
- POST /auth/logout -> Destrói a sessão no backend.

## API Context

- A API context (acessível através do hook useContext) possibilita que qualquer componente na hierarquia envolvida pelo context provider acesse propriedades sem que essa prop precise ser passada abaixo na hierarquia até o componente que irá utilizá-lo.
