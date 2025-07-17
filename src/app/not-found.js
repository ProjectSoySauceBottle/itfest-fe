import { Button } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen pt-14 bg-primary text-white font-poppins">
      <div className="m-auto text-center space-y-5 p-10 rounded-lg">
        <h1 className="text-7xl sm:text-9xl font-bold">404</h1>
        <h2>Not Found</h2>
        <p>Halaman Tidak Ditemukan</p>
        <Button component={Link} color="yellow" href="/">
          Kembali
        </Button>
      </div>
    </div>
  );
}
