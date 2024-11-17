import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { deleteRecord, fetchRecordById } from "../features/recordSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RecordType } from "../types/recordTypes";
import {
  Container,
  Paper,
  Title,
  Text,
  Flex,
  Image,
  Divider,
  Button,
} from "@mantine/core";
import toast from "react-hot-toast";

const SingleRecord = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { record, success } = useSelector((state: RootState) => state.record);
  const { authUser } = useSelector((state: RootState) => state.auth);
  const isTechnician = authUser?.role === "technician";
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchRecordById(id));
    }
  }, [dispatch, id]);

  if (!record) {
    return <div>Yükleniyor...</div>;
  }

  const typedRecord = record as RecordType;

  return (
    <Container size="md" my="lg">
      <Paper shadow="lg" p="xl" radius="md" withBorder>
        <Title order={2}>Hasta Raporu</Title>

        <Divider my="sm" />

        <Flex direction="column" gap="sm">
          <Text size="sm">
            <b>Dosya Numarası:</b> {typedRecord.fileNumber}
          </Text>
          <Text size="sm">
            <b>Tarih:</b> {new Date(typedRecord.date).toLocaleDateString()}
          </Text>
          <Text size="sm">
            <b>Hasta Adı:</b> {typedRecord.patientName}{" "}
            {typedRecord.patientSurname}
          </Text>
          <Text size="sm">
            <b>TC Kimlik No:</b> {typedRecord.patientTcId}
          </Text>
          <Text size="sm">
            <b>Teknisyen:</b> {typedRecord.technician?.name}{" "}
            {typedRecord.technician?.surname}
          </Text>
        </Flex>

        <Divider my="sm" />

        <Title order={4}>Teşhis Bilgileri</Title>
        <Text size="sm">
          <b>Başlık:</b> {typedRecord.diagnosticTitle}
        </Text>
        <Text size="sm">
          <b>Detaylar:</b> {typedRecord.diagnosticDetails}
        </Text>

        {typedRecord.recordImg && (
          <Image
            src={typedRecord.recordImg}
            alt="Hasta Görseli"
            width="100%"
            height={500}
            fit="cover"
            radius="md"
            style={{ marginTop: "20px" }}
          />
        )}
        {isTechnician && (
          <>
            <Button
              onClick={() => navigate(`/update-record/${id}`)}
              style={{ margin: "20px" }}
            >
              Güncelle
            </Button>
            <Button
              color="red"
              onClick={async () => {
                await dispatch(deleteRecord(id as string));
                toast.success(success);
                navigate("/");
              }}
              style={{ margin: "20px" }}
            >
              Raporu Sil
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default SingleRecord;
