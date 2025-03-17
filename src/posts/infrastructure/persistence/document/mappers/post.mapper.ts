import { Posts } from '../../../../domain/posts';
import { PostSchemaClass } from '../entities/post.schema';
import { FileSchemaClass } from '../../../../../files/infrastructure/persistence/document/entities/file.schema';
import { FileMapper } from '../../../../../files/infrastructure/persistence/document/mappers/file.mapper';
import { Role } from '../../../../../roles/domain/role';
import { Status } from '../../../../../statuses/domain/status';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';
import { StatusSchema } from '../../../../../statuses/infrastructure/persistence/document/entities/status.schema';

export class PostMapper {
  static toDomain(raw: PostSchemaClass): Posts {
    const domainEntity = new Posts();

    return domainEntity;
  }

  static toPersistence(domainEntity: Posts): PostSchemaClass {
    let role: RoleSchema | undefined = undefined;
    const persistenceSchema = new PostSchemaClass();
    return persistenceSchema;
  }
}
