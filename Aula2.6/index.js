// Exemplo de Currying

function log(date, type, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${type}] ${message}`);
}

log(new Date(), "DEBUG", "Exemplo de Currying");

const logCurrying = (date) => (type) => (message) => {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${type}] ${message}`);
};

logCurrying(new Date())("DEBUG")("Exemplo de Currying");

const logNow = logCurrying(new Date());

logNow("DEBUG")("Exemplo de Currying com parâmetro fixo");

const logDebugNow = logNow("DEBUG");

logDebugNow("Exemplo de currying com parâmetros fixos.");
