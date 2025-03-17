import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FilterPostDto, SortPostDto } from '../../../../dto/query-post.dto';
import { Posts } from '../../../../domain/posts';
import { PostRepository } from '../../post.repository';
import { PostMapper } from '../mappers/post.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FileType } from '../../../../../files/domain/file';

@Injectable()
export class PostsRelationalRepository implements PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}
  save(arg0: {
    id: string | number;
    title: string | undefined;
    mediaUrl: FileType | null | undefined;
  }): Posts | PromiseLike<Posts> {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: { where: { id: string | number } }): void {
    throw new Error('Method not implemented.');
  }

  async create(data: Posts): Promise<Posts> {
    const persistenceModel = PostMapper.toPersistence(data);
    const newEntity = await this.postsRepository.save(
      this.postsRepository.create(persistenceModel),
    );
    return PostMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPostDto | null;
    sortOptions?: SortPostDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Posts[]> {
    const where: FindOptionsWhere<PostEntity> = {};

    const entities = await this.postsRepository.find({
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

    return entities.map((post) => PostMapper.toDomain(post));
  }

  async findById(id: Posts['id']): Promise<NullableType<Posts>> {
    const entity = await this.postsRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? PostMapper.toDomain(entity) : null;
  }

  async update(id: Posts['id'], payload: Partial<Posts>): Promise<Posts> {
    const entity = await this.postsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Post not found');
    }

    const updatedEntity = await this.postsRepository.save(
      this.postsRepository.create(
        PostMapper.toPersistence({
          ...PostMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PostMapper.toDomain(updatedEntity);
  }

  async remove(id: Posts['id']): Promise<void> {
    await this.postsRepository.softDelete(id);
  }
}
