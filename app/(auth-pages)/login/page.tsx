import { LoginForm } from "@/components/login-form";
import { Message } from "@/components/form-message";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return <LoginForm searchParams={searchParams} />
}
