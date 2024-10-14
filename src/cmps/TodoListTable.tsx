import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Task } from "../interfaces/Task";

interface Props {
  tasks: Task[];
  onClickEdit: (task: Task) => void;
  deleteTask: (task: Task) => void;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const TodoListTable = ({
  tasks,
  onClickEdit,
  deleteTask,
  sorting,
  setSorting,
}: Props) => {
  const handleEditClick = (task: Task) => {
    onClickEdit(task);
  };

  const handleDeleteClick = (task: Task) => {
    deleteTask(task);
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "task",
      header: "Task",
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
    },
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      accessorKey: "edit",
      header: "",
      cell: ({ row }) => (
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEditClick(row.original)}
          aria-label="Edit Task"
        >
          <svg
            className="text-xl"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
          >
            <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>
      ),
    },
    {
      accessorKey: "delete",
      header: "",
      cell: ({ row }) => (
        <button
          aria-label="Delete Task"
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeleteClick(row.original)}
        >
          <svg
            className="text-xl"
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
          </svg>
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,

    enableSorting: true,
  });

  const tableClassNames =
    "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400";
  const thClassNames =
    "text-center px-3 py-2 sm:px-6 sm:py-3 bg-gray-50 dark:bg-gray-800 cursor-pointer ";
  const tdClassNames =
    "truncate text-center px-3 py-2  sm:px-6 sm:py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap";

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg h-[70vh] w-[90vw] ">
      {/* Table Section */}
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <p>No tasks available</p>
        </div>
      ) : (
        <table className={tableClassNames}>
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10 border-b-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex flex-col sm:table-row">
                {headerGroup.headers.map((header) => (
                  <th
                    className={thClassNames}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`flex flex-col sm:table-row border-b border-gray-200 dark:border-gray-700 ${
                  rowIndex % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={tdClassNames}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoListTable;
