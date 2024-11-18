import Sidebar from "../components/Sidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="w-full md:ml-[240px] p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Unstuffed</h1>
          <p className="text-xl text-gray-600">
            Your sustainable marketplace for sharing and donating items
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
