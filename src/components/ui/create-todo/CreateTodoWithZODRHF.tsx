import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo, CreateTodoInput } from "../../../types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const API_URL = "https://dummyjson.com/todos/add";

const todoFormSchema = z.object({
  title: z.string().min(2).max(125),
});

type TodoFormData = z.infer<typeof todoFormSchema>;

const createTodo = async (newTodo: CreateTodoInput) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) throw new Error("Failed to create todo");
  return response.json();
};

export default function CreateTodoFormWithTQRHF() {
  const { register, handleSubmit, reset } = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
  });

  const queryClient = useQueryClient(); // Get the query client instance

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (data: Todo) => {
      // data is the response from createTodo
      console.log("Todo created:", data);
      // Invalidate and refetch the 'todos' query to update the list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // reset the form
      reset();
    },
    onError: (error) => {
      console.error("Error creating todo:", error.message);
    },
  });

  const onSubmit = (formData: TodoFormData) => {
    const { title } = formData;

    if (title) {
      mutation.mutate({
        todo: title,
        completed: false,
        userId: 1,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="title"
        {...register("title")}
        placeholder="New todo title"
        disabled={mutation.isPending}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Add Todo"}
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </form>
  );
}
