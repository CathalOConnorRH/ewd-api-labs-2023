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
    tokenManager: TokenManager,
  };

  logger.info("DB dialect" + process.env.DATABASE_DIALECT);
  if (process.env.DATABASE_DIALECT === "in-memory") {
    logger.info("Configure In Memory DB");

    dependencies.accountsRepository = new AccountsRepositoryInMemory();
  } else if (process.env.DATABASE_DIALECT === "mongo") {
    logger.info("Configure Mongo DB");
    dependencies.tokenManager = new TokenManager();
    dependencies.accountsRepository = new AccountsRepositoryMongo();
    dependencies.genresRepository = new GenresRepositoryMongo();

  } else if (process.env.DATABASE_DIALECT === "mysql") {
    logger.Error("MySql Support is not configured");

    throw new Error('Add MySQL support');
  } else {
    logger.Error("Other DB Support is not configured");
    throw new Error('Add DB Support to project');
  }

  return dependencies;
};

export default buildDependencies;
