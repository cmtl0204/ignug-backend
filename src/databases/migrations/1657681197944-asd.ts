import { MigrationInterface, QueryRunner } from 'typeorm';

export class asd1657681197944 implements MigrationInterface {
  name = 'asd1657681197944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "institutions" ("id" SERIAL NOT NULL, "acronym" character varying(50) NOT NULL DEFAULT 'none', "cellphone" character varying(50), "code" character varying(50) NOT NULL, "code_sniese" character varying(50) NOT NULL, "denomination" character varying(255) NOT NULL, "email" character varying, "logo" character varying, "name" character varying(255) NOT NULL, "phone" character varying(20), "short_name" character varying(255) NOT NULL, "slogan" character varying(1000), "web" character varying, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE, "address_id" integer, "state_id" integer, CONSTRAINT "REL_f6debf818490ee14c2fbfa3001" UNIQUE ("address_id"), CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id")); COMMENT ON COLUMN "institutions"."acronym" IS 'abreviatura del nombre del instituto'; COMMENT ON COLUMN "institutions"."cellphone" IS 'teléfono móvil directo de contacto con el instituto'; COMMENT ON COLUMN "institutions"."code" IS 'código único para identificar al instituto'; COMMENT ON COLUMN "institutions"."code_sniese" IS 'code_sniese designado al instituto'; COMMENT ON COLUMN "institutions"."denomination" IS 'denomination para referirse al instituto'; COMMENT ON COLUMN "institutions"."email" IS 'email para contactar al instituto'; COMMENT ON COLUMN "institutions"."logo" IS 'logo que identifica al instituto'; COMMENT ON COLUMN "institutions"."name" IS 'nombre designado para el instituto'; COMMENT ON COLUMN "institutions"."phone" IS 'teléfono directo de contacto con el instituto'; COMMENT ON COLUMN "institutions"."short_name" IS 'nombre corto designado para el instituto'; COMMENT ON COLUMN "institutions"."slogan" IS 'slogan que describe al instituto'; COMMENT ON COLUMN "institutions"."web" IS 'web donde localizar al instituto'`,
    );
    await queryRunner.query(
      `CREATE TABLE "catalogues" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL DEFAULT 'SN', CONSTRAINT "PK_46bf45bf62531f148dc7b5cf5ca" PRIMARY KEY ("id")); COMMENT ON COLUMN "catalogues"."name" IS 'Nombre del producto'`,
    );
    await queryRunner.query(
      `CREATE TABLE "careers" ("id" SERIAL NOT NULL, "acronym" character varying(10) NOT NULL, "code" character varying(50) NOT NULL, "code_sniese" character varying(50) NOT NULL, "logo" character varying(100), "name" character varying(255) NOT NULL, "resolution_number" double precision NOT NULL, "roles" text NOT NULL, "short_name" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "institution_id" integer, "modality_id" integer, "state_id" integer, "type_id" integer, CONSTRAINT "PK_febfc45dc83d58090d3122fde3d" PRIMARY KEY ("id")); COMMENT ON COLUMN "careers"."acronym" IS 'Acronimo de la carrera'; COMMENT ON COLUMN "careers"."code" IS 'Codigo de la carrera'; COMMENT ON COLUMN "careers"."code_sniese" IS 'Codigo sniese de la carrera'; COMMENT ON COLUMN "careers"."logo" IS 'Logo de la carrera'; COMMENT ON COLUMN "careers"."name" IS 'Nombre de la carrera'; COMMENT ON COLUMN "careers"."resolution_number" IS 'Numero de resolucion de la carrera'; COMMENT ON COLUMN "careers"."short_name" IS 'Nombre corto de la carrera'; COMMENT ON COLUMN "careers"."title" IS 'Titulo de la carrera'; COMMENT ON COLUMN "careers"."created_at" IS 'Fecha de creacion de la carrera'; COMMENT ON COLUMN "careers"."updated_at" IS 'Fecha de actualizacion de la carrera'; COMMENT ON COLUMN "careers"."deleted_at" IS 'Fecha de eliminacion de la carrera'`,
    );
    await queryRunner.query(
      `CREATE TABLE "curricula" ("id" SERIAL NOT NULL, "code" character varying(255) NOT NULL DEFAULT 'SN', "ended_At" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "started_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL DEFAULT 'SN', "description" character varying(255) NOT NULL DEFAULT 'SN', "resolution_Number" character varying(255) NOT NULL DEFAULT 'SN', "periodic_Academic_Number" double precision NOT NULL, "weeks_Number" double precision NOT NULL, "careerId" integer, "stateId" integer, CONSTRAINT "PK_7c5dd2066e2bbf3b6ad0a71c567" PRIMARY KEY ("id")); COMMENT ON COLUMN "curricula"."code" IS 'Nombre del producto'; COMMENT ON COLUMN "curricula"."ended_At" IS 'Fecha de creacion de la carrera'; COMMENT ON COLUMN "curricula"."started_at" IS 'Fecha de creacion de la carrera'; COMMENT ON COLUMN "curricula"."name" IS 'Nombre del producto'; COMMENT ON COLUMN "curricula"."description" IS 'Nombre del producto'; COMMENT ON COLUMN "curricula"."resolution_Number" IS 'Numero de resolucion'; COMMENT ON COLUMN "curricula"."periodic_Academic_Number" IS 'numero de periodo academmico'; COMMENT ON COLUMN "curricula"."weeks_Number" IS 'Numeros de semanas'`,
    );
    await queryRunner.query(
      `CREATE TABLE "information_students" ("id" SERIAL NOT NULL, "address" character varying(1000) NOT NULL, "ancestral_language" character varying(255) NOT NULL, "cell_phone" character varying(10) NOT NULL, "conadis_number" character varying(10) NOT NULL, "community" integer NOT NULL, "company_name" character varying(255) NOT NULL, "contact_emergency_name" character varying(255) NOT NULL, "contact_emergency_kinship" character varying(255) NOT NULL, "contact_emergency_phone" character varying(255) NOT NULL, "degree_obtained_superior" character varying(10) NOT NULL, "disability_type" character varying(100) NOT NULL, "disability_percentage" integer NOT NULL, "education_level_mother" character varying(100) NOT NULL, "education_level_father" character varying(100) NOT NULL, "economic_amount" integer NOT NULL, "educational_amount" integer NOT NULL, "economic_practice_sector" character varying(20) NOT NULL, "family_income" integer NOT NULL, "financing_scholarship_type" character varying(180) NOT NULL, "institution_practice_type" character varying(100) NOT NULL, "is_lost_gratuity" character varying(1) NOT NULL, "is_executed_practice" character varying(1) NOT NULL, "is_executed_community" character varying(1) NOT NULL, "members_house_number" integer NOT NULL, "ocupation" character varying(280) NOT NULL, "phone" character varying(10) NOT NULL, "practice_hours" integer NOT NULL, "postal_code" character varying(100) NOT NULL, "scholarship_amount" integer NOT NULL, "scholarship_reason1" character varying(255) NOT NULL, "scholarship_reason2" character varying(255) NOT NULL, "scholarship_reason3" character varying(255) NOT NULL, "scholarship_reason4" character varying(255) NOT NULL, "scholarship_reason5" character varying(255) NOT NULL, "scholarship_reason6" character varying(255) NOT NULL, "scholarship_type" character varying(255) NOT NULL, "tariff_scholarship_percentage" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_ancestral_language" integer, "is_bonus_development_receive" integer, "is_degree_superior" integer, "is_disability" integer, "is_subject_repeat" integer, CONSTRAINT "PK_09d05f1fed1466be6ad735a92ae" PRIMARY KEY ("id")); COMMENT ON COLUMN "information_students"."address" IS 'La direccion donde reside el estudiante'; COMMENT ON COLUMN "information_students"."ancestral_language" IS 'El idioma ancestral que el estudiante maneja'; COMMENT ON COLUMN "information_students"."cell_phone" IS 'Numero de celular del estudiante'; COMMENT ON COLUMN "information_students"."conadis_number" IS 'Numero que tiene el carnet del conais'; COMMENT ON COLUMN "information_students"."community" IS 'Las horas realizadas por parte del estudiante en integracion con la sociedad'; COMMENT ON COLUMN "information_students"."company_name" IS 'El nombre de la compania donde el estudiante trabaja'; COMMENT ON COLUMN "information_students"."contact_emergency_name" IS 'Nombre del contacto de emergencia para informar sobre el estudiante'; COMMENT ON COLUMN "information_students"."contact_emergency_kinship" IS 'Nombre del contacto de emergencia de parentescos para informar sobre el estudiante'; COMMENT ON COLUMN "information_students"."contact_emergency_phone" IS 'Numeros de contacto de emergencia para informar sobre el estudiante'; COMMENT ON COLUMN "information_students"."degree_obtained_superior" IS 'obtuvo su grado superior si=1 , no= 2'; COMMENT ON COLUMN "information_students"."disability_type" IS 'Tipo de discapcidad que tiene el estudiante'; COMMENT ON COLUMN "information_students"."disability_percentage" IS 'El porcentaje de discapicidad que tiene el estudiante '; COMMENT ON COLUMN "information_students"."education_level_mother" IS 'Nivel de formacion de ecuacion que tiene la madre 1 = Basico , 2 = Superior'; COMMENT ON COLUMN "information_students"."education_level_father" IS 'Nivel de formacion de ecuacion que tiene la padre 1 = Basico , 2 = Superior'; COMMENT ON COLUMN "information_students"."economic_amount" IS 'El monto de ayuda economica que el estudiante recibe'; COMMENT ON COLUMN "information_students"."educational_amount" IS 'El monto de credito que el estudiante tiene'; COMMENT ON COLUMN "information_students"."economic_practice_sector" IS 'Sector economico que hizo las practicas el estudiante'; COMMENT ON COLUMN "information_students"."family_income" IS 'La direccion donde reside el estudiante'; COMMENT ON COLUMN "information_students"."financing_scholarship_type" IS 'recibi el estudiante un financiamiento si =1, no = 2'; COMMENT ON COLUMN "information_students"."institution_practice_type" IS 'La institucion que hizo las practicas el estudiante'; COMMENT ON COLUMN "information_students"."is_lost_gratuity" IS 'Si el estudiante ah perdido la gratuidad en el instituto'; COMMENT ON COLUMN "information_students"."is_executed_practice" IS 'Si el estudiante ah realizado practicas = 1  , si no realizo = 2'; COMMENT ON COLUMN "information_students"."is_executed_community" IS 'Si el estudiante ah realizado integracion con la sociedad = 1  , si no realizo = 2'; COMMENT ON COLUMN "information_students"."members_house_number" IS 'Numero de familiares con quien vive el estudiante'; COMMENT ON COLUMN "information_students"."ocupation" IS ' ocupacion de la compañia donde el estudiante trabaja'; COMMENT ON COLUMN "information_students"."phone" IS 'Numero de telefono del estudiante'; COMMENT ON COLUMN "information_students"."practice_hours" IS 'Las horas realizadas por parte del estudiante en pasantias'; COMMENT ON COLUMN "information_students"."postal_code" IS 'Codigo postal donde el estudiante reside'; COMMENT ON COLUMN "information_students"."scholarship_amount" IS 'El monto de beca que el estudiante obtuvo'; COMMENT ON COLUMN "information_students"."scholarship_reason1" IS 'Razon para que el estudiante pida una beca'; COMMENT ON COLUMN "information_students"."scholarship_reason2" IS 'Razon para que el estudiante pida una beca'; COMMENT ON COLUMN "information_students"."scholarship_reason3" IS 'Razon para que el estudiante pida una beca'; COMMENT ON COLUMN "information_students"."scholarship_reason4" IS 'Razon para que el estudiante pida una beca'; COMMENT ON COLUMN "information_students"."scholarship_reason5" IS 'Razon para que el estudiante pida una beca'; COMMENT ON COLUMN "information_students"."scholarship_reason6" IS 'Razon para que el estudiante pida una beca'; COMMENT ON COLUMN "information_students"."scholarship_type" IS 'Tipo de beca del estudiante '; COMMENT ON COLUMN "information_students"."tariff_scholarship_percentage" IS 'El porcentaje de beca que cubre la institutcion el estudiante '`,
    );
    await queryRunner.query(
      `CREATE TABLE "information_teachers" ("id" SERIAL NOT NULL, "academic_unit" character varying(255) NOT NULL, "administrative_hours" double precision NOT NULL, "class_hours" double precision NOT NULL, "community_hours" double precision NOT NULL, "degree_higher_education" character varying(255) NOT NULL, "hours_worked" double precision NOT NULL, "holidays" date, "home_vacation" date, "institution_higher_education" character varying(255) NOT NULL, "investigation_hours" double precision NOT NULL, "other_hours" character varying(255) NOT NULL, "publications" double precision NOT NULL, "scholarship_amount" double precision NOT NULL, "total_subjects" double precision NOT NULL, "technical" character varying(255) NOT NULL, "technology" character varying(255) NOT NULL, "total_publications" double precision NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "country_higher_education_id" integer, "dedication_time_id" integer, "financing_type_id" integer, "higher_education_id" integer, "scholarship_id" integer, "scholarship_type_id" integer, "teaching_ladder_id" integer, "username_id" integer, CONSTRAINT "PK_1f17929db292915fe5927390cde" PRIMARY KEY ("id")); COMMENT ON COLUMN "information_teachers"."academic_unit" IS 'Nombre de la unidad academica'; COMMENT ON COLUMN "information_teachers"."administrative_hours" IS 'Horas dedicadas a la administracion al mes'; COMMENT ON COLUMN "information_teachers"."class_hours" IS 'Total de horas de clase dadas'; COMMENT ON COLUMN "information_teachers"."community_hours" IS 'Horas dedicadas a labores comunitarios'; COMMENT ON COLUMN "information_teachers"."degree_higher_education" IS 'Que grado de educación superior tiene el usuario'; COMMENT ON COLUMN "information_teachers"."hours_worked" IS 'Total de las horas trabajadas al mes'; COMMENT ON COLUMN "information_teachers"."holidays" IS 'Fecha de los dias festivos.'; COMMENT ON COLUMN "information_teachers"."home_vacation" IS 'Fecha para las vacacines'; COMMENT ON COLUMN "information_teachers"."institution_higher_education" IS 'Nombre de la institución de educación superior'; COMMENT ON COLUMN "information_teachers"."investigation_hours" IS 'Horas de investigacion al mes'; COMMENT ON COLUMN "information_teachers"."other_hours" IS 'Horas dedicadas a otras actividades'; COMMENT ON COLUMN "information_teachers"."publications" IS 'Revisar publicacion'; COMMENT ON COLUMN "information_teachers"."scholarship_amount" IS 'Precio de la beca a pagar'; COMMENT ON COLUMN "information_teachers"."total_subjects" IS 'Total de personas en la academia'; COMMENT ON COLUMN "information_teachers"."technical" IS 'nombre de la tecnica a usar'; COMMENT ON COLUMN "information_teachers"."technology" IS 'nombres de las salas de tecnologia'; COMMENT ON COLUMN "information_teachers"."total_publications" IS 'Total de las publicaciones realizadas sata el momento'`,
    );
    await queryRunner.query(
      `CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "student" integer, "user_id" integer, CONSTRAINT "REL_f7918a5216fddc9e761ed9b0bc" UNIQUE ("student"), CONSTRAINT "REL_fb3eff90b11bddf7285f9b4e28" UNIQUE ("user_id"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")); COMMENT ON COLUMN "students"."name" IS 'Nombre del estudiante'`,
    );
    await queryRunner.query(
      `CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "autonomous_hour" integer NOT NULL DEFAULT '0', "code" character varying(100) NOT NULL, "credit" double precision DEFAULT '0', "name" character varying(255) NOT NULL DEFAULT 'SN', "practical_hour" integer NOT NULL DEFAULT '0', "scale" integer NOT NULL DEFAULT '0', "teacher_hour" integer NOT NULL DEFAULT '0', "academic_period_id" integer, "curriculum_id" integer, "state_id" integer, "type_id" integer, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id")); COMMENT ON COLUMN "subjects"."autonomous_hour" IS 'Hora autónoma de la asignatura'; COMMENT ON COLUMN "subjects"."code" IS 'Código de la asignatura'; COMMENT ON COLUMN "subjects"."credit" IS 'Creditos de la asignatura'; COMMENT ON COLUMN "subjects"."name" IS 'Nombre de la asignatura'; COMMENT ON COLUMN "subjects"."practical_hour" IS 'Horas prácticas de la asignatura'; COMMENT ON COLUMN "subjects"."scale" IS 'ponderable de la asignatura'; COMMENT ON COLUMN "subjects"."teacher_hour" IS 'Horas del docente'`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "roles" text NOT NULL, "birthdate" date, "email" character varying(255) NOT NULL, "email_verified_at" TIMESTAMP, "lastname" character varying(255) NOT NULL, "password" character varying(100) NOT NULL, "password_changed" boolean NOT NULL DEFAULT false, "phone" character varying(20), "max_attempts" integer NOT NULL DEFAULT '3', "name" character varying(255) NOT NULL, "suspended" TIMESTAMP, "username" character varying(100) NOT NULL, "blood_type_id" integer, "ethnic_origin_id" integer, "identification_type_id" integer, "gender_id" integer, "marital_status_id" integer, "sex_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."birthdate" IS 'Fecha de nacimiento'; COMMENT ON COLUMN "users"."email" IS 'Correo Electronico'; COMMENT ON COLUMN "users"."email_verified_at" IS 'Correo Electronico'; COMMENT ON COLUMN "users"."lastname" IS 'Apellidos'; COMMENT ON COLUMN "users"."password" IS 'Contraseña'; COMMENT ON COLUMN "users"."password_changed" IS 'true: ya cambió la contraseña y False:no'; COMMENT ON COLUMN "users"."phone" IS 'Teléfono'; COMMENT ON COLUMN "users"."max_attempts" IS 'Intentos máximos para errar la contraseña, si llega a cero el usuario se bloquea'; COMMENT ON COLUMN "users"."name" IS 'Nombres'; COMMENT ON COLUMN "users"."suspended" IS 'Fecha de la ultima suspension del usuario'; COMMENT ON COLUMN "users"."username" IS 'Nombre de usuario para ingreso al sistema'`,
    );
    await queryRunner.query(
      `ALTER TABLE "institutions" ADD CONSTRAINT "FK_f6debf818490ee14c2fbfa30019" FOREIGN KEY ("address_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "institutions" ADD CONSTRAINT "FK_fe8a923e945353fb4cf47822048" FOREIGN KEY ("state_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" ADD CONSTRAINT "FK_baeafd9fc299c856d4ce0614144" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" ADD CONSTRAINT "FK_2c17bd707d3d6265b041c92acbe" FOREIGN KEY ("modality_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" ADD CONSTRAINT "FK_a5756a77c7cf2adf3bf1e62e332" FOREIGN KEY ("state_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" ADD CONSTRAINT "FK_0296fa76cdbdf1c40e312ec93b8" FOREIGN KEY ("type_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "curricula" ADD CONSTRAINT "FK_bb3e850ad575ecb3aef947d8a3a" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "curricula" ADD CONSTRAINT "FK_b97ff62d8b70a37bfe0c9eb2179" FOREIGN KEY ("stateId") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" ADD CONSTRAINT "FK_85beee5bbfbaba28c5491d56a0a" FOREIGN KEY ("is_ancestral_language") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" ADD CONSTRAINT "FK_b482f9ed44239d91426fab2a557" FOREIGN KEY ("is_bonus_development_receive") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" ADD CONSTRAINT "FK_8289cef4fc4904e209680d232ad" FOREIGN KEY ("is_degree_superior") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" ADD CONSTRAINT "FK_0211016381ff1e8b02feb21a203" FOREIGN KEY ("is_disability") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" ADD CONSTRAINT "FK_d4201eb75f3300e6bea2367b298" FOREIGN KEY ("is_subject_repeat") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_2d54877e9547eed1ca96a02fc6e" FOREIGN KEY ("country_higher_education_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_64700f3d6003d979022422572ab" FOREIGN KEY ("dedication_time_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_66ee550bd8672e193ff43479968" FOREIGN KEY ("financing_type_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_74798f51924eab613b9f94da076" FOREIGN KEY ("higher_education_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_572acfc10d72f09b289a1b414ef" FOREIGN KEY ("scholarship_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_21f71edd355059c43159b47bcea" FOREIGN KEY ("scholarship_type_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_60f10e97c8d0fdfce882584f315" FOREIGN KEY ("teaching_ladder_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" ADD CONSTRAINT "FK_84a42ff19a0fd2fa2434a58c641" FOREIGN KEY ("username_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_f7918a5216fddc9e761ed9b0bc9" FOREIGN KEY ("student") REFERENCES "information_students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_2e4f2f1f2ddf59ba477a7e531de" FOREIGN KEY ("academic_period_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_91bf8714753a4296fe5ff68c14e" FOREIGN KEY ("curriculum_id") REFERENCES "curricula"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_512a5fae409ce0ca703287b3efe" FOREIGN KEY ("state_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_2430cac40781f5f126e8b2dfd02" FOREIGN KEY ("type_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_72c0bd6f4a671b82adb838f5442" FOREIGN KEY ("blood_type_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_efd2f906b856a9a282e99c2dca4" FOREIGN KEY ("ethnic_origin_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_91aa7731aa6e62ae1303a6e5339" FOREIGN KEY ("identification_type_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7fc7be0985c48fa965c80fc8775" FOREIGN KEY ("gender_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_88b0218c6c5d0d9b55ccf4a9fee" FOREIGN KEY ("marital_status_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_54c0e95503025f0cb4e9f2f65b8" FOREIGN KEY ("sex_id") REFERENCES "catalogues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_54c0e95503025f0cb4e9f2f65b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_88b0218c6c5d0d9b55ccf4a9fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7fc7be0985c48fa965c80fc8775"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_91aa7731aa6e62ae1303a6e5339"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_efd2f906b856a9a282e99c2dca4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_72c0bd6f4a671b82adb838f5442"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_2430cac40781f5f126e8b2dfd02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_512a5fae409ce0ca703287b3efe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_91bf8714753a4296fe5ff68c14e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_2e4f2f1f2ddf59ba477a7e531de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_f7918a5216fddc9e761ed9b0bc9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_84a42ff19a0fd2fa2434a58c641"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_60f10e97c8d0fdfce882584f315"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_21f71edd355059c43159b47bcea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_572acfc10d72f09b289a1b414ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_74798f51924eab613b9f94da076"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_66ee550bd8672e193ff43479968"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_64700f3d6003d979022422572ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_teachers" DROP CONSTRAINT "FK_2d54877e9547eed1ca96a02fc6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" DROP CONSTRAINT "FK_d4201eb75f3300e6bea2367b298"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" DROP CONSTRAINT "FK_0211016381ff1e8b02feb21a203"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" DROP CONSTRAINT "FK_8289cef4fc4904e209680d232ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" DROP CONSTRAINT "FK_b482f9ed44239d91426fab2a557"`,
    );
    await queryRunner.query(
      `ALTER TABLE "information_students" DROP CONSTRAINT "FK_85beee5bbfbaba28c5491d56a0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "curricula" DROP CONSTRAINT "FK_b97ff62d8b70a37bfe0c9eb2179"`,
    );
    await queryRunner.query(
      `ALTER TABLE "curricula" DROP CONSTRAINT "FK_bb3e850ad575ecb3aef947d8a3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" DROP CONSTRAINT "FK_0296fa76cdbdf1c40e312ec93b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" DROP CONSTRAINT "FK_a5756a77c7cf2adf3bf1e62e332"`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" DROP CONSTRAINT "FK_2c17bd707d3d6265b041c92acbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "careers" DROP CONSTRAINT "FK_baeafd9fc299c856d4ce0614144"`,
    );
    await queryRunner.query(
      `ALTER TABLE "institutions" DROP CONSTRAINT "FK_fe8a923e945353fb4cf47822048"`,
    );
    await queryRunner.query(
      `ALTER TABLE "institutions" DROP CONSTRAINT "FK_f6debf818490ee14c2fbfa30019"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TABLE "information_teachers"`);
    await queryRunner.query(`DROP TABLE "information_students"`);
    await queryRunner.query(`DROP TABLE "curricula"`);
    await queryRunner.query(`DROP TABLE "careers"`);
    await queryRunner.query(`DROP TABLE "catalogues"`);
    await queryRunner.query(`DROP TABLE "institutions"`);
  }
}
