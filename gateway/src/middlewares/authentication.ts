import { Request, Response, NextFunction } from "express";
import axios from "axios";
import jwt_decode from "jwt-decode";
import appService from "../services/app.service";

const existsHeaderAuthorization = (req: Request) => {
  return !!req.headers.authorization ? true : false;
};

const isFormatRight = (req: Request) => {
  const parts = req.headers.authorization?.split(" ");
  return parts?.length !== 2 || parts?.[0] !== "Bearer" ? false : true;
};

const isAccessTokenValid = async (req: Request) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const request: any = {
    method: "POST",
    url: `${appService.PATH_AUTH}/auth/validate-access-token`,
    responseType: "json",
    data: { accessToken },
  };

  const result = await axios(request);
  return result.data?.valid ? true : false;
};

const setUserId = (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[1] as string;
  const payload: any = jwt_decode(accessToken);
  res.locals.userId = payload.id;
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!existsHeaderAuthorization(req) || !isFormatRight(req)) {
    return res.status(401).json({
      message: "No tienes autorización para acceder a este recurso",
    });
  }

  if (!isAccessTokenValid(req)) {
    return res.status(401).json({
      message: "El token no es válido",
    });
  }

  setUserId(req, res);
  next();
};
