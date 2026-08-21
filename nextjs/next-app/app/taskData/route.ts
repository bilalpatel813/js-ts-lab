import {Tasks} from "./data";

export async function GET(){
  return Response.json(Tasks);
}
export async function POST(request:Request){
  const Task = request.json();
  const newTask={
    id:Tasks.length+1,
    task:Task.text
  }
  return new Response(JSON.stringify(newTask),{
    headers:{"Content-Type":"application/json"},
    status:201
  })
}