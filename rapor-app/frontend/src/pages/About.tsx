import { Container, Paper, Title, Text, Grid, Button } from "@mantine/core";

const About = () => {
  return (
    <Container size="lg" py={40} style={{ backgroundColor: "#f9f9f9" }}>
      <Title mb={20} style={{ fontWeight: 700 }}>
        Hakkımızda
      </Title>

      <Text size="lg" mb={40} style={{ color: "#555" }}>
        Hastanemiz, yüksek kaliteli sağlık hizmetleri sunmayı misyon edinmiş,
        alanında uzmanlaşmış bir sağlık kuruluşudur. Hasta güvenliği ve
        memnuniyeti, önceliğimizdir.
      </Text>

      <Grid gutter={30}>
        <Grid.Col>
          <Paper
            shadow="sm"
            p={20}
            radius="md"
            withBorder
            style={{ backgroundColor: "#fff", transition: "all 0.3s ease" }}
          >
            <Title order={3} mb={10} style={{ color: "#2a2a2a" }}>
              Alanında Uzman Doktorlar
            </Title>
            <Text size="sm" style={{ color: "#777" }}>
              Hastanemizde, her biri kendi alanında deneyimli ve sertifikalı
              doktorlarımız hizmet vermektedir.
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col>
          <Paper
            shadow="sm"
            p={20}
            radius="md"
            withBorder
            style={{ backgroundColor: "#fff", transition: "all 0.3s ease" }}
          >
            <Title order={3} mb={10} style={{ color: "#2a2a2a" }}>
              Gelişmiş Tıbbi Cihazlar
            </Title>
            <Text size="sm" style={{ color: "#777" }}>
              Modern tıbbi cihazlarımız ile tanı ve tedavi süreçlerini hızlı ve
              doğru bir şekilde gerçekleştiriyoruz.
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col>
          <Paper
            shadow="sm"
            p={20}
            radius="md"
            withBorder
            style={{ backgroundColor: "#fff", transition: "all 0.3s ease" }}
          >
            <Title order={3} mb={10} style={{ color: "#2a2a2a" }}>
              Hasta Odaklı Yaklaşım
            </Title>
            <Text size="sm" style={{ color: "#777" }}>
              Hastalarımızın rahatını ve sağlığını ön planda tutarak, kişiye
              özel tedavi planları oluşturuyoruz.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <Button
        fullWidth
        mt={30}
        style={{
          backgroundColor: "#0066ff",
          color: "#fff",
          "&:hover": { backgroundColor: "#0056cc" },
        }}
      >
        Daha Fazla Bilgi
      </Button>
    </Container>
  );
};

export default About;
