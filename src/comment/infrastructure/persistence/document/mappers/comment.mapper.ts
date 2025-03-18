import { Comments } from '../../../../domain/comments';
import { CommentSchemaClass } from '../entities/comment.schema';
import { FileSchemaClass } from '../../../../../files/infrastructure/persistence/document/entities/file.schema';
import { FileMapper } from '../../../../../files/infrastructure/persistence/document/mappers/file.mapper';
import { Role } from '../../../../../roles/domain/role';
import { Status } from '../../../../../statuses/domain/status';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';
import { StatusSchema } from '../../../../../statuses/infrastructure/persistence/document/entities/status.schema';

export class CommentMapper {
  static toDomain(raw: CommentSchemaClass): Comments {
    const domainEntity = new Comments();

    return domainEntity;
  }

  static toPersistence(domainEntity: Comments): CommentSchemaClass {
    let role: RoleSchema | undefined = undefined;
    const persistenceSchema = new CommentSchemaClass();
    return persistenceSchema;
  }
}
