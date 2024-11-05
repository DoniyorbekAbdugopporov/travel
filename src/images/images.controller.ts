import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Image } from './models/image.model';

@ApiTags('Images (Rasmlar)')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: "Yangi Rasm qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Rasm qoshish',
    type: Image,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createImageDto: CreateImageDto): Promise<Image> {
    return this.imagesService.create(createImageDto);
  }

  @ApiOperation({ summary: 'Rasmlarni chiqarish' })
  @ApiResponse({
    status: 200,
    description: 'Rasmlarni chiqarish',
    type: [Image],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @ApiOperation({ summary: 'Rasmni id orqli topish' })
  @ApiResponse({
    status: 200,
    description: 'Rasmni Id orqali topish',
    type: Image,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Image> {
    return this.imagesService.findOne(id);
  }

  @ApiOperation({ summary: 'Rasmni id orqli yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Rasmni Id orqali yangilash',
    type: Image,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateImageDto: UpdateImageDto,
  ): Promise<Image> {
    return this.imagesService.update(id, updateImageDto);
  }

  @ApiOperation({ summary: 'Rasmni id orqli ochirish' })
  @ApiResponse({
    status: 200,
    description: 'Rasmni Id orqali ochirish',
    type: Image,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<number> {
    return this.imagesService.remove(id);
  }
}
