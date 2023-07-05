import { IsString, IsNumber } from 'class-validator';

export class CreateInteractionDto {

    @IsString()
    id: string;

    @IsString()
    id_usuario: string;

    @IsString()
    typeInteraction: string;

    @IsNumber()
    valueInteraction: number;

    @IsString()
    typeElement: string;

    @IsString()
    id_element: string;
      
}

