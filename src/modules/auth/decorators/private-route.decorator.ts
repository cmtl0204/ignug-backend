import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE = 'isPublic';

export const PrivateRoute = () => SetMetadata(IS_PUBLIC_ROUTE, false);
