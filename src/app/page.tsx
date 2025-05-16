export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] justify-center items-center">
        <h1 className="font-bold text-4xl sm:text-8xl">Welcome!</h1>
      </main>
      <footer className="font-light row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>&copy; James Reyes 2025</p>
      </footer>
    </div>
  );
}
