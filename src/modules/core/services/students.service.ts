import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {FindOptionsWhere, Repository} from 'typeorm';
import {FilterStudentDto, PaginationDto, UpdateStudentDto} from '@core/dto';
import {StudentEntity} from '@core/entities';
import {CatalogueYesNoEnum, CoreRepositoryEnum} from '@shared/enums';
import {UsersService} from '@auth/services';
import {InformationStudentsService} from './information-students.service';
import {ServiceResponseHttpModel} from '@shared/models';
import {OriginAddressesService} from "./origin-addresses.service";
import {ResidenceAddressesService} from "./residence-addresses.service";

@Injectable()
export class StudentsService {
    constructor(
        @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY)
        private readonly repository: Repository<StudentEntity>,
        private readonly usersService: UsersService,
        private readonly informationStudentsService: InformationStudentsService,
        private readonly originAddressesService: OriginAddressesService,
        private readonly residenceAddressesService: ResidenceAddressesService,
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
        entity.user.cellPhone = payload.user.cellPhone;
        entity.user.phone = payload.user.phone;
        entity.user.personalEmail = payload.user.personalEmail;
        entity.user.email = payload.user.email;

        await this.usersService.update(entity.userId, entity.user);

        entity.informationStudent.indigenousNationalityId = payload.informationStudent.indigenousNationality.id;
        entity.informationStudent.townId = payload.informationStudent.town.id;
        entity.informationStudent.isAncestralLanguageId = payload.informationStudent.isAncestralLanguage.id;
        entity.informationStudent.ancestralLanguageName = payload.informationStudent.ancestralLanguageName;
        entity.informationStudent.isForeignLanguageId = payload.informationStudent.isForeignLanguage.id;
        entity.informationStudent.foreignLanguageName = payload.informationStudent.foreignLanguageName;
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

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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
        entity.informationStudent.typeSchoolId = payload.informationStudent.typeSchool.id;

        // Conditional Field
        entity.informationStudent.isDegreeSuperiorId = payload.informationStudent.isDegreeSuperior.id;

        entity.informationStudent.degreeSuperiorId =
            payload.informationStudent.isDegreeSuperior.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.degreeSuperior.id : null;

        // Conditional Field
        entity.informationStudent.isStudyOtherCareerId = payload.informationStudent.isStudyOtherCareer.id;

        entity.informationStudent.nameStudyOtherCareer =
            payload.informationStudent.isStudyOtherCareer.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.nameStudyOtherCareer : null;

        entity.informationStudent.typeStudyOtherCareerId =
            payload.informationStudent.isStudyOtherCareer.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.typeStudyOtherCareer?.id : null;

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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

        // Conditional Field
        entity.informationStudent.isElectronicDeviceId = payload.informationStudent.isElectronicDevice.id;

        entity.informationStudent.electronicDeviceId =
            payload.informationStudent.isElectronicDevice.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.electronicDevice.id : null;

        // Conditional Field
        entity.informationStudent.isInternetId = payload.informationStudent.isInternet.id;

        entity.informationStudent.internetTypeId =
            payload.informationStudent.isInternet.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.internetType.id : null;

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

