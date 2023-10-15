import autoBind from "auto-bind";
export class controller {
    constructor() {
        autoBind(this);
    }
    response(res, message = "", code = 200, data) {
        res.status(code).json({
            message,
            data,
        });
    }
    error(res, message = "", code = 500, data) {
        res.status(code).json({
            message,
            data,
        });
    }
}
