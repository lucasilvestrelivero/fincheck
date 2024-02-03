import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const ActiveUserId = createParamDecorator<undefined>((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const { userId } = request;
  if (!userId) {
    throw new UnauthorizedException();
  }
  return userId;
});
