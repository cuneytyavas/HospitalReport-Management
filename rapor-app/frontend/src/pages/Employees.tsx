import { Table, Checkbox, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  fetchAllTechnicians,
  deleteTechnician,
} from "../features/technicianSlice";
import { TechnicianType } from "../types/technicianTypes";

const Employees = () => {
  const { technicians } = useSelector((state: RootState) => state.technician);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTechnicians());
  }, [dispatch]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleRowSelection = (technicianId: string, isChecked: boolean) => {
    if (isChecked) {
      if (selectedRows.length < 1) {
        setSelectedRows([...selectedRows, technicianId]);
      }
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== technicianId));
    }
  };

  const rows = technicians.map((technician: TechnicianType) => (
    <Table.Tr
      key={technician._id}
      bg={
        selectedRows.includes(technician._id)
          ? "var(--mantine-color-red-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(technician._id)}
          onChange={(event) =>
            handleRowSelection(technician._id, event.currentTarget.checked)
          }
        />
      </Table.Td>
      <Table.Td>{technician.name}</Table.Td>
      <Table.Td>{technician.surname}</Table.Td>
      <Table.Td>{technician.email}</Table.Td>
      <Table.Td>
        <Button
          color="red"
          onClick={() => dispatch(deleteTechnician(technician._id))}
        >
          Sil
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Seç</Table.Th>
          <Table.Th>İsim</Table.Th>
          <Table.Th>Soyisim</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Aksiyon</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default Employees;
