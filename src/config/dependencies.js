import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository';
import GenresRepositoryMongo from '../genres/repositories/MongoGenreRepository';
import AccountSchema from '../accounts/validators';
import Authenticator from '../accounts/security/BCryptAuthenticator';

const buildDependencies = () => {
  const dependencies = {
    accountSchema: AccountSchema,
    authenticator: new Authenticator()
  };

  console.log("DB "+ process.env.DATABASE_DIALECT)
  if (process.env.DATABASE_DIALECT === "in-memory") {
    dependencies.accountsRepository = new AccountsRepositoryInMemory();
  } else if (process.env.DATABASE_DIALECT === "mongo") {
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
