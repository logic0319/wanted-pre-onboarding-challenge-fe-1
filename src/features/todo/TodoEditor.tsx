import { TextArea, TextField } from "@/ui";
import Button from "@/ui/Button";
import { useForm } from "react-hook-form";
import FormGroup from "../../ui/FormGroup";
import useCreateTodoMutation, {
  CreateTodoParams,
} from "./mutation/useCreateTodoMutation";
import useTodoList from "./queries/useTodoList";
import { useEffect } from "react";
import useUpdateTodoMutation from "./mutation/useUpdateTodoMutation";

type TodoEditorType = {
  todoId?: string;
};

function TodoEditor({ todoId }: TodoEditorType) {
  const createTodo = useCreateTodoMutation();
  const { mutateAsync: updateTodo, isLoading } = useUpdateTodoMutation();
  const todos = useTodoList();
  const todo = todos?.find(({ id }) => id === todoId);

  const { register, handleSubmit, setValue } = useForm<CreateTodoParams>({
    defaultValues: {
      title: todo?.title,
      content: todo?.content,
    },
  });

  useEffect(() => {
    if (todo) {
      setValue("title", todo.title);
      setValue("content", todo.content);
    }
  }, [todo, setValue]);

  const onSubmit = ({ title, content }: CreateTodoParams) => {
    if (todoId) {
      updateTodo({ id: todoId, title, content });
    } else {
      createTodo({ title, content });
    }
  };

  return (
    <FormGroup onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("title")} label="제목" placeholder="" />
      <TextArea {...register("content")} label="내용" />
      <div className="flex justify-end">
        <Button isLoading={isLoading}>{todo ? "수정 " : "작성"}</Button>
      </div>
    </FormGroup>
  );
}

export default TodoEditor;
