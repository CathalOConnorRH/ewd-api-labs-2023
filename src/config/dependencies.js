import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository';
import GenresRepositoryMongo from '../genres/repositories/MongoGenreRepository';
import AccountSchema from '../accounts/validators';
import Authenticator from '../accounts/security/BCryptAuthenticator';
import TokenManager from './../accounts/security/JWTToken';
import logger from '../utils/Winston';

const buildDependencies = () => {
  const dependencies = {
    accountSchema: AccountSchema,
    authenticator: new Authenticator(),
    tokenManager: TokenManager
  };

  logger.info("DB " + process.env.DATABASE_DIALECT);
  if (process.env.DATABASE_DIALECT === "in-memory") {
    dependencies.accountsRepository = new AccountsRepositoryInMemory();
  } else if (process.env.DATABASE_DIALECT === "mongo") {
    dependencies.tokenManager = new TokenManager();
    dependencies.accountsRepository = new AccountsRepositoryMongo();
    dependencies.genresRepository = new GenresRepositoryMongo();
  } else if (process.env.DATABASE_DIALECT === "mysql") {
    throw new Error('Add MySQL support');
  } else {
    throw new Error('Add DB Support to project');
  }
  //dependencies.accountSchema = AccountSchema;

  return dependencies;
};

export default buildDependencies;
