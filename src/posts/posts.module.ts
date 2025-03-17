import {
  // common
  Module,
} from '@nestjs/common';

import { PostsController } from './posts.controller';

import { PostsService } from './posts.service';
import { DocumentPostPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { RelationalPostPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { FilesModule } from '../files/files.module';

// <database-block>
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentPostPersistenceModule
  : RelationalPostPersistenceModule;
// </database-block>

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, infrastructurePersistenceModule],
})
export class PostsModule {}
