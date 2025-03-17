import { FileType } from '../../../files/domain/file';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Posts } from '../../domain/posts';

import { FilterPostDto, SortPostDto } from '../../dto/query-post.dto';

export abstract class PostRepository {
  save(arg0: {
    id: string | number;
    title: string | undefined;
    mediaUrl: FileType | null | undefined;
  }): Posts | PromiseLike<Posts> {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: { where: { id: string | number } }) {
    throw new Error('Method not implemented.');
  }
  abstract create(
    data: Omit<Posts, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Posts>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPostDto | null;
    sortOptions?: SortPostDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Posts[]>;

  abstract findById(id: Posts['id']): Promise<NullableType<Posts>>;

  abstract update(
    id: Posts['id'],
    payload: DeepPartial<Posts>,
  ): Promise<Posts | null>;

  abstract remove(id: Posts['id']): Promise<void>;
}
