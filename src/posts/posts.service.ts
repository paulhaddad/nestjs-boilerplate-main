import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterPostDto, SortPostDto } from './dto/query-post.dto';
import { PostRepository } from './infrastructure/persistence/post.repository';
import { Posts } from './domain/posts';
import bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from '../auth/auth-providers.enum';
import { FilesService } from '../files/files.service';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileType } from '../files/domain/file';
import { Role } from '../roles/domain/role';
import { Status } from '../statuses/domain/status';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    // Do not remove comment below.
    // <creating-property />

    return this.postsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />

      title: createPostDto.title,
      mediaUrl: createPostDto.mediaUrl,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPostDto | null;
    sortOptions?: SortPostDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Posts[]> {
    return this.postsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Posts['id']): Promise<NullableType<Posts>> {
    return this.postsRepository.findById(id);
  }

  async update(
    id: Posts['id'],
    updatePostDto: UpdatePostDto,
  ): Promise<Posts | null> {
    // Do not remove comment below.
    // <updating-property />
    console.log('lolololoolll  ', updatePostDto);
    return this.postsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      title: updatePostDto.title,
      mediaUrl: updatePostDto.mediaUrl,
    });
  }

  async remove(id: Posts['id']): Promise<void> {
    await this.postsRepository.remove(id);
  }
}
