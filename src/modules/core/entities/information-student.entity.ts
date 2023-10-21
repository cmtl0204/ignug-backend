import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {CatalogueEntity, StudentEntity} from '@core/entities';

@Entity('information_students', {schema: 'core'})
export class InformationStudentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestamp',
    })
    updateAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
    })
    deletedAt: Date;

    /** Foreign Keys **/
    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_disability'})
    isDisability: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_disability', nullable: true, comment: 'Tiene disacapasidad'})
    isDisabilityId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_executed_community'})
    isExecutedCommunity: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_executed_community', nullable: true, comment: 'Realizo trabajo comunitario'})
    isExecutedCommunityId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_executed_practice'})
    isExecutedPractice: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_executed_practice', nullable: true, comment: 'Realizo practicas preprofesionales'})
    isExecutedPracticeId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_has_children_id'})
    isHasChildren: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_has_children_id', nullable: true, comment: 'Tiene Hijos'})
    isHasChildrenId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_house_head_id'})
    isHouseHead: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_house_head_id', nullable: true, comment: 'Es Jefe de Hogar'})
    isHouseHeadId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_lost_Gratuity'})
    isLostGratuity: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_lost_Gratuity', nullable: true, comment: 'Perdida de gratuidad'})
    isLostGratuityId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_private_security_id'})
    isPrivateSecurity: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_private_security_id', nullable: true, comment: 'Es Jefe de Hogar'})
    isPrivateSecurityId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_social_security_id'})
    isSocialSecurity: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_social_security_id', nullable: true, comment: 'Es Jefe de Hogar'})
    isSocialSecurityId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_study_other_career_id'})
    isStudyOtherCareer: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_study_other_career_id', nullable: true, comment: 'Estudia otra carrera fuera de la Amawtay Wasi'})
    isStudyOtherCareerId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'is_subject_repeat'})
    isSubjectRepeat: CatalogueEntity;
    @Column({type: 'uuid',name: 'is_subject_repeat', nullable: true, comment: 'Repite materias'})
    isSubjectRepeatId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'family_income'})
    familyIncome: CatalogueEntity;
    @Column({type: 'uuid',name: 'family_income', nullable: true, comment: 'Ingresos familiares'})
    familyIncomeId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'type_study_other_career_id'})
    typeStudyOtherCareer: CatalogueEntity;
    @Column({type: 'uuid',name: 'type_study_other_career_id', nullable: true, comment: 'Estudia otra carrera fuera de la Amawtay Wasi'})
    typeStudyOtherCareerId: string;

    @ManyToOne(() => CatalogueEntity, {nullable: true})
    @JoinColumn({name: 'university_career_id'})
    universityCareer: CatalogueEntity;
    @Column({type: 'uuid',name: 'university_career_id', nullable: true, comment: 'En su trayectoria universitaria ha realizado'})
    universityCareerId: string;

    @OneToOne(() => StudentEntity, student => student.informationStudent)
    @JoinColumn({name: 'student_id'})
    student: StudentEntity;
    @Column({type: 'uuid',name: 'student_id', comment: 'Estudiante que pertenece la informacion'})
    studentId: string;

    /** Columns **/
    @Column({
        name: 'address',
        type: 'text',
        nullable: true,
        comment: 'La direccion donde reside el estudiante',
    })
    address: string;

    @Column({
        name: 'children_total',
        type: 'int',
        nullable: true,
        comment: 'Total de Hijos',
    })
    childrenTotal: number;

    @Column({
        name: 'community',
        type: 'int',
        nullable: true,
        comment: 'Las horas realizadas por parte del estudiante en integracion con la sociedad',
    })
    community: number;

    @Column({
        name: 'contact_emergency_name',
        type: 'varchar',
        nullable: true,
        comment: 'Nombre del contacto de emergencia para informar sobre el estudiante',
    })
    contactEmergencyName: string;

    @Column({
        name: 'contact_emergency_kinship',
        type: 'varchar',
        nullable: true,
        comment: 'Nombre del contacto de emergencia de parentescos para informar sobre el estudiante',
    })
    contactEmergencyKinship: string;

    @Column({
        name: 'contact_emergency_phone',
        type: 'varchar',
        nullable: true,
        comment: 'Numeros de contacto de emergencia para informar sobre el estudiante',
    })
    contactEmergencyPhone: string;

    @Column({
        name: 'disability_percentage',
        type: 'float',
        nullable: true,
        comment: 'El porcentaje de discapicidad que tiene el estudiante ',
    })
    disabilityPercentage: number;

    @Column({
        name: 'economic_amount',
        type: 'float',
        nullable: true,
        comment: 'El monto de ayuda economica que el estudiante recibe',
    })
    economicAmount: number;

    @Column({
        name: 'educational_amount',
        type: 'float',
        nullable: true,
        comment: 'El monto de credito que el estudiante tiene',
    })
    educationalAmount: number;

    @Column({
        name: 'financing_scholarship_type',
        type: 'varchar',
        nullable: true,
        comment: 'Recibe el estudiante un financiamiento si =1, no = 2',
    })
    financingScholarshipType: string;

    @Column({
        name: 'members_house_number',
        type: 'int',
        nullable: true,
        comment: 'Numero de familiares con quien vive el estudiante',
    })
    membersHouseNumber: number;

    @Column({
        name: 'name_study_other_career',
        type: 'varchar',
        nullable: true,
        comment: 'Nombre de la Institución',
    })
    nameStudyOtherCareer: string;

    @Column({
        name: 'nearby_city',
        type: 'varchar',
        nullable: true,
        comment: 'Si usted reside en una comunidad, ¿Qué ciudad es la más cercana a su domicilio?',
    })
    nearbyCity: string;

    @Column({
        name: 'postal_code',
        type: 'varchar',
        nullable: true,
        comment: 'Codigo postal donde el estudiante reside',
    })
    postalCode: string;

    @Column({
        name: 'practice_hours',
        type: 'int',
        nullable: true,
        comment: 'Las horas realizadas por parte del estudiante en pasantias',
    })
    practiceHours: number;

    @Column({
        name: 'scholarship_amount',
        type: 'float',
        nullable: true,
        comment: 'El monto de beca que el estudiante obtuvo',
    })
    scholarshipAmount: number;

    @Column({
        name: 'tariff_scholarship_percentage',
        type: 'float',
        nullable: true,
        comment: 'El porcentaje de beca que cubre la institutcion el estudiante ',
    })
    tariffScholarshipPercentage: number;

    @Column({
        name: 'work_position',
        type: 'varchar',
        nullable: true,
        comment: 'Codigo postal donde el estudiante reside',
    })
    workPosition: string;
}
