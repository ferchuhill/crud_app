/* eslint-disable @typescript-eslint/ban-types */
import { MdOutlineDeleteForever as Delete, MdEditNote as Edit, MdTableRows as Show } from 'react-icons/md';

export const Actions = ({
  rowId,
  editAction,
  deleteAction,
  showAction,
}: {
  rowId: { original: { id: string } };
  editAction: Function;
  deleteAction: Function;
  showAction: Function;
}): JSX.Element => {
  const size = '15px';
  return (
    <>
      <button
        type="button"
        className="mx-2  text-blue-800 hover:opacity-75  hover:text-blue-900  hover:bg-blue-100  rounded"
        title="Editar"
        onClick={() => showAction(rowId.original.id)}
      >
        <Show size={size} />
      </button>

      <button
        type="button"
        className="mx-2  text-green-800 hover:opacity-75  hover:text-green-900  hover:bg-green-100  rounded"
        title="Editar"
        onClick={() => editAction(rowId.original.id)}
      >
        <Edit size={size} />
      </button>
      <button
        type="button"
        className="mx-2 text-red-800 hover:opacity-75 hover:text-red-900  hover:bg-red-100  rounded0"
        title="Eliminar"
        onClick={() => window.confirm('Esta seguro de borrar el registro?') && deleteAction(rowId.original.id)}
      >
        <Delete size={size} />
      </button>
    </>
  );
};
