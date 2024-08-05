/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MinLength, } from "class-validator";


/* eslint-disable prettier/prettier */
export class SignupDto{
    @IsString()
    @IsNotEmpty({message:'username is required'})
    @MinLength(3, {message: 'username must be atleast 3 characters'})
   username:string;

    @IsString()
    @IsNotEmpty({message:'password is required'})
    @MinLength(8, {message: 'password must be atleast 8 characters'})
   password:string 


}