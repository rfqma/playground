import { Box, Text, Group, Paper, SimpleGrid } from "@mantine/core";
import { IconDeviceAnalytics } from "@tabler/icons-react";
import classes from "./StatsSegmentsModified.module.css";

interface StatsSegmentsModifiedProps {
  magnitude: string;
  depth: string;
  latitude: string;
  longitude: string;
}

export function StatsSegmentsModified({
  magnitude,
  depth,
  latitude,
  longitude,
}: StatsSegmentsModifiedProps) {
  const data = [
    { label: "Kedalaman", count: depth, color: "#47d6ab" },
    { label: "Latitude", count: latitude, color: "#03141a" },
    { label: "Longitude", count: longitude, color: "#4fcdf7" },
  ];

  const getMagnitudeCategory = (magnitude: number) => {
    if (magnitude <= 2.5) {
      return "biasanya tidak terasa, tetapi dapat direkam dengan seismograf.";
    } else if (magnitude > 2.5 && magnitude <= 5.4) {
      return "menyebabkan kerusakan ringan.";
    } else if (magnitude >= 5.5 && magnitude <= 6) {
      return "mengakibatkan kerusakan ringan bangunan.";
    } else if (magnitude >= 6.1 && magnitude <= 6.9) {
      return "menyebabkan banyak kerusakan di daerah yang sangat padat penduduk.";
    } else if (magnitude >= 7 && magnitude <= 7.9) {
      return "tergolong gempa besar yang mengakibatkan kerusakan serius.";
    } else if (magnitude >= 8) {
      return "termasuk gempa besar ini bisa menghancurkan wilayah pusatnya.";
    }
  };

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      style={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group justify="space-between" align="flex-end" gap={0}>
        <Text fw={700}>{stat.count}</Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            {`M ${magnitude}`}
          </Text>
        </Group>
        <IconDeviceAnalytics
          size="1.4rem"
          className={classes.icon}
          stroke={1.5}
        />
      </Group>

      <Text fz="sm">{`${magnitude} Magnitudo ${getMagnitudeCategory(
        parseFloat(magnitude)
      )}`}</Text>
      <Text c="dimmed" fz="sm" fs="italic">
        Sumber klasifikasi kategori gempa bumi dari
        <Text
          c="blue"
          fz="sm"
          fs="italic"
          component="a"
          href="https://indonesiabaik.id/infografis/magnitudo-ukuran-kekuatan-gempa-yang-dipakai-indonesia#:~:text=Besaran%20Skala%20Magnitudo&text=Magnitudo%202.5%20sampai%205.4%20menyebabkan,besar%20yang%20mengakibatkan%20kerusakan%20serius."
        >
          {" "}
          Artikel indonesiabaik.id
        </Text>
      </Text>

      <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}
