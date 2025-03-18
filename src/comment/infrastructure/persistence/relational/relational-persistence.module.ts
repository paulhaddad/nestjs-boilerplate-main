import { Module } from '@nestjs/common';
import { CommentRepository } from '../comment.repository';
import { CommentsRelationalRepository } from './repositories/comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [
    {
      provide: CommentRepository,
      useClass: CommentsRelationalRepository,
    },
  ],
  exports: [CommentRepository],
})
export class RelationalCommentPersistenceModule {}
