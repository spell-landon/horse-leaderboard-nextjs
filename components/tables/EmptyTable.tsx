import AddIcon from '@mui/icons-material/Add';

interface EmptyTableProps {
  type: 'judges' | 'riders';
}
export default function EmptyTable({ type }: EmptyTableProps) {
  const option = type === 'judges' ? 'judges' : 'riders';
  return (
    <div className='flex flex-col justify-center items-center bg-white'>
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No {option}</h3>
      <p className='mt-1 text-sm text-gray-500'>
        Get started by creating a new {option}.
      </p>
      <div className='mt-6'>
        <button
          type='button'
          className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize'>
          <AddIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          New {option}
        </button>
      </div>
    </div>
  );
}
