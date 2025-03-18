import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterCommentDto, SortCommentDto } from './dto/query-comment.dto';
import { CommentRepository } from './infrastructure/persistence/comment.repository';
import { Comments } from './domain/comments';
import bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from '../auth/auth-providers.enum';
import { FilesService } from '../files/files.service';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileType } from '../files/domain/file';
import { Role } from '../roles/domain/role';
import { Status } from '../statuses/domain/status';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comments> {
    // Do not remove comment below.
    // <creating-property />

    return this.commentsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />

      content: createCommentDto.content,
      location: createCommentDto.location,
      device: createCommentDto.device,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCommentDto | null;
    sortOptions?: SortCommentDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Comments[]> {
    return this.commentsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Comments['id']): Promise<NullableType<Comments>> {
    return this.commentsRepository.findById(id);
  }

  async update(
    id: Comments['id'],
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comments | null> {
    // Do not remove comment below.
    // <updating-property />
    console.log('lolololoolll  ', updateCommentDto);
    return this.commentsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      content: updateCommentDto.content,
      location: updateCommentDto.location,
      device: updateCommentDto.device,
    });
  }

  async remove(id: Comments['id']): Promise<void> {
    await this.commentsRepository.remove(id);
  }
}