        return entity;
    }

    async updateOriginPlace(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {user: {originAddress: true}},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        if (!entity.user.originAddress) {
            await this.originAddressesService.create(
                {
                    cantonId: payload.user.originAddress.canton?.id,
                    community: payload.user.originAddress.community,
                    latitude: payload.user.originAddress.latitude,
                    longitude: payload.user.originAddress.longitude,
                    mainStreet: payload.user.originAddress.mainStreet,
                    modelId: entity.user.id,
                    nearbyCity: payload.user.originAddress.nearbyCity,
                    number: payload.user.originAddress.number,
                    parrishId: payload.user.originAddress.parrish?.id,
                    postCode: payload.user.originAddress.postCode,
                    provinceId: payload.user.originAddress.province?.id,
                    reference: payload.user.originAddress.reference,
                    secondaryStreet: payload.user.originAddress.secondaryStreet,
                }
            );
        } else {
            await this.originAddressesService.update(
                entity.user.originAddress.id,
                {
                    cantonId: payload.user.originAddress.canton?.id,
                    community: payload.user.originAddress.community,
                    latitude: payload.user.originAddress.latitude,
                    longitude: payload.user.originAddress.longitude,
                    mainStreet: payload.user.originAddress.mainStreet,
                    nearbyCity: payload.user.originAddress.nearbyCity,
                    number: payload.user.originAddress.number,
                    parrishId: payload.user.originAddress.parrish?.id,
                    postCode: payload.user.originAddress.postCode,
                    provinceId: payload.user.originAddress.province?.id,
                    reference: payload.user.originAddress.reference,
                    secondaryStreet: payload.user.originAddress.secondaryStreet,
                }
            );
        }

        return entity;
    }

    async updateResidencePlace(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
        const entity = await this.repository.findOne({
            relations: {user: {residenceAddress: true}},
            where: {id}
        });

        if (!entity) {
            throw new NotFoundException('Estudiante no encontrado');
        }

        if (!entity.user.residenceAddress) {
            await this.residenceAddressesService.create(
                {
                    cantonId: payload.user.residenceAddress.canton?.id,
                    community: payload.user.residenceAddress.community,
                    latitude: payload.user.residenceAddress.latitude,
                    longitude: payload.user.residenceAddress.longitude,
                    mainStreet: payload.user.residenceAddress.mainStreet,
                    modelId: payload.user.id,
                    nearbyCity: payload.user.residenceAddress.nearbyCity,
                    number: payload.user.residenceAddress.number,
                    parrishId: payload.user.residenceAddress.parrish?.id,
                    postCode: payload.user.residenceAddress.postCode,
                    provinceId: payload.user.residenceAddress.province?.id,
                    reference: payload.user.residenceAddress.reference,
                    secondaryStreet: payload.user.residenceAddress.secondaryStreet,
                }
            );
        } else {
            await this.residenceAddressesService.update(
                entity.user.residenceAddress.id,
                {
                    cantonId: payload.user.residenceAddress.canton?.id,
                    community: payload.user.residenceAddress.community,
                    latitude: payload.user.residenceAddress.latitude,
                    longitude: payload.user.residenceAddress.longitude,
                    mainStreet: payload.user.residenceAddress.mainStreet,
                    nearbyCity: payload.user.residenceAddress.nearbyCity,
                    number: payload.user.residenceAddress.number,
                    parrishId: payload.user.residenceAddress.parrish?.id,
                    postCode: payload.user.residenceAddress.postCode,
                    provinceId: payload.user.residenceAddress.province?.id,
                    reference: payload.user.residenceAddress.reference,
                    secondaryStreet: payload.user.residenceAddress.secondaryStreet,
                }
            );
        }

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

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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

        // Conditional Field
        entity.informationStudent.isFamilyCatastrophicIllnessId = payload.informationStudent.isFamilyCatastrophicIllness.id;

        entity.informationStudent.familyKinshipCatastrophicIllnessId =
            payload.informationStudent.isFamilyCatastrophicIllness.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.familyKinshipCatastrophicIllness.id : null;

        entity.informationStudent.familyCatastrophicIllness =
            payload.informationStudent.isFamilyCatastrophicIllness.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.familyCatastrophicIllness : null;

        // Conditional Field
        entity.informationStudent.isFamilyDisabilityId = payload.informationStudent.isFamilyDisability.id;
        entity.informationStudent.familyKinshipDisabilityId =
            payload.informationStudent.isFamilyDisability.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.familyKinshipDisability.id : null;

        entity.informationStudent.familyDisabilityPercentage =
            payload.informationStudent.isFamilyDisability.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.familyDisabilityPercentage : null;

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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
        entity.informationStudent.isPhoneServiceId = payload.informationStudent.isPhoneService.id;
        entity.informationStudent.isEconomicContributionId = payload.informationStudent.isEconomicContribution.id;
        entity.informationStudent.isFamilyEconomicAidId = payload.informationStudent.isFamilyEconomicAid.id;
        entity.informationStudent.consumeNewsTypeId = payload.informationStudent.consumeNewsType.id;

        // Conditional Field
        entity.informationStudent.isWaterServiceId = payload.informationStudent.isWaterService.id;

        entity.informationStudent.waterServiceTypeId =
            payload.informationStudent.isWaterService.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.waterServiceType.id : null;

        // Conditional Field
        entity.informationStudent.isElectricServiceId = payload.informationStudent.isElectricService.id;

        entity.informationStudent.electricServiceBlackoutId =
            payload.informationStudent.isElectricService.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.electricServiceBlackout.id : null;

        // Conditional Field
        entity.informationStudent.isSewerageServiceId = payload.informationStudent.isSewerageService.id;

        entity.informationStudent.sewerageServiceTypeId =
            payload.informationStudent.isSewerageService.code === CatalogueYesNoEnum.YES
                ? payload.informationStudent.sewerageServiceType.id : null;

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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

        await this.informationStudentsService.update(entity.informationStudent.id, entity.informationStudent);

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
