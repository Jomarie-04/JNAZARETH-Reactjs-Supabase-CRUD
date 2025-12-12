// ...existing code...
import React, { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function App(): React.ReactElement {
  const tableName: string = "webtask";

  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newDescription, setNewDescription] = useState("");

  // Create function
  const submitTask = async () => {
    const { error } = await supabase.from(tableName).insert(newTask).single();

    if (error) {
      console.error("Error insert task", error.message);
      return;
    } else {
      console.log("Successful insert");
    }

    setNewTask({ title: "", description: "" });
    await fetchTask();
  };

  // Read function
  const fetchTask = async () => {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetch task", error.message);
      return;
    } else {
      console.log("Successful fetch");
    }

    setTasks((data as Task[]) || []);
  };

  // Update function
  const updateTask = async (id: number) => {
    const { error } = await supabase
      .from(tableName)
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("Error update task", error.message);
      return;
    } else {
      console.log("Successful update");
    }

    await fetchTask();
  };

  // Delete function
  const deleteTask = async (id: number) => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);

    if (error) {
      console.error("Error delete task", error.message);
      return;
    } else {
      console.log("Successful delete");
    }

    await fetchTask();
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <>
      <h1>Supabase x React js</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await submitTask();
        }}
      >
        <input
          type="text"
          placeholder="Title Here"
          required
          value={newTask.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          placeholder="Description Here"
          required
          value={newTask.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <textarea
                placeholder="Edit description"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewDescription(e.target.value)
                }
              />
              <button onClick={() => updateTask(task.id)}>Update Task</button>
              <button onClick={() => deleteTask(task.id)}>Delete Task</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
// ...existing code...