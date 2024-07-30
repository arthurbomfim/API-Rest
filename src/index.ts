import { Knex } from './server/database/knex';
import { server } from './server/server';


const startServer = () => {
 server.listen(process.env.PORT || 3000, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
};


if (process.env.IS_LOCALHOST !== 'true') {
 Knex.migrate.latest()
  .then(() => {
   startServer();
  })
  .catch(console.log);
} else {
 startServer();
}