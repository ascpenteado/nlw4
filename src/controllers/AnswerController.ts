import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyUserRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepo = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveysUsersRepo.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("SurveyUser does not exists");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepo.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
