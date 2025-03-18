import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterCommentDto,
  SortCommentDto,
} from '../../../../dto/query-comment.dto';
import { Comments } from '../../../../domain/comments';
import { CommentRepository } from '../../comment.repository';
import { CommentSchemaClass } from '../entities/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommentMapper } from '../mappers/comment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FileType } from '../../../../../files/domain/file';

@Injectable()
export class CommentsDocumentRepository implements CommentRepository {
  constructor(
    @InjectModel(CommentSchemaClass.name)
    private readonly commentsModel: Model<CommentSchemaClass>,
  ) {}
  save(arg0: {
    id: string | number;
    content: string | undefined;
    location: string | undefined;
    device: string | undefined;
  }): Comments | PromiseLike<Comments> {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: { where: { id: string | number } }): void {
    throw new Error('Method not implemented.');
  }

  async create(data: Comments): Promise<Comments> {
    const persistenceModel = CommentMapper.toPersistence(data);
    const createdComment = new this.commentsModel(persistenceModel);
    const commentObject = await createdComment.save();
    return CommentMapper.toDomain(commentObject);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCommentDto | null;
    sortOptions?: SortCommentDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Comments[]> {
    const where: FilterQuery<CommentSchemaClass> = {};

    const commentObjects = await this.commentsModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return commentObjects.map((commentObject) =>
      CommentMapper.toDomain(commentObject),
    );
  }

  async findById(id: Comments['id']): Promise<NullableType<Comments>> {
    const commentObject = await this.commentsModel.findById(id);
    return commentObject ? CommentMapper.toDomain(commentObject) : null;
  }

  async update(
    id: Comments['id'],
    payload: Partial<Comments>,
  ): Promise<Comments | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const comment = await this.commentsModel.findOne(filter);

    if (!comment) {
      return null;
    }

    const commentObject = await this.commentsModel.findOneAndUpdate(
      filter,
      CommentMapper.toPersistence({
        ...CommentMapper.toDomain(comment),
        ...clonedPayload,
      }),
      { new: true },
    );

    return commentObject ? CommentMapper.toDomain(commentObject) : null;
  }

  async remove(id: Comments['id']): Promise<void> {
    await this.commentsModel.deleteOne({
      _id: id.toString(),
    });
  }
}
