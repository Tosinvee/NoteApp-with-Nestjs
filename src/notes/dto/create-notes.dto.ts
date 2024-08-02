/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class createNoteDto{
    @IsString()
    @IsNotEmpty({message:'title is required'})
    @MinLength(3, {message: 'title must be ateast 5 characters'})
    title: string

    @IsString()
    @IsNotEmpty({message:'content is required'})
    @MinLength(3, {message: ' content must be ateast 10 characters'})
    content: string
}

