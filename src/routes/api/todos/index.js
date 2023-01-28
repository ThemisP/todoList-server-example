import { RequestHandler } from "express";
import Joi from "joi";
import todosService from "../../../services/todos.service";
/**
 * @type {RequestHandler}
 */
export const GET = async (req, res) => {
  const todos = todosService.getAll();
  res.status(200).json({ todos });
};

const CreateTodoSchema = Joi.object({
  message: Joi.string().required(),
});

/**
 * @type {RequestHandler}
 */
export const POST = async (req, res) => {
  const { value, error } = CreateTodoSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  const newTodo = todosService.add(value);
  res.status(200).json({ todo: newTodo });
};
