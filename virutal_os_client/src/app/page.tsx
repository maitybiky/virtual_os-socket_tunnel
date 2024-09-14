import { redirect } from 'next/navigation';

export default function Home() {
  // Perform server-side redirection
  redirect('/dashboard');

  // This will not be rendered as the redirection will happen immediately
  return null;
}
