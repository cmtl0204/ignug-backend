import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateCareerDto} from './dto/create-career.dto';
import {UpdateCareerDto } from './dto/update-career.dto';
import { CareerEntity } from "./entities/career.entity";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CareersService {
    careers:any[] = [];
    id=1;

    constructor(
        @InjectRepository(CareerEntity)
        private readonly careerRepository: Repository<CareerEntity>,
    ) {}

    async findAll(){
        return await this.careerRepository.find();
    }

    async findOne(id:number){
        const career = await this.careerRepository.findOne({
            where: {
                id: id
            },
        });
        
        if (career === null){
            throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
        }
        return career;
    }

    async create(payload: CreateCareerDto){
        const newCareer = this.careerRepository.create(payload);
        return await this.careerRepository.save(newCareer);
    };

    async update(id:number, payload: UpdateCareerDto){
        const career = await this.careerRepository.findOne({
            where: {
                id: id
            },
        });
        if (career === null){
            throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
        }
        this.careerRepository.merge(career, payload);
        return await this.careerRepository.save(career);
    }

    async remove(id:number){
        return await this.careerRepository.softDelete(id);
    }
}