/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createNoteDto } from './dto/create-notes.dto';
import { INote } from './interfaces/note.interface';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService){}

    async createNote(note:createNoteDto, userId: string): Promise<INote>{
        const existingNote = await this.prisma.note.findUnique({
            where: {title: note.title}
        })
        if (existingNote) throw new BadRequestException({ message: `note with title ${note.title} already exists `})
        return await this.prisma.note.create({
            data: {
                ...note,
                user: {connect : {id : userId} },
            }
        })
    }

    async getNotes(){
      return await this.prisma.note.findMany()
    }
    async getNote(noteId: string, userId: string): Promise<INote> {
        const note = await this.prisma.note.findFirst({
          where: { id: noteId, userId },
        });
        if (!note) throw new BadRequestException({ message: 'Note not found' });
        return note;
      }

      async updateNote(
        note: createNoteDto,
        id: string,
        userId: string,
      ): Promise<INote> {
        const existingNote = await this.prisma.note.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!existingNote)
          throw new BadRequestException({
            message: `Note with id '${id}' not found.`,
          });
        return await this.prisma.note.update({
          where: { id, userId },
          data: note,
        });
      } 

      async deleteNote(id: string, userId: string): Promise<INote> {
        const existingNote = await this.prisma.note.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!existingNote)
          throw new BadRequestException({
            message: `Note with id '${id}' not found.`,
          });
        return await this.prisma.note.delete({ where: { id, userId } });
      }
    }
    
    

