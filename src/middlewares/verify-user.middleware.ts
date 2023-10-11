import {
    ForbiddenException,
    Inject,
    Injectable,
    NestMiddleware,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {JwtService} from "@nestjs/jwt";
import {PayloadTokenModel} from "@auth/models";
import {config} from "@config";
import {ConfigType} from "@nestjs/config";
import {isAfter, isBefore} from "date-fns";

@Injectable()
export class VerifyUserMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService,
                @Inject(config.KEY) private configService: ConfigType<typeof config>,) {

    }

    use(req: Request, res: Response, next: NextFunction) {
        // if (req.headers.authorization) {
        //     const token = req.headers.authorization.split(' ');
        //
        //     const jwtDecode = this.jwtService.decode(token[1]) as PayloadTokenModel;
        //
        //     console.log(jwtDecode.exp);
        //     console.log(new Date(jwtDecode.exp));
        //     if (isBefore(jwtDecode.exp, new Date())) {
        //         throw new ForbiddenException('El toke ha expirado');
        //     }
        // }
        // console.log(jwtDecode.id);
        // console.log(jwtDecode.iat);
        // console.log(date);
        //
        // console.log(jwtDecode.exp);
        // console.log('request', req);
        // throw new NotFoundException();
        next();
    }

}
