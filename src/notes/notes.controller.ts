/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { createNoteDto } from './dto/create-notes.dto';
import { Request } from 'express';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly noteservices: NotesService){}

    @Post()
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createNote(@Body() note: createNoteDto, @Req() req: Request){
        const userId = (req as any).user.id
        return await this.noteservices.createNote(note, userId)
    }

    @Get()
    async getNotes(){
        return this.noteservices.getNotes()
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getNote(@Param('id') id: string, @Req() req: Request) {
        const userId= (req as any).user.id
        return await this.noteservices.getNote(id, userId)
    }

    @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateNote(
    @Body() note: createNoteDto,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    const userId = (req as any).user.id;
    return await this.noteservices.updateNote(note, id, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteNote(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    return await this.noteservices.deleteNote(id, userId);
  }

}
