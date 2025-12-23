import React from "react";
import Swal from "sweetalert2";
import { usePriorityQuery, useStatusQuery } from "../Query/useQuery";
import { useParams } from "react-router-dom";

type Props = { type: "priorities" | "statuses" };
type Item = { id: number; name: string };

export const ShowPriorityOrStatusWrapper: React.FC = () => {
   const { type } = useParams();
   if (type !== "priorities" && type !== "statuses") {
     return <div>Invalid type</div>;
   }
   return <ShowPriorityOrStatus type={type} />;
}

export const ShowPriorityOrStatus: React.FC<Props> = ({ type }) => {
  const prioritiesQ = usePriorityQuery();
  const statusesQ = useStatusQuery();

  const q = type === "priorities" ? prioritiesQ : statusesQ;
  const items: Item[] = (q.data ?? []) as Item[];

  React.useEffect(() => {
    if (q.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          q.error instanceof Error
            ? q.error.message
            : `טעינת ה${type} נכשלה! אנא נסה שוב.`,
      });
    }
  }, [q.error, type]);

  if (q.isLoading) return <div>טוען...</div>;

  return (
    <div>
      <h2>רשימת ה{type === "priorities" ? "עדיפויות" : "סטטוסים"}:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default ShowPriorityOrStatus;