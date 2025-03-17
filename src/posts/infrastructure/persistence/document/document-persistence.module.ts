import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, PostSchemaClass } from './entities/post.schema';
import { PostRepository } from '../post.repository';
import { PostsDocumentRepository } from './repositories/post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostSchemaClass.name, schema: PostSchema },
    ]),
  ],
  providers: [
    {
      provide: PostRepository,
      useClass: PostsDocumentRepository,
    },
  ],
  exports: [PostRepository],
})
export class DocumentPostPersistenceModule {}
