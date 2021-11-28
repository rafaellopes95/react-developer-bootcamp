# agenda-react

## Autenticação

O backend da aplicação possui os seguintes endpoints:

- GET /auth/user -> obtém informações do usuário logado se houver sessão, caso contrário retorna erro 401 (unauthorized).
- POST /auth/login -> verifica email e senha e cria uma sessão no backend. O ID da sessão é armazenado em um cookie HttpOnly (httpOnly é uma medida de segurança onde a app javascript não tem acesso ao cookie, assim ele é introduzido na requisição ao ser chamado o endpoint que o gerou).
- POST /auth/logout -> Destrói a sessão no backend.

## API Context

- A API context (acessível através do hook useContext) possibilita que qualquer componente na hierarquia envolvida pelo context provider acesse propriedades sem que essa prop precise ser passada abaixo na hierarquia até o componente que irá utilizá-lo.

## Otimização

- useMemo: Este hook permite definir um array de dependências onde somente quando houver alguma alteração neles é que o componente será renderizado novamente, assim evitando renderizações desnecessárias.
- React.memo: Ele retorna um componente otimizado, que somente será renderizado quando houver mudança no seu props (pode não se aplicar à todos os componentes).
