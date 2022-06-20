import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          username,
          host,
          database,
          password,
          port,
          synchronize,
          autoLoadEntities,
        } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          synchronize,
          autoLoadEntities,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabasesModule {}
