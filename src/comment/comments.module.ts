import {
  // common
  Module,
} from '@nestjs/common';

import { CommentsController } from './comments.controller';

import { CommentsService } from './comments.service';
import { DocumentCommentPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { RelationalCommentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { FilesModule } from '../files/files.module';

// <database-block>
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentCommentPersistenceModule
  : RelationalCommentPersistenceModule;
// </database-block>

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService, infrastructurePersistenceModule],
})
export class CommentsModule {}
