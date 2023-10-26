import {
    ForbiddenException,
    Inject,
    Injectable,
    NestMiddleware,
    NotFoundException, RequestMethod,
    UnauthorizedException
} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {JwtService} from "@nestjs/jwt";
import {PayloadTokenModel} from "@auth/models";
import {config} from "@config";
import {ConfigType} from "@nestjs/config";
import {isAfter, isBefore} from "date-fns";
import {AuditsService, UsersService} from "@auth/services";
import {CreateAuditDto} from "@auth/dto";
import {string} from "joi";

@Injectable()
export class AuditMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService,
                @Inject(config.KEY) private configService: ConfigType<typeof config>,
                private auditsService: AuditsService,
                private usersService: UsersService,
    ) {

    }

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ');
            const jwtDecode = this.jwtService.decode(token[1]) as PayloadTokenModel;

            const user = await this.usersService.findOne(jwtDecode.id);

            if (!user) {
                throw new NotFoundException('Usuario no encontrado (middleware)');
            }

            let modelId = null;

            if (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
                const param: string = req.params[0];
                const params = param.split('/');

                modelId = params[params.length - 1];
            }

            const payload: CreateAuditDto = {
                modelId: modelId,
                user: user,
                event: req.method,
                ipAddress: req.ip,
                newValues: req.body,
                url: req.path,
                hostname: req.hostname
            }

            this.auditsService.create(payload).then();
        }

        next();
    }

}
