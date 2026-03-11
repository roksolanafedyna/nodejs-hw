import { Router } from "express";
import { celebrate } from "celebrate";
import { registerUser, loginUser, refreshUserSession, logoutUser } from "../controllers/authController";
import { loginUserSchema, registerUserSchema } from "../validations/authValidation";

export const router=Router();
router.post('/auth/register', celebrate(registerUserSchema), registerUser
);

router.post('/auth/login', celebrate(loginUserSchema), loginUser);

router.post('/auth/refresh', refreshUserSession);

router.post('/auth/logout', logoutUser);

