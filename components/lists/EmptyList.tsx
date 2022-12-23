export default function EmptyList() {
  return (
    <div className='text-center border h-full w-full flex flex-col justify-center items-center'>
      <h3 className='mt-2 text-sm font-medium text-gray-900'>
        No active contestant
      </h3>
      <p className='mt-1 text-sm text-gray-500'>
        Get started by selecting a contestant from the list.
      </p>
    </div>
  );
}
