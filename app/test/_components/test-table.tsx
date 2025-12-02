import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Post } from '../types/post';

interface TestTableProps {
  data: Post[];
}

const TestTable = ({ data }: TestTableProps) => {
  return (
    <Table>
      <TableHeader className="border">
        <TableRow className="bg-gray-100/60 hover:bg-gray-100">
          <TableHead className="border-r font-semibold text-gray-700">
            Id
          </TableHead>
          <TableHead className="border-r font-semibold text-gray-700">
            Title
          </TableHead>
          <TableHead className="font-semibold text-gray-700 border-r">
            Body
          </TableHead>
          <TableHead className="font-semibold text-gray-700  text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        {data.map((post) => (
          <TableRow
            key={post.id}
            className="hover:bg-gray-50 transition-colors"
          >
            <TableCell className="border-r py-3">{post.id}</TableCell>
            <TableCell className="border-r py-3">{post.title}</TableCell>
            <TableCell className="py-3 overflow-hidden border-r">
              {post.body}
            </TableCell>
            <TableCell className="border-r py-3 text-right">
              <div className="space-x-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TestTable;
