import express, {
  Express,
  Request ,
  Response,
  NextFunction ,
} from "express";

export type TValidatorProps = {
  schema: Object;
  isProtected: Boolean
}
export type TValidatorTypes = (props:TValidatorProps)=>(
  req: string, 
  res: Response, 
  next: NextFunction
) => {};

