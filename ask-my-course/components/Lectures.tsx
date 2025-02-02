import { Table, Alert} from "flowbite-react";
import { useState } from "react";

export default function Lectures({ baseUrl }: { baseUrl: string }) {

  const [lectures, setLectures] = useState<String[]|null>(null);
  const [error, setError] = useState<String|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pollLectures = async () => {
    setLoading(true)
    console.log("polling lectures", baseUrl + '/lectures')
    const response = await fetch(baseUrl + '/lectures', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })

    if (!response.ok) {
      setLoading(false)
      setError(response.statusText);
      return;
    }
    const lectures = await response.json();
    setLectures(lectures)

    setTimeout(async () => {
        pollLectures()
      }, 10_000);
    }

  if (!lectures && !loading) {
    pollLectures()
    setLoading(true)
  }

  return (
    <div>
    <Table hoverable={true}>
  <Table.Head>
    <Table.HeadCell>
      Status
    </Table.HeadCell>
    <Table.HeadCell>
      Name
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">
     {lectures && lectures.map((lecture, i) => (
      <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {lecture["status"]}
      </Table.Cell>
      <Table.Cell>
        <a
          href={lecture["source"]}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          {lecture["title"]}
        </a>
      </Table.Cell>
    </Table.Row>

     ))}

{!lectures && (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>
          "Loading"
      </Table.Cell>
    </Table.Row>

     )}
      
  </Table.Body>
</Table>
    </div>
    )
}

