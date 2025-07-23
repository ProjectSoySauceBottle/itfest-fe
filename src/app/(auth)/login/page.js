import { Text } from "@mantine/core";
import FormControl from "@/components/Auth/FormControl";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 p-6">
      <div className="flex w-full max-w-4xl min-h-96 rounded-xl shadow-xl bg-white overflow-hidden">
        <div className="relative hidden md:flex flex-col justify-center flex-1 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white overflow-hidden">
          <h1 className="text-4xl z-10 font-bold mb-3 tracking-wide">
            WELCOME BACK
          </h1>
          <p className="text-sm z-10 leading-relaxed opacity-90 max-w-xs">
            Welcome to our platform. Please sign in to continue and explore your
            dashboard with personalized features.
          </p>

          <div aria-hidden="true">
            <div className="absolute -bottom-16 left-0 w-40 h-40 bg-blue-500 rounded-full filter blur-xl opacity-60"></div>
            <div className="absolute -bottom-10 right-24 w-32 h-32 bg-blue-500 rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute top-12 -right-0 w-48 h-48 bg-blue-500 rounded-full filter blur-xl opacity-60"></div>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-[1.2] p-10 md:p-16 bg-white rounded-r-xl shadow-inner">
          <Text size="xl" weight={700} className="mb-8 lowercase tracking-wide">
            login
          </Text>
          <FormControl />
        </div>
      </div>
    </div>
  );
}
