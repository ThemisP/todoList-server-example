import { RequestHandler } from "express";
import Joi from "joi";
import todosService from "../../../services/todos.service";

const UpdateTodoSchema = Joi.object({
  message: Joi.string().required(),
  completed: Joi.boolean().required(),
});
/**
 * @type {RequestHandler}
 */
export const PUT = async (req, res) => {
  const { value, error } = UpdateTodoSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  const updatedTodo = todosService.update(req.params.todoId, value);
  res.status(200).json({ todo: updatedTodo });
};

/**
 * @type {RequestHandler}
 */
export const DELETE = async (req, res) => {
  const deletedTodo = todosService.remove(req.params.todoId);
  res.status(200).json({ todo: deletedTodo });
};

const TodoIdSchema = Joi.string().required();

/**
 * @type {import("../../../interfaces/types").IEndpointsConfig}
 */
const config = {
  middleware: {
    all: [
      (req, res, next) => {
        const { value, error } = TodoIdSchema.validate(req.params.todoId);
        if (error) {
          return res.status(400).json(error);
        }
        req.params.todoId = value;
        next();
      },
    ],
  },
};
