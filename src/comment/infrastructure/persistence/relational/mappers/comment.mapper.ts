import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { Comments } from '../../../../domain/comments';
import { CommentEntity } from '../entities/comment.entity';

export class CommentMapper {
  static toDomain(raw: CommentEntity): Comments {
    const domainEntity = new Comments();
    domainEntity.id = raw.id;
    domainEntity.content = raw.content;
    domainEntity.location = raw.location;
    domainEntity.device = raw.device;

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Comments): CommentEntity {
    const persistenceEntity = new CommentEntity();

    let status: StatusEntity | undefined = undefined;

    persistenceEntity.content = domainEntity.content;
    persistenceEntity.location = domainEntity.location;
    persistenceEntity.device = domainEntity.device;

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
