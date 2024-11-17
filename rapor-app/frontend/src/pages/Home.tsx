import {
  Table,
  Checkbox,
  Button,
  TextInput,
  Switch,
  Grid,
  Container,
  Paper,
  Title,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { clearRecords, fetchAllRecords } from "../features/recordSlice";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { records, isLoading } = useSelector(
    (state: RootState) => state.record
  );

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    dispatch(clearRecords());
  }, [dispatch]);

  const form = useForm({
    initialValues: {
      patientName: "",
      patientSurname: "",
      patientTcId: "",
      technicianName: "",
      technicianSurname: "",
      oldest: false,
      newest: false,
    },
  });

  const handleSwitchChange = (field: "oldest" | "newest") => {
    form.setValues({
      oldest: field === "oldest" ? !form.values.oldest : false,
      newest: field === "newest" ? !form.values.newest : false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const queryParams: any = {
      patientName: form.values.patientName,
      patientSurname: form.values.patientSurname,
      patientTcId: form.values.patientTcId,
      technicianName: form.values.technicianName,
      technicianSurname: form.values.technicianSurname,
    };

    if (form.values.oldest) queryParams.oldest = true;
    if (form.values.newest) queryParams.newest = true;

    dispatch(fetchAllRecords(queryParams));
  };

  const handleViewDetails = () => {
    if (selectedRow) {
      navigate(`/records/${selectedRow}`);
    }
  };

  const rows = records.length ? (
    records.map((record) => (
      <Table.Tr
        key={record._id}
        style={{
          backgroundColor:
            selectedRow === record._id
              ? "var(--mantine-color-blue-light)"
              : undefined,
        }}
      >
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selectedRow === record._id}
            onChange={() =>
              setSelectedRow(selectedRow === record._id ? null : record._id)
            }
          />
        </Table.Td>
        <Table.Td>{record.fileNumber}</Table.Td>
        <Table.Td>{record.patientName}</Table.Td>
        <Table.Td>{record.patientSurname}</Table.Td>
        <Table.Td>{new Date(record.date).toLocaleDateString()}</Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Tr>
      <Table.Td colSpan={5} align="center">
        Rapor Sorgulayın.
      </Table.Td>
    </Table.Tr>
  );

  return (
    <Container size="xl" my="md">
      <Paper shadow="md" p="md" withBorder>
        <Title order={2} mb="md">
          Rapor Sorgu
        </Title>
        <form onSubmit={handleSubmit}>
          <Grid gutter="md">
            <Grid.Col>
              <TextInput
                label="Hasta Adı"
                placeholder="Hasta adı giriniz"
                {...form.getInputProps("patientName")}
              />
            </Grid.Col>
            <Grid.Col>
              <TextInput
                label="Hasta Soyadı"
                placeholder="Hasta soyadı giriniz"
                {...form.getInputProps("patientSurname")}
              />
            </Grid.Col>
            <Grid.Col>
              <TextInput
                label="Hasta TC Kimlik No"
                placeholder="TC Kimlik No"
                {...form.getInputProps("patientTcId")}
              />
            </Grid.Col>
            <Grid.Col>
              <TextInput
                label="Teknisyen Adı"
                placeholder="Teknisyen adı"
                {...form.getInputProps("technicianName")}
              />
            </Grid.Col>
            <Grid.Col>
              <TextInput
                label="Teknisyen Soyadı"
                placeholder="Teknisyen soyadı"
                {...form.getInputProps("technicianSurname")}
              />
            </Grid.Col>
            <Grid.Col>
              <Group>
                <Switch
                  label="En Eski"
                  checked={form.values.oldest}
                  onChange={() => handleSwitchChange("oldest")}
                />
                <Switch
                  label="En Yeni"
                  checked={form.values.newest}
                  onChange={() => handleSwitchChange("newest")}
                />
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Button
                type="submit"
                variant="filled"
                fullWidth
                disabled={isLoading}
              >
                Ara
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>

      <Paper shadow="md" p="md" withBorder mt="md">
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Seçiniz</Table.Th>
              <Table.Th>Dosya Numarası</Table.Th>
              <Table.Th>Hasta Adı</Table.Th>
              <Table.Th>Hasta Soyadı</Table.Th>
              <Table.Th>Tarih</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Group mt="md">
          <Button
            onClick={handleViewDetails}
            disabled={!selectedRow}
            variant="outline"
          >
            Görüntüle
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default Home;
