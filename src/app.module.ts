import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImageEntity } from './image.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: join('./src/upload'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'file_upload',
      entities: [ImageEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ImageEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
