import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterCommentDto,
  SortCommentDto,
} from '../../../../dto/query-comment.dto';
import { Comments } from '../../../../domain/comments';
import { CommentRepository } from '../../comment.repository';
import { CommentMapper } from '../mappers/comment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FileType } from '../../../../../files/domain/file';

@Injectable()
export class CommentsRelationalRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
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
    const newEntity = await this.commentsRepository.save(
      this.commentsRepository.create(persistenceModel),
    );
    return CommentMapper.toDomain(newEntity);
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
    const where: FindOptionsWhere<CommentEntity> = {};

    const entities = await this.commentsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((comment) => CommentMapper.toDomain(comment));
  }

  async findById(id: Comments['id']): Promise<NullableType<Comments>> {
    const entity = await this.commentsRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? CommentMapper.toDomain(entity) : null;
  }

  async update(
    id: Comments['id'],
    payload: Partial<Comments>,
  ): Promise<Comments> {
    const entity = await this.commentsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Comment not found');
    }

    const updatedEntity = await this.commentsRepository.save(
      this.commentsRepository.create(
        CommentMapper.toPersistence({
          ...CommentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CommentMapper.toDomain(updatedEntity);
  }

  async remove(id: Comments['id']): Promise<void> {
    await this.commentsRepository.softDelete(id);
  }
}
