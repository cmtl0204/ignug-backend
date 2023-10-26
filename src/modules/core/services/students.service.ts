import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {FindOptionsWhere, Repository} from 'typeorm';
import {FilterStudentDto, PaginationDto, UpdateStudentDto} from '@core/dto';
import {StudentEntity} from '@core/entities';
import {CoreRepositoryEnum} from '@shared/enums';
import {UsersService} from '@auth/services';
import {InformationStudentsService} from './information-students.service';
import {ServiceResponseHttpModel} from '@shared/models';

@Injectable()
export class StudentsService {
    constructor(
        @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY)
        private repository: Repository<StudentEntity>,
        private usersService: UsersService,
        private informationStudentsService: InformationStudentsService,
    ) {
    }

    async catalogue() {
        const data = await this.repository.findAndCount({
            take: 1000,
        });

        return {pagination: {totalItems: data[1], limit: 10}, data: data[0]};
    }

    async findAll(params?: FilterStudentDto): Promise<ServiceResponseHttpModel> {
        //Pagination & Filter by search
        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilter(params);
        }

        //Filter by other field

        //All
        const data = await this.repository.findAndCount({
            relations: ['user', 'informationStudent'],
        });

        return {pagination: {totalItems: data[1], limit: 10}, data: data[0]};
    }

    async findOne(id: string): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true, user: true},
            where: {id},
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        return entity;
    }

    async update(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        this.repository.merge(entity, payload);

        await this.repository.save(entity);

        await this.usersService.update(payload.user.id, payload.user);

        payload.informationStudent.student = await this.repository.save(entity);

        if (payload.informationStudent?.id) {
            await this.informationStudentsService.update(payload.informationStudent.id, payload.informationStudent);
        } else {
            const {id, ...informationStudentRest} = payload.informationStudent;
            await this.informationStudentsService.create(informationStudentRest);
        }

        return entity;
    }

    async remove(id: string) {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException('Student not found');
        }

        return await this.repository.softRemove(entity);
    }

    async removeAll(payload: StudentEntity[]) {
        return this.repository.softRemove(payload);
    }

    private async paginateAndFilter(params: FilterStudentDto) {
        let where: FindOptionsWhere<StudentEntity> | FindOptionsWhere<StudentEntity>[];
        where = {};
        let {page, search} = params;
        const {limit} = params;

        if (search) {
            search = search.trim();
            page = 0;
            where = [];
            // where.push({ name: ILike(`%${search}%`) });
        }

        const data = await this.repository.findAndCount({
            relations: {informationStudent: true, user: true},
            where,
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
        });

        return {pagination: {limit, totalItems: data[1]}, data: data[0]};
    }

    async create(payload: any): Promise<any> {
        const newEntity = this.repository.create(payload);
        return await this.repository.save(newEntity);
    }

    async updatePersonalInformation(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true, user: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.user.identificationTypeId = payload.user.identificationType.id;
        entity.user.identification = payload.user.identification;
        entity.user.name = payload.user.name;
        entity.user.lastname = payload.user.lastname;
        entity.user.birthdate = payload.user.birthdate;
        entity.user.maritalStatusId = payload.user.maritalStatus.id;
        entity.user.nationalityId = payload.user.nationality.id;
        entity.user.genderId = payload.user.gender.id;
        entity.user.sexId = payload.user.sex.id;
        entity.user.ethnicOriginId = payload.user.ethnicOrigin.id;
        entity.informationStudent.indigenousNationalityId = payload.informationStudent.indigenousNationality.id;
        entity.informationStudent.townId = payload.informationStudent.town.id;
        entity.informationStudent.isAncestralLanguageId = payload.informationStudent.isAncestralLanguage.id;
        entity.informationStudent.ancestralLanguageName = payload.informationStudent.ancestralLanguageName;
        entity.informationStudent.isForeignLanguageId = payload.informationStudent.isForeignLanguage.id;
        entity.informationStudent.foreignLanguageName = payload.informationStudent.foreignLanguageName;
        entity.user.cellPhone = payload.user.cellPhone;
        entity.user.phone = payload.user.phone;
        entity.user.personalEmail = payload.user.personalEmail;
        entity.user.email = payload.user.email;
        entity.informationStudent.contactEmergencyName = payload.informationStudent.contactEmergencyName;
        entity.informationStudent.contactEmergencyPhone = payload.informationStudent.contactEmergencyPhone;
        entity.informationStudent.contactEmergencyKinship = payload.informationStudent.contactEmergencyKinship;
        entity.informationStudent.isWorkId = payload.informationStudent.isWork.id;
        entity.informationStudent.workAddress = payload.informationStudent.workAddress;
        entity.informationStudent.monthlySalary = payload.informationStudent.monthlySalary;
        entity.informationStudent.workingHours = payload.informationStudent.workingHours;
        entity.informationStudent.workPosition = payload.informationStudent.workPosition;
        entity.informationStudent.isHasChildrenId = payload.informationStudent.isHasChildren.id;
        entity.informationStudent.childrenTotal = payload.informationStudent.childrenTotal;
        entity.informationStudent.isHouseHeadId = payload.informationStudent.isHouseHead.id;
        entity.informationStudent.isSocialSecurityId = payload.informationStudent.isSocialSecurity.id;
        entity.informationStudent.isPrivateSecurityId = payload.informationStudent.isPrivateSecurity.id;
        entity.informationStudent.isDisabilityId = payload.informationStudent.isDisability.id;
        entity.informationStudent.disabilityTypeId = payload.informationStudent.disabilityType.id;
        entity.informationStudent.disabilityPercentage = payload.informationStudent.disabilityPercentage;
        entity.informationStudent.isCatastrophicIllnessId = payload.informationStudent.isCatastrophicIllness.id;
        entity.informationStudent.catastrophicIllness = payload.informationStudent.catastrophicIllness;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateAcademicData(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.universityCareerId = payload.informationStudent.universityCareer.id;
        entity.informationStudent.isDegreeSuperiorId = payload.informationStudent.isDegreeSuperior.id;
        entity.informationStudent.degreeSuperiorId = payload.informationStudent.degreeSuperior.id;
        entity.informationStudent.isStudyOtherCareerId = payload.informationStudent.isStudyOtherCareer.id;
        entity.informationStudent.nameStudyOtherCareer = payload.informationStudent.nameStudyOtherCareer;
        entity.informationStudent.typeStudyOtherCareerId = payload.informationStudent.typeStudyOtherCareer.id;
        entity.informationStudent.typeSchoolId = payload.informationStudent.typeSchool.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateOtherAcademicData(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isElectronicDeviceId = payload.informationStudent.isElectronicDevice.id;
        entity.informationStudent.electronicDeviceId = payload.informationStudent.electronicDevice.id;
        entity.informationStudent.isInternetId = payload.informationStudent.isInternet.id;
        entity.informationStudent.internetTypeId = payload.informationStudent.internetType.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateOriginPlace(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isElectronicDeviceId = payload.informationStudent.isElectronicDevice.id;
        entity.informationStudent.electronicDeviceId = payload.informationStudent.electronicDevice.id;
        entity.informationStudent.isInternetId = payload.informationStudent.isInternet.id;
        entity.informationStudent.internetTypeId = payload.informationStudent.internetType.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateResidencePlace(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isElectronicDeviceId = payload.informationStudent.isElectronicDevice.id;
        entity.informationStudent.electronicDeviceId = payload.informationStudent.electronicDevice.id;
        entity.informationStudent.isInternetId = payload.informationStudent.isInternet.id;
        entity.informationStudent.internetTypeId = payload.informationStudent.internetType.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateFamilyGroup(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.membersHouseNumber = payload.informationStudent.membersHouseNumber;
        entity.informationStudent.familyIncome = payload.informationStudent.familyIncome;
        entity.informationStudent.isDependsEconomicallyId = payload.informationStudent.isDependsEconomically.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateFamilyEconomic(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isFamilyVehicleId = payload.informationStudent.isFamilyVehicle.id;
        entity.informationStudent.isFamilyPropertiesId = payload.informationStudent.isFamilyProperties.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateFamilyHealth(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isFamilyCatastrophicIllnessId = payload.informationStudent.isFamilyCatastrophicIllness.id;
        entity.informationStudent.familyKinshipCatastrophicIllnessId = payload.informationStudent.familyKinshipCatastrophicIllness.id;
        entity.informationStudent.familyCatastrophicIllness = payload.informationStudent.familyCatastrophicIllness;
        entity.informationStudent.isFamilyDisabilityId = payload.informationStudent.isFamilyDisability.id;
        entity.informationStudent.familyKinshipDisabilityId = payload.informationStudent.familyKinshipDisability.id;
        entity.informationStudent.familyDisabilityPercentage = payload.informationStudent.familyDisabilityPercentage;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateHousingData(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.studentLiveId = payload.informationStudent.studentLive.id;
        entity.informationStudent.homeOwnershipId = payload.informationStudent.homeOwnership.id;
        entity.informationStudent.homeTypeId = payload.informationStudent.homeType.id;
        entity.informationStudent.homeRoofId = payload.informationStudent.homeRoof.id;
        entity.informationStudent.homeFloorId = payload.informationStudent.homeFloor.id;
        entity.informationStudent.homeWallId = payload.informationStudent.homeWall.id;
        entity.informationStudent.isWaterServiceId = payload.informationStudent.isWaterService.id;
        entity.informationStudent.waterServiceTypeId = payload.informationStudent.waterServiceType.id;
        entity.informationStudent.isElectricServiceId = payload.informationStudent.isElectricService.id;
        entity.informationStudent.electricServiceBlackoutId = payload.informationStudent.electricServiceBlackout.id;
        entity.informationStudent.isPhoneServiceId = payload.informationStudent.isPhoneService.id;
        entity.informationStudent.isSewerageServiceId = payload.informationStudent.isSewerageService.id;
        entity.informationStudent.sewerageServiceTypeId = payload.informationStudent.sewerageServiceType.id;
        entity.informationStudent.isEconomicContributionId = payload.informationStudent.isEconomicContribution.id;
        entity.informationStudent.isFamilyEconomicAidId = payload.informationStudent.isFamilyEconomicAid.id;
        entity.informationStudent.consumeNewsTypeId = payload.informationStudent.consumeNewsType.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateMigrationCountry(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });
        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isFamilyEmigrantId = payload.informationStudent.isFamilyEmigrant.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updatePsychosocialSection(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isFamilyEmigrantId = payload.informationStudent.isFamilyEmigrant.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }

    async updateCroquis(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {informationStudent: true},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        entity.informationStudent.isFamilyEmigrantId = payload.informationStudent.isFamilyEmigrant.id;

        await this.repository.save(entity);

        // await this.usersService.update(payload.user.id, payload.user);

        return entity;
    }
}
