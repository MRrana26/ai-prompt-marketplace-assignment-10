import AllPromptsHomePage from '@/components/AllPrompts';

const AllPromptsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const search = params?.search || '';

  return (
    <div>
      <AllPromptsHomePage searchQuery={search} />
    </div>
  );
};

export default AllPromptsPage;