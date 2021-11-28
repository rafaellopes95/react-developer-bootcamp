import { Box, Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";

export function LoginScreen() {
  const [email, setEmail] = useState("danilo@email.com");
  const [password, setPassword] = useState("1234");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
  }

  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>.
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Senha"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Box textAlign="right" marginTop="16px">
          <Button variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
