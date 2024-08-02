/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
//import { ControllerService } from './notes.service';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
