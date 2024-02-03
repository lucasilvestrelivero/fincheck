import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from '@database/database.module';
import { AuthGuard } from '@modules/auth/auth.guard';
import { UsersModule } from '@modules/users/users.module';

import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
