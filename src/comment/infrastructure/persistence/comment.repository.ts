import { FileType } from '../../../files/domain/file';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Comments } from '../../domain/comments';

import { FilterCommentDto, SortCommentDto } from '../../dto/query-comment.dto';

export abstract class CommentRepository {
  save(arg0: {
    id: string | number;
    content: string | undefined;
    location: string | undefined;
    device: string | undefined;
  }): Comments | PromiseLike<Comments> {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: { where: { id: string | number } }) {
    throw new Error('Method not implemented.');
  }
  abstract create(
    data: Omit<Comments, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Comments>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCommentDto | null;
    sortOptions?: SortCommentDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Comments[]>;

  abstract findById(id: Comments['id']): Promise<NullableType<Comments>>;

  abstract update(
    id: Comments['id'],
    payload: DeepPartial<Comments>,
  ): Promise<Comments | null>;

  abstract remove(id: Comments['id']): Promise<void>;
}
