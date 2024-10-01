"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { ImageActionBanner } from "@/components/mantine/ImageActionBanner";
import { Container, Grid, SimpleGrid, Text } from "@mantine/core";
import { StatsSegmentsModified } from "@/components/mantine/StatsSegmentsModified";
// const PRIMARY_COL_HEIGHT = rem(300);

interface NewestQuakeProps {
  location: string;
  date: string;
  time: string;
  magnitude: string;
  depth: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  shake_map: string;
}

export default function Page() {
  // const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  const [initialized, setInitialized] = useState(false);
  const [newestQuake, setNewestQuake] = useState<NewestQuakeProps | null>(null);

  const getNewestQuake = async () => {
    try {
      const results = await axios.get(
        "https://api.rfqma.xyz/playground/bmkg/newest-eq"
      );
      setNewestQuake(results.data.data);
    } catch (error) {
      console.error("Error fetching the newest earthquake data:", error);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    getNewestQuake();
  }, []);

  if (!initialized) {
    return (
      <div className="grid place-items-center min-h-screen">
        <Loader color="violet" type="dots" />
      </div>
    );
  }

  return (
    <Container my="md">
      <Text size="md" fw={500}>
        Data Gempa Bumi Terbaru
      </Text>
      <Text c="dimmed" fz="sm" fs="italic" mb={20}>
        Sumber dari
        <Text
          c="blue"
          fz="sm"
          fs="italic"
          component="a"
          href="https://data.bmkg.go.id/"
        >
          {" "}
          Data Terbuka BMKG
        </Text>
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
        {newestQuake && newestQuake !== null && (
          <ImageActionBanner
            shake_map={
              newestQuake.shake_map !== null || newestQuake.shake_map !== ""
                ? newestQuake.shake_map
                : "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
            title={newestQuake.location}
            description={`${newestQuake.date} - ${newestQuake.time}`}
            buttonText="Lihat Shake Map"
          />
        )}
        {newestQuake === null && (
          <ImageActionBanner
            shake_map="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            title="Error"
            description="Gagal memuat data gempa terbaru. Bisa terjadi karena koneksi ke file .json BMKG gagal."
            buttonText="Error"
          />
        )}
        <Grid gutter="md">
          <Grid.Col>
            {newestQuake && newestQuake !== null && (
              <StatsSegmentsModified
                magnitude={newestQuake.magnitude}
                depth={newestQuake.depth}
                latitude={newestQuake.coordinates.latitude}
                longitude={newestQuake.coordinates.longitude}
              />
            )}
          </Grid.Col>
          {/* <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col> */}
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
