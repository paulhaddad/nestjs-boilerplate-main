import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { Posts } from '../../../../domain/posts';
import { PostEntity } from '../entities/post.entity';

export class PostMapper {
  static toDomain(raw: PostEntity): Posts {
    const domainEntity = new Posts();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;

    if (raw.mediaUrl) {
      domainEntity.mediaUrl = FileMapper.toDomain(raw.mediaUrl);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Posts): PostEntity {
    let mediaUrl: FileEntity;
    const persistenceEntity = new PostEntity();

    mediaUrl = new FileEntity();
    if (domainEntity.mediaUrl) {
      mediaUrl.id = domainEntity.mediaUrl.id;
      mediaUrl.path = domainEntity.mediaUrl.path;
    }

    let status: StatusEntity | undefined = undefined;

    persistenceEntity.title = domainEntity.title;

    persistenceEntity.mediaUrl = mediaUrl;

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
